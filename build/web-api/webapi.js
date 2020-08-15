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
     * @param callback
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
     * @param callback
     */
    WebApi.prototype.getAlbums = function (albumIds, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/albums');
        var ids = albumIds.join();
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
     * @param callback
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
     * @param callback
     */
    WebApi.prototype.getArtist = function (artistId, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/artists/" + artistId);
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information for several artists based on their Spotify IDs.
     * @param artistIds A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs.
     * @param callback
     */
    WebApi.prototype.getArtists = function (artistIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/artists');
        var ids = artistIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get Spotify catalog information about an artist’s top tracks by market.
     * @param artistId The Spotify ID for the artist.
     * @param market An ISO 3166-1 alpha-2 market code or the string from_token.
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
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
     * @param callback
     */
    WebApi.prototype.getEpisodes = function (episodeIds, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/episodes');
        var ids = episodeIds.join();
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
     * @param followIds A comma-separated list of the artist or the user Spotify IDs to check.<br>
     *                  For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q.<br>
     *                  A maximum of 50 IDs can be sent in one request.<br>
     * @param callback
     */
    WebApi.prototype.getIsFollowingArtistOrUser = function (type, followIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/following/contains');
        var ids = followIds.join();
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
     * @param callback
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
     * @param followIds A comma-separated list of the artist or the user Spotify IDs.<br>
     *                  For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q.<br>
     *                  A maximum of 50 IDs can be sent in one request.
     * @param callback
     */
    WebApi.prototype.followArtistOrUser = function (type, followIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/following');
        var ids = followIds.join();
        request.withQueryParameters({
            type: type,
            ids: ids,
        });
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Remove the current user as a follower of one or more artists or other Spotify users.
     * @param type The ID type: either artist or user.
     * @param followIds A comma-separated list of the artist or the user Spotify IDs.<br>
     *                  For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. <br>
     *                  A maximum of 50 IDs can be sent in one request.
     * @param callback
     */
    WebApi.prototype.unfollowArtistOrUser = function (type, followIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/following');
        var ids = followIds.join();
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
     * @param callback
     */
    WebApi.prototype.getIsFollowingPlaylist = function (playlistId, userIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/playlists/" + playlistId + "/followers/contains");
        var ids = userIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Add the current user as a follower of a playlist.
     * @param playlistId The Spotify ID of the playlist. Any playlist can be followed, regardless of its public/private status, as long as you know its playlist ID.
     * @param isPublic Defaults to true. If true the playlist will be included in user’s public playlists, if false it will remain private. To be able to follow playlists privately, the user must have granted the playlist-modify-private scope.
     * @param callback
     */
    WebApi.prototype.followPlaylist = function (playlistId, isPublic, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/playlists/" + playlistId + "/followers");
        request.withBodyParameters({ public: isPublic });
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Remove the current user as a follower of a playlist.
     * @param playlistId The Spotify ID of the playlist that is to be no longer followed.
     * @param callback
     */
    WebApi.prototype.unfollowPlaylist = function (playlistId, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/playlists/" + playlistId + "/followers");
        return request.build().execute(http_manager_1.del, callback);
    };
    //Library API Endpoints
    /**
     * Check if one or more albums is already saved in the current Spotify user’s ‘Your Music’ library.
     * @param albumIds A comma-separated list of the Spotify IDs for the albums. Maximum: 50 IDs.
     * @param callback
     */
    WebApi.prototype.getIsAlbumsSaved = function (albumIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/albums/contains');
        var ids = albumIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
     * @param options Additional query parameters. (limit, offset)
     * @param callback
     */
    WebApi.prototype.getSavedAblums = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/albums');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Save one or more albums to the current user’s ‘Your Music’ library.
     * @param albumIds A comma-separated list of the Spotify IDs.<br>
     *                 For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M.<br>
     *                 Maximum: 50 IDs.
     * @param callback
     */
    WebApi.prototype.saveAlbums = function (albumIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/albums');
        var ids = albumIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Remove one or more albums from the current user’s ‘Your Music’ library.
     * @param albumIds A comma-separated list of the Spotify IDs.<br>
     *                 For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M.<br>
     *                 Maximum: 50 IDs.
     * @param callback
     */
    WebApi.prototype.removeSavedAlbums = function (albumIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/albums');
        var ids = albumIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.del, callback);
    };
    /**
     * Check if one or more shows is already saved in the current Spotify user’s library.
     * @param showIds A comma-separated list of the Spotify IDs for the shows. Maximum: 50 ids.
     * @param callback
     */
    WebApi.prototype.getIsShowsSaved = function (showIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/shows/contains');
        var ids = showIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get a list of shows saved in the current Spotify user’s library. Optional parameters can be used to limit the number of shows returned.
     * @param options Additional query parameters. (limit, offset)
     * @param callback
     */
    WebApi.prototype.getSavedShows = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/shows');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Save one or more shows to current Spotify user’s library.
     * @param showIds A comma-separated list of Spotify IDs for the shows to be added to the user’s library.
     * @param callback
     */
    WebApi.prototype.saveShows = function (showIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/shows');
        var ids = showIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Delete one or more shows from current Spotify user’s library.
     * @param showIds A comma-separated list of Spotify IDs for the shows to be deleted from the user’s library.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    WebApi.prototype.removeSavedShows = function (showIds, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/shows');
        var ids = showIds.join();
        request.withQueryParameters({ ids: ids });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.del, callback);
    };
    /**
     * Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
     * @param trackIds A comma-separated list of the Spotify IDs for the tracks. Maximum: 50 IDs.
     * @param callback
     */
    WebApi.prototype.getIsTracksSaved = function (trackIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/tracks/contains');
        var ids = trackIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback
     */
    WebApi.prototype.getSavedTracks = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/tracks');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Save one or more tracks to the current user’s ‘Your Music’ library.
     * @param trackIds A comma-separated list of the Spotify IDs.<br>
     *                 For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M.<br>
     *                 Maximum: 50 IDs.
     * @param callback
     */
    WebApi.prototype.saveTracks = function (trackIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/tracks');
        var ids = trackIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Remove one or more tracks from the current user’s ‘Your Music’ library.
     * @param trackIds A comma-separated list of the Spotify IDs.<br>
     *                 For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M.<br>
     *                 Maximum: 50 IDs.
     * @param callback
     */
    WebApi.prototype.removeSavedTracks = function (trackIds, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/tracks');
        var ids = trackIds.join();
        request.withQueryParameters({ ids: ids });
        return request.build().execute(http_manager_1.del, callback);
    };
    //Personalization API Endpoints
    /**
     * Get the current user’s top artists or tracks based on calculated affinity.
     * @param type The type of entity to return. Valid values: artists or tracks.
     * @param options Additional query parameters. (limit, offset, time_range)
     * @param callback
     */
    WebApi.prototype.getUsersTopTracksAndArtists = function (type, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath("/v1/me/top/" + type);
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    // Player API BETA Endpoints
    /**
     * Add an item to the end of the user’s current playback queue.
     * @param uri The uri of the item to add to the queue. Must be a track or an episode uri.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    WebApi.prototype.addItemToQueue = function (uri, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/queue');
        request.withQueryParameters({ uri: uri });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.post, callback);
    };
    /**
     * Get information about a user’s available devices.
     * @param callback
     */
    WebApi.prototype.getAvailableDevices = function (callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/devices');
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get information about the user’s current playback state, including track or episode, progress, and active device.
     * @param options Additional query parameters. (market, additional_types)
     * @param callback
     */
    WebApi.prototype.getCurrentPlaybackInfo = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get tracks from the current user’s recently played tracks.
     * @param options Additional query parameters. (limit, after, before)
     * @param callback
     */
    WebApi.prototype.getRecentlyPlayedTracks = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/recently-played');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Get the object currently being played on the user’s Spotify account.
     * @param options Additional query parameters. (market, additional_types)
     * @param callback
     */
    WebApi.prototype.getCurrentlyPlaying = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/currently-playing');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.get, callback);
    };
    /**
     * Pause playback on the user’s account.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    WebApi.prototype.pausePlayback = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/pause');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Seeks to the given position in the user’s currently playing track.
     * @param positionMs The position in milliseconds to seek to. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    WebApi.prototype.seekInPlayingTrack = function (positionMs, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/seek');
        request.withQueryParameters({ position_ms: positionMs });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Set the repeat mode for the user’s playback. Options are repeat-track, repeat-context, and off.
     * @param state track, context or off.<br>
                    track will repeat the current track.<br>
                    context will repeat the current context.<br>
                    off will turn repeat off.<br>
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    WebApi.prototype.setRepeatState = function (state, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/repeat');
        request.withQueryParameters({ state: state });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Set the volume for the user’s current playback device.
     * @param volume The volume to set. Must be a value from 0 to 100 inclusive.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    WebApi.prototype.setVolume = function (volume, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/volume');
        request.withQueryParameters({ volume_percent: volume });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Skips to next track in the user’s queue.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    WebApi.prototype.skipToNextPlayback = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/next');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.post, callback);
    };
    /**
     * Skips to previous track in the user’s queue.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    WebApi.prototype.skipToPreviousPlayback = function (options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/previous');
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.post, callback);
    };
    /**
     * Start a new context or resume current playback on the user’s active device.
     * @param queryOptions Additional query parameters. (device_id)
     * @param bodyOptions Additional body parameters. See {@link https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/} for more info. (context_uri, uris, offset, position_ms)
     * @param callback
     */
    WebApi.prototype.resumePlayback = function (queryOptions, bodyOptions, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/play');
        if (queryOptions) {
            request.withQueryParameters(queryOptions);
        }
        if (bodyOptions) {
            request.withBodyParameters(bodyOptions);
        }
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Toggle shuffle on or off for user’s playback.
     * @param state true : Shuffle user’s playback<br>
                    false : Do not shuffle user’s playback.<br>
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    WebApi.prototype.setShuffleState = function (state, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player/shuffle');
        request.withQueryParameters({ state: state });
        if (options) {
            request.withQueryParameters(options);
        }
        return request.build().execute(http_manager_1.put, callback);
    };
    /**
     * Transfer playback to a new device and determine if it should start playing.
     * @param deviceIds A JSON array containing the ID of the device on which playback should be started/transferred.<br>
                        For example:{device_ids:["74ASZWbe4lXaubB36ztrGX"]}<br>
                        Note: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return 400 Bad Request<br>
     * @param options Additional body parameters. (play)
     * @param callback
     */
    WebApi.prototype.transferPlayback = function (deviceIds, options, callback) {
        var request = webapi_request_1.webApiBuilder(this.accessToken).withPath('/v1/me/player');
        request.withBodyParameters({ device_ids: deviceIds });
        if (options) {
            request.withBodyParameters(options);
        }
        return request.build().execute(http_manager_1.put, callback);
    };
    return WebApi;
}());
