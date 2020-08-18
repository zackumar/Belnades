export { AuthorizationCodeFlow } from './authorizationcodeflow'
export { ClientCredentialFlow } from './clientcredentialsflow'

export enum Scope {
    //Images
    UGC_IMAGE_UPLOAD = 'ugc-image-upload',

    //Spotify Connect
    USER_READ_PLAYBACK_STATE = 'user-read-playback-state',
    USER_MODIFIED_PLAYBACK_STATE = 'user-modify-playback-state',
    USER_READ_CURRENTLY_PLAYING = 'user-read-currently-playing',

    //Playback
    STREAMING = 'streaming',
    APP_REMOTE_CONTROL = 'app-remote-control',

    //Users
    USER_READ_EMAIL = 'user-read-email',
    USER_READ_PRIVATE = 'user-read-private',

    //Playlist
    PLAYLIST_READ_COLLABORATIVE = 'playlist-read-collaborative',
    PLAYLIST_MODIFY_PUBLIC = 'playlist-modify-public',
    PLAYLIST_READ_PRIVATE = 'playlist-read-private',
    PLAYLIST_MODIFY_PRIVATE = 'playlist-modify-private',

    //Library
    USER_LIBRARY_MODIFY = 'user-library-modify',
    USER_LIBRARY_READ = 'user-library-read',

    //Listenting History
    USER_TOP_READ = 'user-top-read',
    USER_READ_PLAYBACK_POSITION = 'user-read-playback-position',
    USER_READ_RECENTLY_PLAYED = 'user-read-recently-played',

    //Follow
    USER_FOLLOW_READ = 'user-follow-read',
    USER_FOLLOW_MODIFY = 'user-follow-modify',
}

export const allScopes = Object.values(Scope)
export const imageScopes = [Scope.UGC_IMAGE_UPLOAD]
export const spotifyConnectScopes = [Scope.USER_READ_PLAYBACK_STATE, Scope.USER_MODIFIED_PLAYBACK_STATE, Scope.USER_READ_CURRENTLY_PLAYING]
export const playbackScopes = [Scope.STREAMING, Scope.APP_REMOTE_CONTROL]
export const userScopes = [Scope.USER_READ_EMAIL, Scope.USER_READ_PRIVATE]
export const playlistScopes = [Scope.PLAYLIST_READ_COLLABORATIVE, Scope.PLAYLIST_MODIFY_PUBLIC, Scope.PLAYLIST_READ_PRIVATE, Scope.PLAYLIST_MODIFY_PRIVATE]
export const libraryScopes = [Scope.USER_LIBRARY_MODIFY, Scope.USER_LIBRARY_READ]
export const listeningHistoryScopes = [Scope.USER_TOP_READ, Scope.USER_READ_PLAYBACK_POSITION, Scope.USER_READ_RECENTLY_PLAYED]
export const followScopes = [Scope.USER_FOLLOW_READ, Scope.USER_FOLLOW_MODIFY]
