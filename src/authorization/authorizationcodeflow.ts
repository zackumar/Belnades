import express from 'express'
import crypto from 'crypto'

import { RequestBuilder } from '../request/request'
import { post } from '../request/http-manager'
import { Scope } from './authorization'

/**
 * Autorization code flow with proof key for code exchange (PKCE). <br>
 * The authorization code flow with PKCE is the best option for mobile and desktop applications where it is unsafe to store your client secret. It provides your app with an access token that can be refreshed.
 */
export class AuthorizationCodeFlow {
    private clientId: string
    private scope?: string

    private app?: express.Express
    private redirectUri = 'http://localhost:8888/callback'

    private accessToken!: string
    private refreshToken!: string

    private expirationDate!: Date

    /**
     * Create an Authorization Code (PKCE) Flow
     * @param clientId App client ID
     * @param scope Spotify Premium scope. An array of scopes from Scope. You can also use one scope groups.
     */
    constructor(clientId: string, scope?: Scope[]) {
        this.clientId = clientId

        this.scope = scope?.join(' ')
    }

    /**
     * Get access token
     */
    public getAccessToken() {
        return this.accessToken
    }

    /**
     * Get refresh token
     */
    public getRefreshToken() {
        return this.refreshToken
    }

    /**
     * Get expiration date of access token
     */
    public getExpirationDate() {
        return this.expirationDate
    }

    /**
     * Check if the current access token is expired
     */
    public isExpired() {
        if (this.expirationDate) return new Date() > this.expirationDate
        return true
    }

    /**
     * Authorize the app. Returns access_token and other information. Assigns intance access tokena and refresh token.
     * @param callback
     */
    public authorize(callback?: Function) {
        if (callback) {
            this.authCodeFlow(callback)
            return
        }
        return new Promise((resolve, reject) => {
            this.authCodeFlow((err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            })
        })
    }

    /**
     * Uses a refresh token to reauthorize the app. This allows the user to grant permission only once.
     * @param refreshToken Optional refresh token to refresh with. Useful if refresh token is saved before exit. Otherwise the instance refresh token can be used.
     * @param callback
     */
    public refresh(refreshToken?: string, callback?: Function) {
        if (callback) {
            this.refreshTokenFlow(callback, refreshToken)
            return
        }
        return new Promise((resolve, reject) => {
            this.refreshTokenFlow((err: any, res: any) => {
                if (err) reject(err)
                else resolve(res)
            }, refreshToken)
        })
    }

    private authCodeFlow(callback: Function) {
        let state = this.generateRandomString(16)
        let codeVerifier = this.base64URLEncode(crypto.randomBytes(32))
        let codeChallenge = this.base64URLEncode(this.sha256(codeVerifier))

        this.app = express()
        this.app.get('/login', (req, res) => {
            const request = new RequestBuilder()
                .withScheme('https')
                .withHost('accounts.spotify.com')
                .withPath('/authorize')
                .withQueryParameters({
                    client_id: this.clientId,
                    response_type: 'code',
                    redirect_uri: this.redirectUri,
                    code_challenge_method: 'S256',
                    code_challenge: codeChallenge,
                    state: state,
                    scope: this.scope,
                })
                .build()

            res.redirect(request.getUrl())
        })

        this.app.get('/callback', (req, res) => {
            if (req.query.state !== state) {
                res.send('Error: State Mismatch')
                return
            }

            this.authTokenBuilder()
                .withBodyParameters({
                    client_id: this.clientId,
                    grant_type: 'authorization_code',
                    code: req.query.code,
                    redirect_uri: this.redirectUri,
                    code_verifier: codeVerifier,
                })
                .build()
                .execute(post, (err: any, res: any) => {
                    if (err) {
                        return callback(err)
                    }

                    this.refreshToken = res.body.refresh_token
                    this.accessToken = res.body.access_token
                    this.expirationDate = new Date()
                    this.expirationDate.setSeconds(this.expirationDate.getSeconds() + res.body.expires_in)

                    return callback(undefined, res.body.access_token)
                })

            res.send(this.accessToken)
        })

        this.app.listen(8888)
    }

    private refreshTokenFlow(callback: Function, refreshToken?: string) {
        if (!this.refreshToken && !refreshToken) {
            throw new Error('No refresh token')
        }
        let token = refreshToken || this.refreshToken
        this.authTokenBuilder()
            .withBodyParameters({
                grant_type: 'refresh_token',
                refresh_token: token,
                client_id: this.clientId,
            })
            .build()
            .execute(post, (err: any, res: any) => {
                if (err) {
                    if (callback) {
                        return callback(err)
                    } else {
                        console.log(err)
                    }
                    return
                }

                this.refreshToken = res.body.refresh_token
                this.accessToken = res.body.access_token
                this.expirationDate = new Date()
                this.expirationDate.setSeconds(this.expirationDate.getSeconds() + res.body.expires_in)

                if (callback) {
                    return callback(undefined, res.body.access_token)
                }
            })
    }

    private authTokenBuilder() {
        return new RequestBuilder().withScheme('https').withHost('accounts.spotify.com').withPath('/api/token').withHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    }

    private generateRandomString(length: number) {
        let text = ''
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    private base64URLEncode(str: Buffer) {
        return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    }

    private sha256(buffer: string) {
        return crypto.createHash('sha256').update(buffer).digest()
    }
}
