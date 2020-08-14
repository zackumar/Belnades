"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBuilder = exports.Request = void 0;
var Request = /** @class */ (function () {
    function Request(scheme, host, port, path, headers, queryParams, bodyParams) {
        this.scheme = scheme;
        this.host = host;
        this.port = port;
        this.path = path;
        this.headers = headers;
        this.queryParameters = queryParams;
        this.bodyParameters = bodyParams;
    }
    Object.defineProperty(Request.prototype, "getScheme", {
        get: function () {
            return this.scheme;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "getHost", {
        get: function () {
            return this.host;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "getPort", {
        get: function () {
            return this.port;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "getPath", {
        get: function () {
            return this.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "getHeaders", {
        get: function () {
            return this.headers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "getQueryParams", {
        get: function () {
            return this.queryParameters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Request.prototype, "getBodyParams", {
        get: function () {
            return this.bodyParameters;
        },
        enumerable: false,
        configurable: true
    });
    Request.prototype.getUri = function () {
        if (!this.scheme || !this.host || !this.port) {
            throw new Error('Missing required components to constuct URI');
        }
        var uri = this.scheme + "://" + this.host;
        if ((this.scheme === 'http' && this.port !== 80) || (this.scheme === 'https' && this.port !== 443)) {
            uri += ':' + this.port;
        }
        if (this.path) {
            uri += this.path;
        }
        return uri;
    };
    Request.prototype.getUrl = function () {
        var uri = this.getUri();
        if (this.queryParameters) {
            return uri + this.getQueryParametersAsString();
        }
        return uri;
    };
    Request.prototype.getQueryParametersAsString = function () {
        var _this = this;
        if (this.queryParameters) {
            return ('?' +
                Object.keys(this.queryParameters)
                    .filter(function (key) {
                    return _this.queryParameters[key] !== undefined;
                })
                    .map(function (key) {
                    return key + "=" + _this.queryParameters[key];
                })
                    .join('&'));
        }
    };
    Request.prototype.execute = function (method, callback) {
        if (callback) {
            method(this, callback);
            return;
        }
        var self = this;
        return new Promise(function (resolve, reject) {
            method(self, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    };
    return Request;
}());
exports.Request = Request;
var RequestBuilder = /** @class */ (function () {
    function RequestBuilder() {
    }
    RequestBuilder.prototype.withScheme = function (scheme) {
        this.scheme = scheme;
        return this;
    };
    RequestBuilder.prototype.withHost = function (host) {
        this.host = host;
        return this;
    };
    RequestBuilder.prototype.withPort = function (port) {
        this.port = port;
        return this;
    };
    RequestBuilder.prototype.withPath = function (path) {
        this.path = path;
        return this;
    };
    RequestBuilder.prototype.withQueryParameters = function (queryParams) {
        this.queryParameters = Object.assign(this.queryParameters || {}, queryParams);
        return this;
    };
    RequestBuilder.prototype.withBodyParameters = function (bodyParams) {
        this.bodyParameters = Object.assign(this.bodyParameters || {}, bodyParams);
        return this;
    };
    RequestBuilder.prototype.withHeaders = function (headers) {
        this.headers = Object.assign(this.headers || {}, headers);
        return this;
    };
    RequestBuilder.prototype.withAuth = function (accessToken) {
        if (accessToken) {
            this.withHeaders({ Authorization: "Bearer " + accessToken });
        }
        return this;
    };
    RequestBuilder.prototype.build = function () {
        if (!this.scheme || !this.host) {
            throw new Error('Missing required components to build request');
        }
        if (!this.port) {
            if (this.scheme === 'http') {
                this.port = 80;
            }
            else if (this.scheme === 'https') {
                this.port = 443;
            }
            else {
                throw new Error('Missing port. Could not infer from scheme');
            }
        }
        if (!this.path) {
            this.path = '/';
        }
        return new Request(this.scheme, this.host, this.port, this.path, this.headers, this.queryParameters, this.bodyParameters);
    };
    return RequestBuilder;
}());
exports.RequestBuilder = RequestBuilder;
