"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthType = exports.Authorization = void 0;
var request_1 = require("./request");
var http_manager_1 = require("./http-manager");
var Authorization = /** @class */ (function () {
    function Authorization() {
    }
    Authorization.prototype.setClientId = function (clientId) {
        this.clientId = clientId;
        return this;
    };
    Authorization.prototype.setClientSecret = function (clientSecret) {
        this.clientSecret = clientSecret;
        return this;
    };
    Authorization.prototype.authorize = function (type, callback) {
        var _this = this;
        switch (type) {
            case AuthType.CCF:
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
        }
    };
    Authorization.prototype.clientCredentialFlow = function (callback) {
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
            _this.expiresIn = res.body.expries_in;
            return callback(undefined, res.body.access_token);
        });
    };
    Authorization.prototype.generateRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    return Authorization;
}());
exports.Authorization = Authorization;
var AuthType;
(function (AuthType) {
    AuthType[AuthType["ACF"] = 0] = "ACF";
    AuthType[AuthType["PKCE"] = 1] = "PKCE";
    AuthType[AuthType["IG"] = 2] = "IG";
    AuthType[AuthType["CCF"] = 3] = "CCF";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
