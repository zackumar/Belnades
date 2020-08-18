"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApiBuilder = void 0;
var request_1 = require("../request/request");
var apiScheme = 'https';
var apiHost = 'api.spotify.com';
var apiPort = 443;
exports.webApiBuilder = function (accessToken) {
    return new request_1.RequestBuilder().withScheme(apiScheme).withHost(apiHost).withPort(apiPort).withAuth(accessToken).withHeaders({ 'Content-Type': 'application/json' });
};
