# Belnades

![Belnades Logo](/images/logo.png)

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

## Installation

Using npm:

```bash
$ npm install belnades --save
```

## Example

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
        webApi.setAccessToken(accessToken!)

        //Call API
        await webApi.resumePlayback()
    } catch (error) {
        console.log(error)
    }
}

playMusic()
```
