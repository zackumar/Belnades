"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationCodeFlow = void 0;
var express_1 = __importDefault(require("express"));
var crypto_1 = __importDefault(require("crypto"));
var request_1 = require("../request/request");
var http_manager_1 = require("../request/http-manager");
/**
 * Autorization code flow with proof key for code exchange (PKCE). <br>
 * The authorization code flow with PKCE is the best option for mobile and desktop applications where it is unsafe to store your client secret. It provides your app with an access token that can be refreshed.
 */
var AuthorizationCodeFlow = /** @class */ (function () {
    /**
     * Create an Authorization Code (PKCE) Flow
     * @param clientId App client ID
     */
    function AuthorizationCodeFlow(clientId) {
        this.redirectUri = 'http://localhost:8888/callback';
        this.clientId = clientId;
    }
    /**
     * Get access token
     */
    AuthorizationCodeFlow.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    /**
     * Get refresh token
     */
    AuthorizationCodeFlow.prototype.getRefreshToken = function () {
        return this.refreshToken;
    };
    /**
     * Get expiration date of access token
     */
    AuthorizationCodeFlow.prototype.getExpirationDate = function () {
        return this.expirationDate;
    };
    /**
     * Check if the current access token is expired
     */
    AuthorizationCodeFlow.prototype.isExpired = function () {
        if (this.expirationDate)
            return new Date() > this.expirationDate;
        return true;
    };
    /**
     * Authorize the app. Returns access_token and other information. Assigns intance access tokena and refresh token.
     * @param scopes Spotify Premium scope. An array of scopes from Scope. You can also use one scope groups.
     * @param callback
     */
    AuthorizationCodeFlow.prototype.authorize = function (scopes, callback) {
        var _this = this;
        if (callback) {
            this.authCodeFlow(callback, scopes);
        }
        else
            return new Promise(function (resolve, reject) {
                _this.authCodeFlow(function (err, res) {
                    if (err)
                        reject(err);
                    else
                        resolve(res);
                }, scopes);
            });
    };
    /**
     * Uses a refresh token to reauthorize the app. This allows the user to grant permission only once.
     * @param refreshToken Optional refresh token to refresh with. Useful if refresh token is saved before exit. Otherwise the instance refresh token can be used.
     * @param callback
     */
    AuthorizationCodeFlow.prototype.refresh = function (refreshToken, callback) {
        var _this = this;
        if (callback) {
            this.refreshTokenFlow(callback, refreshToken);
            return;
        }
        return new Promise(function (resolve, reject) {
            _this.refreshTokenFlow(function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            }, refreshToken);
        });
    };
    AuthorizationCodeFlow.prototype.authCodeFlow = function (callback, scopes) {
        var _this = this;
        var state = this.generateRandomString(16);
        var codeVerifier = this.base64URLEncode(crypto_1.default.randomBytes(32));
        var codeChallenge = this.base64URLEncode(this.sha256(codeVerifier));
        this.app = express_1.default();
        this.app.get('/login', function (req, res) {
            var request = new request_1.RequestBuilder()
                .withScheme('https')
                .withHost('accounts.spotify.com')
                .withPath('/authorize')
                .withQueryParameters({
                client_id: _this.clientId,
                response_type: 'code',
                redirect_uri: _this.redirectUri,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge,
                state: state,
                scope: (scopes === null || scopes === void 0 ? void 0 : scopes.join(' ')) || undefined,
            })
                .build();
            res.redirect(request.getUrl());
        });
        this.app.get('/callback', function (req, res) {
            if (req.query.state !== state) {
                res.send('Error: State Mismatch');
                return;
            }
            if (req.query.error === 'access_denied') {
                console.error('Spotify authorization denied.');
                res.send('Error: Access Denied');
                return;
            }
            _this.authTokenBuilder()
                .withBodyParameters({
                client_id: _this.clientId,
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: _this.redirectUri,
                code_verifier: codeVerifier,
            })
                .build()
                .execute(http_manager_1.post, function (err, res) {
                if (err) {
                    return callback(err);
                }
                _this.refreshToken = res.body.refresh_token;
                _this.accessToken = res.body.access_token;
                _this.expirationDate = new Date();
                _this.expirationDate.setSeconds(_this.expirationDate.getSeconds() + res.body.expires_in);
                return callback(undefined, res.body.access_token);
            });
            res.send('Success. You can now close this tab.');
        });
        this.app.listen(8888);
    };
    AuthorizationCodeFlow.prototype.refreshTokenFlow = function (callback, refreshToken) {
        var _this = this;
        if (!this.refreshToken && !refreshToken) {
            throw new Error('No refresh token');
        }
        var token = refreshToken || this.refreshToken;
        this.authTokenBuilder()
            .withBodyParameters({
            grant_type: 'refresh_token',
            refresh_token: token,
            client_id: this.clientId,
        })
            .build()
            .execute(http_manager_1.post, function (err, res) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                else {
                    console.log(err);
                }
                return;
            }
            _this.refreshToken = res.body.refresh_token;
            _this.accessToken = res.body.access_token;
            _this.expirationDate = new Date();
            _this.expirationDate.setSeconds(_this.expirationDate.getSeconds() + res.body.expires_in);
            if (callback) {
                return callback(undefined, res.body.access_token);
            }
        });
    };
    AuthorizationCodeFlow.prototype.authTokenBuilder = function () {
        return new request_1.RequestBuilder().withScheme('https').withHost('accounts.spotify.com').withPath('/api/token').withHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    };
    AuthorizationCodeFlow.prototype.generateRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    AuthorizationCodeFlow.prototype.base64URLEncode = function (str) {
        return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    };
    AuthorizationCodeFlow.prototype.sha256 = function (buffer) {
        return crypto_1.default.createHash('sha256').update(buffer).digest();
    };
    return AuthorizationCodeFlow;
}());
exports.AuthorizationCodeFlow = AuthorizationCodeFlow;
