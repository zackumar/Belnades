import { RequestBuilder } from '../request'

const apiScheme = 'https'
const apiHost = 'api.spotify.com'
const apiPort = 443

export const webApiBuilder = (accessToken: string) => {
    return new RequestBuilder().withScheme(apiScheme).withHost(apiHost).withPort(apiPort).withAuth(accessToken).withHeaders({ 'Content-Type': 'application/json' })
}
