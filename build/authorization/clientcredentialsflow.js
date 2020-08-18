"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientCredentialFlow = void 0;
var request_1 = require("../request/request");
var http_manager_1 = require("../request/http-manager");
/**
 * The Client Credentials flow is used in server-to-server authentication. Only endpoints that do not access user information can be accessed.
 */
var ClientCredentialFlow = /** @class */ (function () {
    /**
     * The Client Credentials flow is used in server-to-server authentication. Only endpoints that do not access user information can be accessed.
     * @param clientId Client ID
     * @param clientSecret Client secret
     */
    function ClientCredentialFlow(clientId, clientSecret) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    /**
     * Get access token
     */
    ClientCredentialFlow.prototype.getAccessToken = function () {
        return this.accessToken;
    };
    /**
     * Get expiration date of access token
     */
    ClientCredentialFlow.prototype.getExpirationDate = function () {
        return this.expirationDate;
    };
    /**
     * Get access token using client ID and secret
     * @param callback
     */
    ClientCredentialFlow.prototype.authorize = function (callback) {
        var _this = this;
        if (callback) {
            this.clientCredentialFlow(callback);
            return;
        }
        return new Promise(function (resolve, reject) {
            _this.clientCredentialFlow(function (err, access_token) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(access_token);
                }
            });
        });
    };
    ClientCredentialFlow.prototype.clientCredentialFlow = function (callback) {
        var _this = this;
        if (!this.clientId || !this.clientSecret) {
            throw new Error('Tried to use client credential authorization flow with client ID or client secret.');
        }
        var request = new request_1.RequestBuilder()
            .withScheme('https')
            .withHost('accounts.spotify.com')
            .withPath('/api/token')
            .withHeaders({
            Authorization: "Basic " + Buffer.from(this.clientId + ":" + this.clientSecret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
        })
            .withBodyParameters({
            grant_type: 'client_credentials',
        })
            .build();
        request.execute(http_manager_1.post, function (err, res) {
            if (err) {
                callback(err);
                return;
            }
            _this.accessToken = res.body.access_token;
            _this.expirationDate = new Date();
            _this.expirationDate.setSeconds(_this.expirationDate.getSeconds() + res.body.expires_in);
            return callback(undefined, res.body.access_token);
        });
    };
    return ClientCredentialFlow;
}());
exports.ClientCredentialFlow = ClientCredentialFlow;
