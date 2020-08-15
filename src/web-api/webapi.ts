import { webApiBuilder } from './webapi-request'
import { get, post, put, del } from '../http-manager'

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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
     */
    public getArtist(artistId: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/artists/${artistId}`)
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information for several artists based on their Spotify IDs.
     * @param artistIds A comma-separated list of the Spotify IDs for the artists. Maximum: 50 IDs.
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param followIds A comma-separated list of the artist or the user Spotify IDs to check. For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. A maximum of 50 IDs can be sent in one request.
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param followIds A comma-separated list of the artist or the user Spotify IDs. For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. A maximum of 50 IDs can be sent in one request.
     * @param callback Optional callback method to use instead of promise.
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
     * @param followIds A comma-separated list of the artist or the user Spotify IDs. For example: ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q. A maximum of 50 IDs can be sent in one request.
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
     */
    public followPlaylist(playlistId: string, isPublic?: boolean, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/followers`)
        request.withBodyParameters({ public: isPublic })
        return request.build().execute(put, callback)
    }

    /**
     * Remove the current user as a follower of a playlist.
     * @param playlistId The Spotify ID of the playlist that is to be no longer followed.
     * @param callback Optional callback method to use instead of promise.
     */
    public unfollowPlaylist(playlistId: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/playlists/${playlistId}/followers`)
        return request.build().execute(del, callback)
    }

    //Library API Endpoints

    /**
     * Check if one or more albums is already saved in the current Spotify user’s ‘Your Music’ library.
     * @param albumIds A comma-separated list of the Spotify IDs for the albums. Maximum: 50 IDs.
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param albumIds A comma-separated list of the Spotify IDs. For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M. Maximum: 50 IDs.
     * @param callback Optional callback method to use instead of promise.
     */
    public saveAlbums(albumIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/albums')
        let ids = albumIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(put, callback)
    }

    /**
     * Remove one or more albums from the current user’s ‘Your Music’ library.
     * @param albumIds A comma-separated list of the Spotify IDs. For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M. Maximum: 50 IDs.
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
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
     * @param trackIds A comma-separated list of the Spotify IDs. For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M. Maximum: 50 IDs.
     * @param callback Optional callback method to use instead of promise.
     */
    public saveTracks(trackIds: string[], callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/me/tracks')
        let ids = trackIds.join()
        request.withQueryParameters({ ids: ids })
        return request.build().execute(put, callback)
    }

    /**
     * Remove one or more tracks from the current user’s ‘Your Music’ library.
     * @param trackIds A comma-separated list of the Spotify IDs. For example: ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M. Maximum: 50 IDs.
     * @param callback Optional callback method to use instead of promise.
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
     * @param callback Optional callback method to use instead of promise.
     */
    public getUsersTopTracksAndArtists(type: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/me/top/${type}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }
}
