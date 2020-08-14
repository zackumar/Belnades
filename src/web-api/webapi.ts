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
     * @param options Additional query parameters. (country)
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
     * @param options Additional query parameters.(country, limit, offset)
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
     * @param options Additional query parameters.(country)
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
     * Get Spotify catalog information about an artist’s top tracks by country.
     * @param artistId The Spotify ID for the artist.
     * @param country An ISO 3166-1 alpha-2 country code or the string from_token.
     * @param callback Optional callback method to use instead of promise.
     */
    public getArtistsTopTracks(artistId: string, country: string, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/artists/${artistId}/top-tracks`)
        request.withQueryParameters({ country: country })
        return request.build().execute(get, callback)
    }

    /**
     * Get Spotify catalog information about an artist’s albums. Optional parameters can be specified in the query string to filter and sort the response.
     * @param artistId The Spotify ID for the artist.
     * @param options Additional query parameters.(include_groups, country, limit, offset)
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
}
