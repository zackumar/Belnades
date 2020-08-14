"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var webapi_request_1 = require("./webapi-request");
var http_manager_1 = require("../http-manager");
var WebApi = /** @class */ (function () {
    function WebApi(accessToken) {
        this.accessToken = accessToken;
    }
    //Album API Endpoints
    /**
     * Get Spotify catalog information for a single album.
     * @param albumId The Spotify ID for the album.
     * @param options Additional query parameters. (market)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getAlbum = function (albumId, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/albums/" + albumId);
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
     * @param albumIds A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
     * @param options Additional query parameters. (market)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getAlbums = function (albumIds, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/albums');
        var ids = albumIds.join(',');
        request.withQueryParameters({ ids: ids });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
     * @param albumId The Spotify ID for the album.
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getAlbumsTracks = function (albumId, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/albums/" + albumId + "/tracks");
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    //Artist API Endpoints
    /**
     * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
     * @param artistId The Spotify ID for the artist.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getArtist = function (artistId, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/artists/" + artistId);
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information for several artists based on their Spotify IDs.
     * @param artistIds A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getArtists = function (artistIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/artists');
        var ids = artistIds.join(',');
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information about an artist’s top tracks by market.
     * @param artistId The Spotify ID for the artist.
     * @param market An ISO 3166-1 alpha-2 market code or the string from_token.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getArtistsTopTracks = function (artistId, market, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/artists/" + artistId + "/top-tracks");
        request.withQueryParameters({ market: market });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information about an artist’s albums. Optional parameters can be specified in the query string to filter and sort the response.
     * @param artistId The Spotify ID for the artist.
     * @param options Additional query parameters. (include_groups, market, limit, offset)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getArtistsAlbums = function (artistId, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/artists/" + artistId + "/albums");
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community’s listening history.
     * @param artistId The Spotify ID for the artist.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getArtistsRelatedArtists = function (artistId, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/artists/" + artistId + "/related-artists");
        return request.build().execute(http_manager_1.get, callback);
    };
    //Browse API Endpoints
    /**
     * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
     * @param categoryId The Spotify category ID for the category.
     * @param options Additional query parameters. (market, locale)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getCategory = function (categoryId, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/browse/categories/" + categoryId);
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
     * @param options Additional query parameters. (market, locale, limit, offset)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getCategories = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/browse/categories');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get a list of Spotify playlists tagged with a particular category.
     * @param categoryId The Spotify category ID for the category.
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getCategoryPlaylists = function (categoryId, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/browse/categories/" + categoryId + "/playlists");
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get a list of Spotify featured playlists (shown, for example, on a Spotify player’s ‘Browse’ tab).
     * @param options Additional query parameters. (locale, market, timestamp, limit, offset)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getFeaturedPlaylists = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/browse/featured-playlists');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getNewReleases = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/browse/new-releases');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Create a playlist-style listening experience based on seed artists, tracks and genres.
     * @param options Additional query parameters. See {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/} for options.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getRecommendations = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/recommendations');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Retrieve a list of available genres seed parameter values for recommendations.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getRecommendationGenres = function (callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/recommendations/available-genre-seeds');
        return request.build().execute(http_manager_1.get, callback);
    };
    //Episodes API Endpoints
    /**
     * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
     * @param episodeId The Spotify ID for the episode.
     * @param options Additional query parameters. (market)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getEpisode = function (episodeId, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/episodes/" + episodeId);
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information for several episodes based on their Spotify IDs.
     * @param episodeIds A comma-separated list of the Spotify IDs for the episodes. Maximum: 50 IDs.
     * @param options Additional query parameters. (market)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getEpisodes = function (episodeIds, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/episodes');
        var ids = episodeIds.join(',');
        request.withQueryParameters({ ids: ids });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    return WebApi;
}());
;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var api, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                api = new WebApi('BQAohDS4lMZZJvhLcUgACq5uq-UPBlbT5Fs__iY-dQFzRQRn82bRN2z1P9vKB8axzqozs_uHCa-xWT_RrC-BrutyHHaGjoa17wovV-2H7t4ulCiKDJJZmYaljEsQ0DNoZ-KnSE8k6qDYDFkZ49sYNd51KydFz7qZFemdSv2UkwZgRD70KrHxfBYYiD9O9IW-rGl0dO1skVyh54-u3WbagWFrCgQGLRoFp-QVteBKqahmq9g1LXOylbs9KfSAAxYWF08khRNhVg8D81I');
                return [4 /*yield*/, api.getEpisodes(['77o6BIVlYM3msb4MMIL1jH', '0Q86acNRm6V9GYx55SXKwf'])];
            case 1:
                response = _a.sent();
                console.log(response.body);
                return [2 /*return*/];
        }
    });
}); })();
//'4yvcSjfu4PC0CYQyLy4wSq'
