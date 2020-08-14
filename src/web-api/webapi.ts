import { webApiBuilder } from './webapi-request'
import { get } from '../http-manager'

class WebApi {
    private accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

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
}
