"use strict";
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
    //Follow API Endpoints
    /**
     * Check to see if the current user is following one or more artists or other Spotify users.
     * @param type The ID type: either artist or user.
     * @param followIds A comma-separated list of the artist or the user Spotify IDs to check. For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. A maximum of 50 IDs can be sent in one request.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getIsFollowingArtistOrUser = function (type, followIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/following/contains');
        var ids = followIds.join(',');
        request.withQueryParameters({
            type: type,
            ids: ids,
        });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get the current user’s followed artists.
     * @param type The ID type: currently only artist is supported.
     * @param options Additional query parameters. (limit, after)
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getFollowedArtistsOrUsers = function (type, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/following');
        request.withQueryParameters({ type: type });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Add the current user as a follower of one or more artists or other Spotify users.
     * @param type The ID type: either artist or user.
     * @param followIds A comma-separated list of the artist or the user Spotify IDs. For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. A maximum of 50 IDs can be sent in one request.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.followArtistOrUser = function (type, followIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/following');
        var ids = followIds.join(',');
        request.withQueryParameters({
            type: type,
            ids: ids,
        });
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Remove the current user as a follower of one or more artists or other Spotify users.
     * @param type The ID type: either artist or user.
     * @param followIds A comma-separated list of the artist or the user Spotify IDs. For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. A maximum of 50 IDs can be sent in one request.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.unfollowArtistOrUser = function (type, followIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/following');
        var ids = followIds.join(',');
        request.withQueryParameters({
            type: type,
            ids: ids,
        });
        return request.build().execute(http_manager_1.del, callback);
    };
    /**
     * Check to see if one or more Spotify users are following a specified playlist.
     * @param playlistId The Spotify ID of the playlist.
     * @param userIds A comma-separated list of Spotify User IDs ; the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.getIsFollowingPlaylist = function (playlistId, userIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/playlists/" + playlistId + "/followers/contains");
        var ids = userIds.join(',');
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Add the current user as a follower of a playlist.
     * @param playlistId The Spotify ID of the playlist. Any playlist can be followed, regardless of its public/private status, as long as you know its playlist ID.
     * @param isPublic Defaults to true. If true the playlist will be included in user’s public playlists, if false it will remain private. To be able to follow playlists privately, the user must have granted the playlist-modify-private scope.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.followPlaylist = function (playlistId, isPublic, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/playlists/" + playlistId + "/followers");
        request.withBodyParameters({ public: isPublic });
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Remove the current user as a follower of a playlist.
     * @param playlistId The Spotify ID of the playlist that is to be no longer followed.
     * @param callback Optional callback method to use instead of promise.
     */
    WebApi.prototype.unfollowPlaylist = function (playlistId, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/playlists/" + playlistId + "/followers");
        return request.build().execute(http_manager_1.del, callback);
    };
    return WebApi;
}());
