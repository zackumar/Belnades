import { webApiBuilder } from './webapi-request'
import { get, post, put, del } from '../http-manager'
import { RequestBuilder } from '../request'

class WebApi {
    private accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

    //Album API Endpoints

    /**
     * Get Spotify catalog information for a single album.
     * @param albumId The Spotify ID for the album.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    public getAlbum(albumId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/albums/${albumId}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
     * @param albumIds A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    public getAlbums(albumIds: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/albums')
        let ids: string = albumIds.join()
        request.withQueryParameters({ ids: ids })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
     * @param albumId The Spotify ID for the album.
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback
     */
    public getAlbumsTracks(albumId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/albums/${albumId}/tracks`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    //Artist API Endpoints

    /**
     * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
     * @param artistId The Spotify ID for the artist.
     * @param callback
     */
    public getArtist(artistId: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/artists/${artistId}`)
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information for several artists based on their Spotify IDs.
     * @param artistIds A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs.
     * @param callback
     */
    public getArtists(artistIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/artists')
        let ids: string = artistIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information about an artist’s top tracks by market.
     * @param artistId The Spotify ID for the artist.
     * @param market An ISO 3166-1 alpha-2 market code or the string from_token.
     * @param callback
     */
    public getArtistsTopTracks(artistId: string, market: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/artists/${artistId}/top-tracks`)
        request.withQueryParameters({ market: market })
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information about an artist’s albums. Optional parameters can be specified in the query string to filter and sort the response.
     * @param artistId The Spotify ID for the artist.
     * @param options Additional query parameters. (include_groups, market, limit, offset)
     * @param callback
     */
    public getArtistsAlbums(artistId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/artists/${artistId}/albums`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community’s listening history.
     * @param artistId The Spotify ID for the artist.
     * @param callback
     */
    public getArtistsRelatedArtists(artistId: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/artists/${artistId}/related-artists`)
        return request.build().execute(get, callback)
    }

    //Browse API Endpoints

    /**
     * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
     * @param categoryId The Spotify category ID for the category.
     * @param options Additional query parameters. (market, locale)
     * @param callback
     */
    public getCategory(categoryId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/browse/categories/${categoryId}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
     * @param options Additional query parameters. (market, locale, limit, offset)
     * @param callback
     */
    public getCategories(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/browse/categories')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get a list of Spotify playlists tagged with a particular category.
     * @param categoryId The Spotify category ID for the category.
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback
     */
    public getCategoryPlaylists(categoryId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/browse/categories/${categoryId}/playlists`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get a list of Spotify featured playlists (shown, for example, on a Spotify player’s ‘Browse’ tab).
     * @param options Additional query parameters. (locale, market, timestamp, limit, offset)
     * @param callback
     */
    public getFeaturedPlaylists(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/browse/featured-playlists')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback
     */
    public getNewReleases(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/browse/new-releases')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Create a playlist-style listening experience based on seed artists, tracks and genres.
     * @param options Additional query parameters. See {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/} for options.
     * @param callback
     */
    public getRecommendations(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/recommendations')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Retrieve a list of available genres seed parameter values for recommendations.
     * @param callback
     */
    public getRecommendationGenres(callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/recommendations/available-genre-seeds')
        return request.build().execute(get, callback)
    }

    //Episodes API Endpoints

    /**
     * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
     * @param episodeId The Spotify ID for the episode.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    public getEpisode(episodeId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/episodes/${episodeId}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information for several episodes based on their Spotify IDs.
     * @param episodeIds A comma-separated list of the Spotify IDs for the episodes. Maximum: 50 IDs.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    public getEpisodes(episodeIds: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/episodes')
        let ids: string = episodeIds.join()
        request.withQueryParameters({ ids: ids })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    //Follow API Endpoints

    /**
     * Check to see if the current user is following one or more artists or other Spotify users.
     * @param type The ID type: either artist or user.
     * @param followIds A comma-separated list of the artist or the user Spotify IDs to check.<br>
     *                  For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q.<br>
     *                  A maximum of 50 IDs can be sent in one request.<br>
     * @param callback
     */
    public getIsFollowingArtistOrUser(type: string, followIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/following/contains')
        let ids: string = followIds.join()
        request.withQueryParameters({
            type: type,
            ids: ids,
        })
        return request.build().execute(get, callback)
    }

    /**
     * Get the current user’s followed artists.
     * @param type The ID type: currently only artist is supported.
     * @param options Additional query parameters. (limit, after)
     * @param callback
     */
    public getFollowedArtistsOrUsers(type: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/following')
        request.withQueryParameters({ type: type })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Add the current user as a follower of one or more artists or other Spotify users.
     * @param type The ID type: either artist or user.
     * @param followIds A comma-separated list of the artist or the user Spotify IDs.<br>
     *                  For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q.<br>
     *                  A maximum of 50 IDs can be sent in one request.
     * @param callback
     */
    public followArtistOrUser(type: string, followIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/following')
        let ids: string = followIds.join()
        request.withQueryParameters({
            type: type,
            ids: ids,
        })
        return request.build().execute(put, callback)
    }

    /**
     * Remove the current user as a follower of one or more artists or other Spotify users.
     * @param type The ID type: either artist or user.
     * @param followIds A comma-separated list of the artist or the user Spotify IDs.<br>
     *                  For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. <br>
     *                  A maximum of 50 IDs can be sent in one request.
     * @param callback
     */
    public unfollowArtistOrUser(type: string, followIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/following')
        let ids: string = followIds.join()
        request.withQueryParameters({
            type: type,
            ids: ids,
        })
        return request.build().execute(del, callback)
    }

    /**
     * Check to see if one or more Spotify users are following a specified playlist.
     * @param playlistId The Spotify ID of the playlist.
     * @param userIds A comma-separated list of Spotify User IDs ; the ids of the users that you want to check to see if they follow the playlist. Maximum: 5 ids.
     * @param callback
     */
    public getIsFollowingPlaylist(playlistId: string, userIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/followers/contains`)
        let ids: string = userIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(get, callback)
    }

    /**
     * Add the current user as a follower of a playlist.
     * @param playlistId The Spotify ID of the playlist. Any playlist can be followed, regardless of its public/private status, as long as you know its playlist ID.
     * @param isPublic Defaults to true. If true the playlist will be included in user’s public playlists, if false it will remain private. To be able to follow playlists privately, the user must have granted the playlist-modify-private scope.
     * @param callback
     */
    public followPlaylist(playlistId: string, isPublic?: boolean, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/followers`)
        request.withBodyParameters({ public: isPublic })
        return request.build().execute(put, callback)
    }

    /**
     * Remove the current user as a follower of a playlist.
     * @param playlistId The Spotify ID of the playlist that is to be no longer followed.
     * @param callback
     */
    public unfollowPlaylist(playlistId: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/followers`)
        return request.build().execute(del, callback)
    }

    //Library API Endpoints

    /**
     * Check if one or more albums is already saved in the current Spotify user’s ‘Your Music’ library.
     * @param albumIds A comma-separated list of the Spotify IDs for the albums. Maximum: 50 IDs.
     * @param callback
     */
    public getIsAlbumsSaved(albumIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/albums/contains')
        let ids = albumIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(get, callback)
    }

    /**
     * Get a list of the albums saved in the current Spotify user’s ‘Your Music’ library.
     * @param options Additional query parameters. (limit, offset)
     * @param callback
     */
    public getSavedAblums(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/albums')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Save one or more albums to the current user’s ‘Your Music’ library.
     * @param albumIds A comma-separated list of the Spotify IDs.<br>
     *                 For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M.<br>
     *                 Maximum: 50 IDs.
     * @param callback
     */
    public saveAlbums(albumIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/albums')
        let ids = albumIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(put, callback)
    }

    /**
     * Remove one or more albums from the current user’s ‘Your Music’ library.
     * @param albumIds A comma-separated list of the Spotify IDs.<br>
     *                 For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M.<br>
     *                 Maximum: 50 IDs.
     * @param callback
     */
    public removeSavedAlbums(albumIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/albums')
        let ids = albumIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(del, callback)
    }

    /**
     * Check if one or more shows is already saved in the current Spotify user’s library.
     * @param showIds A comma-separated list of the Spotify IDs for the shows. Maximum: 50 ids.
     * @param callback
     */
    public getIsShowsSaved(showIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/shows/contains')
        let ids = showIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(get, callback)
    }

    /**
     * Get a list of shows saved in the current Spotify user’s library. Optional parameters can be used to limit the number of shows returned.
     * @param options Additional query parameters. (limit, offset)
     * @param callback
     */
    public getSavedShows(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/shows')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Save one or more shows to current Spotify user’s library.
     * @param showIds A comma-separated list of Spotify IDs for the shows to be added to the user’s library.
     * @param callback
     */
    public saveShows(showIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/shows')
        let ids = showIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(put, callback)
    }

    /**
     * Delete one or more shows from current Spotify user’s library.
     * @param showIds A comma-separated list of Spotify IDs for the shows to be deleted from the user’s library.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    public removeSavedShows(showIds: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/shows')
        let ids = showIds.join()
        request.withQueryParameters({ ids: ids })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(del, callback)
    }

    /**
     * Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
     * @param trackIds A comma-separated list of the Spotify IDs for the tracks. Maximum: 50 IDs.
     * @param callback
     */
    public getIsTracksSaved(trackIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/tracks/contains')
        let ids = trackIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(get, callback)
    }

    /**
     * Get a list of the songs saved in the current Spotify user’s ‘Your Music’ library.
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback
     */
    public getSavedTracks(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/tracks')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Save one or more tracks to the current user’s ‘Your Music’ library.
     * @param trackIds A comma-separated list of the Spotify IDs.<br>
     *                 For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M.<br>
     *                 Maximum: 50 IDs.
     * @param callback
     */
    public saveTracks(trackIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/tracks')
        let ids = trackIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(put, callback)
    }

    /**
     * Remove one or more tracks from the current user’s ‘Your Music’ library.
     * @param trackIds A comma-separated list of the Spotify IDs.<br>
     *                 For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M.<br>
     *                 Maximum: 50 IDs.
     * @param callback
     */
    public removeSavedTracks(trackIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/tracks')
        let ids = trackIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(del, callback)
    }

    //Personalization API Endpoints

    /**
     * Get the current user’s top artists or tracks based on calculated affinity.
     * @param type The type of entity to return. Valid values: artists or tracks.
     * @param options Additional query parameters. (limit, offset, time_range)
     * @param callback
     */
    public getUsersTopTracksAndArtists(type: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/me/top/${type}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    // Player API BETA Endpoints

    /**
     * Add an item to the end of the user’s current playback queue.
     * @param uri The uri of the item to add to the queue. Must be a track or an episode uri.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    public addItemToQueue(uri: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/queue')
        request.withQueryParameters({ uri: uri })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(post, callback)
    }

    /**
     * Get information about a user’s available devices.
     * @param callback
     */
    public getAvailableDevices(callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/devices')
        return request.build().execute(get, callback)
    }

    /**
     * Get information about the user’s current playback state, including track or episode, progress, and active device.
     * @param options Additional query parameters. (market, additional_types)
     * @param callback
     */
    public getCurrentPlaybackInfo(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get tracks from the current user’s recently played tracks.
     * @param options Additional query parameters. (limit, after, before)
     * @param callback
     */
    public getRecentlyPlayedTracks(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/recently-played')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get the object currently being played on the user’s Spotify account.
     * @param options Additional query parameters. (market, additional_types)
     * @param callback
     */
    public getCurrentlyPlaying(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/currently-playing')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Pause playback on the user’s account.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    public pausePlayback(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/pause')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(put, callback)
    }

    /**
     * Seeks to the given position in the user’s currently playing track.
     * @param positionMs The position in milliseconds to seek to. Must be a positive number. Passing in a position that is greater than the length of the track will cause the player to start playing the next song.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    public seekInPlayingTrack(positionMs: number, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/seek')
        request.withQueryParameters({ position_ms: positionMs })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(put, callback)
    }

    /**
     * Set the repeat mode for the user’s playback. Options are repeat-track, repeat-context, and off.
     * @param state track, context or off.<br>
                    track will repeat the current track.<br>
                    context will repeat the current context.<br>
                    off will turn repeat off.<br>
     * @param options Additional query parameters. (device_id)
     * @param callback 
     */
    public setRepeatState(state: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/repeat')
        request.withQueryParameters({ state: state })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(put, callback)
    }

    /**
     * Set the volume for the user’s current playback device.
     * @param volume The volume to set. Must be a value from 0 to 100 inclusive.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    public setVolume(volume: number, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/volume')
        request.withQueryParameters({ volume_percent: volume })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(put, callback)
    }

    /**
     * Skips to next track in the user’s queue.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    public skipToNextPlayback(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/next')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(post, callback)
    }

    /**
     * Skips to previous track in the user’s queue.
     * @param options Additional query parameters. (device_id)
     * @param callback
     */
    public skipToPreviousPlayback(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/previous')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(post, callback)
    }

    /**
     * Start a new context or resume current playback on the user’s active device.
     * @param queryOptions Additional query parameters. (device_id)
     * @param bodyOptions Additional body parameters. See {@link https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/} for more info. (context_uri, uris, offset, position_ms)
     * @param callback
     */
    public resumePlayback(queryOptions?: object, bodyOptions?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/play')
        if (queryOptions) {
            request.withQueryParameters(queryOptions)
        }
        if (bodyOptions) {
            request.withBodyParameters(bodyOptions)
        }
        return request.build().execute(put, callback)
    }

    /**
     * Toggle shuffle on or off for user’s playback.
     * @param state true : Shuffle user’s playback<br>
                    false : Do not shuffle user’s playback.<br>
     * @param options Additional query parameters. (device_id)
     * @param callback 
     */
    public setShuffleState(state: string | boolean, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player/shuffle')
        request.withQueryParameters({ state: state })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(put, callback)
    }

    /**
     * Transfer playback to a new device and determine if it should start playing.
     * @param deviceIds A JSON array containing the ID of the device on which playback should be started/transferred.<br>
                        For example:{device_ids:["74ASZWbe4lXaubB36ztrGX"]}<br>
                        Note: Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return 400 Bad Request<br>
     * @param options Additional body parameters. (play)
     * @param callback 
     */
    public transferPlayback(deviceIds: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/player')
        request.withBodyParameters({ device_ids: deviceIds })
        if (options) {
            request.withBodyParameters(options)
        }
        return request.build().execute(put, callback)
    }

    //Playlist API Endpoints

    /**
     * Get a playlist owned by a Spotify user.
     * @param playlistId The Spotify ID for the playlist.
     * @param options Additional query parameters. (fields, market, additional_types)
     * @param callback
     */
    public getPlaylist(playlistId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.)
     * @param userId The user’s Spotify user ID.
     * @param name The name for the new playlist, for example "Your Coolest Playlist" . This name does not need to be unique; a user may have several playlists with the same name.
     * @param options Additional body parameters. (public, collaborative, description)
     * @param callback
     */
    public createPlaylist(userId: string, name: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/users/${userId}/playlists`)
        request.withBodyParameters({ name: name })
        if (options) {
            request.withBodyParameters(options)
        }
        return request.build().execute(post, callback)
    }

    /**
     * Get a list of the playlists owned or followed by the current Spotify user.
     * @param options Additional query parameters. (limit, offset)
     * @param callback
     */
    public getCurrentUsersPlaylists(options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/playlists')
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get a list of the playlists owned or followed by a Spotify user.
     * @param userId The user’s Spotify user ID.
     * @param options Additional query parameters. (limit, offset)
     * @param callback
     */
    public getUsersPlaylists(userId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/users/${userId}/playlists`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get full details of the tracks or episodes of a playlist owned by a Spotify user.
     * @param playlistId The Spotify ID for the playlist.
     * @param options Additional query parameters. (fields, limit, offset, market, additional_types)
     * @param callback
     */
    public getPlaylistItems(playlistId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/tracks`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Add one or more items to a user’s playlist.
     * @param playlistId The Spotify ID for the playlist.
     * @param uris A JSON array of the Spotify URIs to add, can be track or episode URIs. <br>
     *             For example: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh","spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]} <br>
                   A maximum of 100 items can be added in one request. <br>
     * @param options Additional body parameters. (position)
     * @param callback 
     */
    public addPlaylistItems(playlistId: string, uris: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/tracks`)
        request.withBodyParameters({ uris: uris })
        if (options) {
            request.withBodyParameters(options)
        }
        return request.build().execute(post, callback)
    }

    /**
     * Remove one or more items from a user’s playlist.
     * @param playlistId The Spotify ID for the playlist.
     * @param tracks Tracks to remove. See {@link https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/} for more information.
     * @param callback
     */
    public removePlaylistItems(playlistId: string, tracks: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/tracks`)
        request.withBodyParameters(tracks)
        return request.build().execute(del, callback)
    }

    /**
     * Change a Playlist's Details
     * @param playlistId The Spotify ID for the playlist.
     * @param options Body parameters. At least one required. (name, public, collaborative, description) <br>
     *                See {@link https://developer.spotify.com/documentation/web-api/reference/playlists/change-playlist-details/} for more information.
     * @param callback
     */
    public changePlaylistDetails(playlistId: string, options: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}`)
        request.withBodyParameters(options)
        return request.build().execute(put, callback)
    }

    /**
     * <strong>NOT WORKING</strong><br>
     * Get the current image associated with a specific playlist.
     * @param playlistId The Spotify ID for the playlist.
     * @param callback
     */
    public getPlaylistCoverImage(playlistId: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/images`)
        // TODO: Response body empty???
        return request.build().execute(get, callback)
    }

    /**
     * <strong>NOT TESTED</strong><br>
     * Replace the image used to represent a specific playlist.
     * @param playlistId The Spotify ID for the playlist.
     * @param image Base64 encoded JPEG image data, maximum payload size is 256 KB <br>
     *              Covert binary data to base64 string
     *              <pre>
     *                  const fs = require('fs')
     *                  let bitmap = fs.readFileSync({file})
     *                  let base64image = Buffer.from(bitmap).toString('base64')
     *              </pre>
     * @param callback
     */
    public setPlaylistCoverImage(playlistId: string, image: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/images`).withHeaders({ 'Content-Type': 'image/jpeg' })
        request.withBodyParameters({ image })
        return request.build().execute(put, callback)
    }

    /**
     * Reorder an item or a group of items in a playlist.
     * @param playlistId The Spotify ID for the playlist.
     * @param rangeStart The position of the first item to be reordered.
     * @param insertBefore The position where the items should be inserted. <br>
                           To reorder the items to the end of the playlist, simply set insert_before to the position after the last item. <br>
                           <strong>Examples:</strong>
                           <pre>
                            To reorder the first item to the last position in a playlist with 10 items, set range_start to 0, and insert_before to 10.
                            To reorder the last item in a playlist with 10 items to the start of the playlist, set range_start to 9, and insert_before to 0.
                           </pre>
     * @param options 
     * @param callback 
     */
    public reorderPlaylistItems(playlistId: string, rangeStart: number, insertBefore: number, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/tracks`)
        request.withBodyParameters({
            range_start: rangeStart,
            insert_before: insertBefore,
        })
        if (options) {
            request.withBodyParameters(options)
        }
        return request.build().execute(put, callback)
    }

    /**
     * Replace all the items in a playlist, overwriting its existing items. This powerful request can be useful for replacing items, re-ordering existing items, or clearing the playlist.
     * @param playlistId The Spotify ID for the playlist.
     * @param uris A JSON array of the Spotify URIs to set, can be track or episode URIs. <br>
     *             <strong>For example:</strong>
     *              <pre>
     *                 {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M", "spotify:episode:512ojhOuo1ktJprKbVcKyQ"]}
     *              </pre>
     * @param callback
     */
    public replacePlaylistItems(playlistId: string, uris: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/tracks`)
        request.withBodyParameters({
            uris: uris,
        })
        return request.build().execute(put, callback)
    }

    //Search API Endpoints

    /**
     * Get Spotify Catalog information about albums, artists, playlists, tracks, shows or episodes that match a keyword string. <br>
     * See {@link https://developer.spotify.com/documentation/web-api/reference/search/search/} for more information on query and filtering.
     * @param query Search query keywords and optional field filters and operators.
     * @param type A comma-separated list of item types to search across.
                   Valid types are: album , artist, playlist, track, show and episode.
                   Search results include hits from all the specified item types.
                   For example: q=name:abacab&type=album,track returns both albums and tracks with “abacab” included in their name.
     * @param options Additional query parameters. (market, limit, offset, include_external)
     * @param callback 
     */
    public search(query: string, type: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/search')
        request.withQueryParameters({
            q: query,
            type: type,
        })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    //Shows API Endpoints

    /**
     * Get Spotify catalog information for a single show identified by its unique Spotify ID.
     * @param showId The Spotify ID for the show.
     * @param options Additonal query parameters. (market)
     * @param callback
     */
    public getShow(showId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/shows/${showId}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information for multiple shows based on their Spotify IDs.
     * @param showIds A comma-separated list of the Spotify IDs for the shows. Maximum: 50 IDs.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    public getSeveralShows(showIds: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/shows/')
        let ids = showIds.join()
        request.withQueryParameters({ ids: ids })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information about a show’s episodes. Optional parameters can be used to limit the number of episodes returned.
     * @param showId The Spotify ID for the show.
     * @param options Additional query parameters. (market, limit, offset)
     * @param callback
     */
    public getShowsEpisodes(showId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/shows/${showId}/episodes`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    //Tracks API Enpoints

    /**
     * Get Spotify catalog information for a single track identified by its unique Spotify ID.
     * @param trackId The Spotify ID for the track.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    public getTrack(trackId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/tracks/${trackId}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
     * @param trackIds A comma-separated list of the Spotify IDs for the tracks. Maximum: 50 IDs.
     * @param options Additional query parameters. (market)
     * @param callback
     */
    public getSeveralTracks(trackIds: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/tracks/')
        let ids: string = trackIds.join()
        request.withQueryParameters({ ids: ids })
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get a detailed audio analysis for a single track identified by its unique Spotify ID.
     * @param trackId The Spotify ID for the track.
     * @param callback
     */
    public getAudioAnalysisForTrack(trackId: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/audio-analysis/${trackId}`)
        return request.build().execute(get, callback)
    }

    /**
     * Get audio feature information for a single track identified by its unique Spotify ID.
     * @param trackId The Spotify ID for the track.
     * @param callback
     */
    public getAudioFeaturesForTrack(trackId: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/audio-features/${trackId}`)
        return request.build().execute(get, callback)
    }

    /**
     * Get audio features for multiple tracks based on their Spotify IDs.
     * @param trackIds A comma-separated list of the Spotify IDs for the tracks. Maximum: 100 IDs.
     * @param callback
     */
    public getAudioFeaturesForSeveralTracks(trackIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/audio-features/')
        let ids: string = trackIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(get, callback)
    }
}
