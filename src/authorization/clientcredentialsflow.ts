import { RequestBuilder } from '../request/request'
import { post } from '../request/http-manager'

/**
 * The Client Credentials flow is used in server-to-server authentication. Only endpoints that do not access user information can be accessed.
 */
export class ClientCredentialFlow {
    private clientId?: string
    private clientSecret?: string

    private accessToken?: string

    private expirationDate?: Date

    /**
     * The Client Credentials flow is used in server-to-server authentication. Only endpoints that do not access user information can be accessed.
     * @param clientId Client ID
     * @param clientSecret Client secret
     */
    constructor(clientId: string, clientSecret: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
    }

    /**
     * Get access token
     */
    public getAccessToken() {
        return this.accessToken
    }

    /**
     * Get expiration date of access token
     */
    public getExpirationDate() {
        return this.expirationDate
    }

    /**
     * Get access token using client ID and secret
     * @param callback
     */
    public authorize(callback?: Function) {
        if (callback) {
            this.clientCredentialFlow(callback)
            return
        }
        return new Promise((resolve: any, reject: any) => {
            this.clientCredentialFlow((err: any, access_token: string) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(access_token)
                }
            })
        })
    }

    private clientCredentialFlow(callback: Function) {
        if (!this.clientId || !this.clientSecret) {
            throw new Error('Tried to use client credential authorization flow with client ID or client secret.')
        }
        let request = new RequestBuilder()
            .withScheme('https')
            .withHost('accounts.spotify.com')
            .withPath('/api/token')
            .withHeaders({
                Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            })
            .withBodyParameters({
                grant_type: 'client_credentials',
            })
            .build()

        request.execute(post, (err: any, res: any) => {
            if (err) {
                callback(err)
                return
            }
            this.accessToken = res.body.access_token
            this.expirationDate = new Date()
            this.expirationDate.setSeconds(this.expirationDate.getSeconds() + res.body.expires_in)

            return callback(undefined, res.body.access_token)
        })
    }
}
