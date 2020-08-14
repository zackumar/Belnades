import { webApiBuilder } from './webapi-request'
import { get } from '../http-manager'

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
     * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
     * @param albumId The Spotify ID for the album.
     * @param options Additional query parameters.(market, limit, offset)
     * @param callback Optional callback method to use instead of promise.
     */
    public getAlbumsTracks(albumId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/albums/${albumId}/tracks`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
     * @param albumIds A comma-separated list of the Spotify IDs for the albums. Maximum: 20 IDs.
     * @param options Additional query parameters.(market)
     * @param callback Optional callback method to use instead of promise.
     */
    public getAlbums(albumIds: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/albums')
        let ids: string = albumIds.join(',')
        request.withQueryParameters({ ids: ids })
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
        let ids: string = artistIds.join(',')
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
     * @param options Additional query parameters.(include_groups, market, limit, offset)
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
     * @param options Additional query parameters.(market, locale)
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
     * @param options Additional query parameters.(market, locale, limit, offset)
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
     * @param options Additional query parameters.(market, limit, offset)
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
     * @param options Additional query parameters.(locale, market, timestamp, limit, offset)
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
     * @param options Additional query parameters. See {@link https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/} for options
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
}
