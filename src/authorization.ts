import { RequestBuilder } from './request'
import { post } from './http-manager'

export class Authorization {
    private clientId?: string
    private clientSecret?: string

    public accessToken?: string
    private refreshToken?: string

    private expiresIn?: number

    public setClientId(clientId: string) {
        this.clientId = clientId
        return this
    }

    public setClientSecret(clientSecret: string) {
        this.clientSecret = clientSecret
        return this
    }

    public authorize(type: AuthType, callback?: Function) {
        switch (type) {
            case AuthType.CCF:
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
            this.expiresIn = res.body.expries_in
            return callback(undefined, res.body.access_token)
        })
    }

    private generateRandomString(length: number) {
        let text = ''
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }
}

export enum AuthType {
    ACF,
    PKCE,
    IG,
    CCF,
}
