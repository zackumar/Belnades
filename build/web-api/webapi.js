"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webapi_request_1 = require("./webapi-request");
var http_manager_1 = require("../http-manager");
var WebApi = /** @class */ (function () {
    function WebApi(accessToken) {
        this.accessToken = accessToken;
    }
    WebApi.prototype.getAlbum = function (albumId, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/albums/" + albumId);
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    WebApi.prototype.getAlbumsTracks = function (albumId, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/albums/" + albumId + "/tracks");
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    WebApi.prototype.getAlbums = function (albumIds, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/albums');
        var ids = albumIds.join(',');
        console.log(ids);
        request.withQueryParameters({ ids: ids });
        if (options) {
            request.withQueryParameters(options);
        }
        var req = request.build();
        console.log(req.getUrl());
        return req.execute(http_manager_1.get, callback);
    };
    return WebApi;
}());
