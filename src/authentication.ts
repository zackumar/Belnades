import opener from 'opener'
import express from 'express'

import axios from 'axios'
import * as config from './config'

const app = express()
const port = 8888

let accessToken: number

var scopes = 'user-read-private user-read-email user-library-read'
var redirect_uri = `http://localhost:${port}/callback`

app.get('/login', (req: any, res: any) => {
    res.redirect(
        'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' +
            config.clientId +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' +
            encodeURIComponent(redirect_uri)
    )
})

app.get('/callback', async (req: any, res: any) => {
    console.log(req.query)
    accessToken = req.query.code
    if (accessToken) {
        res.send('success')
    } else {
        res.send('error')
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

opener('http://localhost:8888/login')

export { accessToken }
