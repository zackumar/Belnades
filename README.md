# Belnades

[![Belnades Logo](https://github.com/zackumar/Belnades/blob/master/images/logo.png)](https://github.com/zackumar/Belnades)

Belnades is a Spotify API wrapper that runs on NodeJS, meant to be run client side without the need for a browser.

## Motivation

I started Belnades because of the limited amount of libraries available for the Spotify API in Javascript. Many of them are written for Python and C.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)

## Features

-   Authenticate using [Authorization Code with PKCE Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow-with-proof-key-for-code-exchange-pkce) or [Client Credentials Flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow)
-   Supports Callbacks and Async/Await

-   Wrapper to access all [Spotify Web API endpoints](https://developer.spotify.com/documentation/web-api/reference-beta/)

### What I want to add

-   Spotify Connect functionality

## Installation

Using npm:

```bash
$ npm install belnades --save
```

## Usage

```js
const { WebAPI, AuthorizationCodeFlow, Scope } = require('belmont')

const authorization = new AuthorizationCodeFlow('CLIENT_ID') //Your client id
const webApi = new WebAPI()

// Play music
async function playMusic() {
    try {
        //Authorize using the user-modified-playback-state scope
        let accessToken = await authorization.authorize([Scope.USER_MODIFIED_PLAYBACK_STATE])

        //Set access token of WebAPI
        webApi.setAccessToken(accessToken)

        //Call API
        await webApi.resumePlayback()
    } catch (error) {
        console.log(error)
    }
}

playMusic()
```

## Credit

Belnades is inspired by [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) and the lovely work put in by [thelinmichael](https://github.com/thelinmichael), [JMPerez](https://github.com/JMPerez), and its [contributors](https://github.com/thelinmichael/spotify-web-api-node/network/members). The authorization flows are based off of [Spotify's Account Authentication Examples](https://github.com/spotify/web-api-auth-examples).

## License

[MIT](LICENSE)
