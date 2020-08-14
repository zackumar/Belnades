import { webApiBuilder } from './webapi-request'
import { get } from '../http-manager'

class WebApi {
    private accessToken: string

    constructor(accessToken: string) {
        this.accessToken = accessToken
    }

    public getAlbum(albumId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/albums/${albumId}`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    public getAlbumsTracks(albumId: string, options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath(`/v1/albums/${albumId}/tracks`)
        if (options) {
            request.withQueryParameters(options)
        }
        return request.build().execute(get, callback)
    }

    public getAlbums(albumIds: string[], options?: object, callback?: Function) {
        let request = webApiBuilder(this.accessToken).withPath('/v1/albums')
        let ids: string = albumIds.join(',')
        console.log(ids)
        request.withQueryParameters({ ids: ids })
        if (options) {
            request.withQueryParameters(options)
        }

        let req = request.build()
        console.log(req.getUrl())
        return req.execute(get, callback)
    }
}
