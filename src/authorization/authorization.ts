export { AuthorizationCodeFlow } from './authorizationcodeflow'
export { ClientCredentialFlow } from './clientcredentialsflow'

export enum Scope {
    //Images
    ugc_image_upload = 'ugc-image-upload',

    //Spotify Connect
    user_read_playback_state = 'user-read-playback-state',
    user_modified_playback_state = 'user-modify-playback-state',
    user_read_currently_playing = 'user-read-currently-playing',

    //Playback
    streaming = 'streaming',
    app_remote_control = 'app-remote-control',

    //Users
    user_read_email = 'user-read-email',
    user_read_private = 'user-read-private',

    //Playlist
    playlist_read_collaborative = 'playlist-read-collaborative',
    playlist_modify_public = 'playlist-modify-public',
    playlist_read_private = 'playlist-read-private',
    playlist_modify_private = 'playlist-modify-private',

    //Library
    user_library_modify = 'user-library-modify',
    user_library_read = 'user-library-read',

    //Listenting History
    user_top_read = 'user-top-read',
    user_read_playback_position = 'user-read-playback-position',
    user_read_recently_played = 'user-read-recently-played',

    //Follow
    user_follow_read = 'user-follow-read',
    user_follow_modify = 'user-follow-modify',
}

export const allScopes = Object.values(Scope)
export const imageScopes = [Scope.ugc_image_upload]
export const spotifyConnectScopes = [Scope.user_read_playback_state, Scope.user_modified_playback_state, Scope.user_read_currently_playing]
export const playbackScopes = [Scope.streaming, Scope.app_remote_control]
export const userScopes = [Scope.user_read_email, Scope.user_read_private]
export const playlistScopes = [Scope.playlist_read_collaborative, Scope.playlist_modify_public, Scope.playlist_read_private, Scope.playlist_modify_private]
export const libraryScopes = [Scope.user_library_modify, Scope.user_library_read]
export const listeningHistoryScopes = [Scope.user_top_read, Scope.user_read_playback_position, Scope.user_read_recently_played]
export const followScopes = [Scope.user_follow_read, Scope.user_follow_modify]
