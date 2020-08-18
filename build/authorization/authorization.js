"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.followScopes = exports.listeningHistoryScopes = exports.libraryScopes = exports.playlistScopes = exports.userScopes = exports.playbackScopes = exports.spotifyConnectScopes = exports.imageScopes = exports.allScopes = exports.Scope = void 0;
var authorizationcodeflow_1 = require("./authorizationcodeflow");
Object.defineProperty(exports, "AuthorizationCodeFlow", { enumerable: true, get: function () { return authorizationcodeflow_1.AuthorizationCodeFlow; } });
var clientcredentialsflow_1 = require("./clientcredentialsflow");
Object.defineProperty(exports, "ClientCredentialFlow", { enumerable: true, get: function () { return clientcredentialsflow_1.ClientCredentialFlow; } });
var Scope;
(function (Scope) {
    //Images
    Scope["UGC_IMAGE_UPLOAD"] = "ugc-image-upload";
    //Spotify Connect
    Scope["USER_READ_PLAYBACK_STATE"] = "user-read-playback-state";
    Scope["USER_MODIFIED_PLAYBACK_STATE"] = "user-modify-playback-state";
    Scope["USER_READ_CURRENTLY_PLAYING"] = "user-read-currently-playing";
    //Playback
    Scope["STREAMING"] = "streaming";
    Scope["APP_REMOTE_CONTROL"] = "app-remote-control";
    //Users
    Scope["USER_READ_EMAIL"] = "user-read-email";
    Scope["USER_READ_PRIVATE"] = "user-read-private";
    //Playlist
    Scope["PLAYLIST_READ_COLLABORATIVE"] = "playlist-read-collaborative";
    Scope["PLAYLIST_MODIFY_PUBLIC"] = "playlist-modify-public";
    Scope["PLAYLIST_READ_PRIVATE"] = "playlist-read-private";
    Scope["PLAYLIST_MODIFY_PRIVATE"] = "playlist-modify-private";
    //Library
    Scope["USER_LIBRARY_MODIFY"] = "user-library-modify";
    Scope["USER_LIBRARY_READ"] = "user-library-read";
    //Listenting History
    Scope["USER_TOP_READ"] = "user-top-read";
    Scope["USER_READ_PLAYBACK_POSITION"] = "user-read-playback-position";
    Scope["USER_READ_RECENTLY_PLAYED"] = "user-read-recently-played";
    //Follow
    Scope["USER_FOLLOW_READ"] = "user-follow-read";
    Scope["USER_FOLLOW_MODIFY"] = "user-follow-modify";
})(Scope = exports.Scope || (exports.Scope = {}));
exports.allScopes = Object.values(Scope);
exports.imageScopes = [Scope.UGC_IMAGE_UPLOAD];
exports.spotifyConnectScopes = [Scope.USER_READ_PLAYBACK_STATE, Scope.USER_MODIFIED_PLAYBACK_STATE, Scope.USER_READ_CURRENTLY_PLAYING];
exports.playbackScopes = [Scope.STREAMING, Scope.APP_REMOTE_CONTROL];
exports.userScopes = [Scope.USER_READ_EMAIL, Scope.USER_READ_PRIVATE];
exports.playlistScopes = [Scope.PLAYLIST_READ_COLLABORATIVE, Scope.PLAYLIST_MODIFY_PUBLIC, Scope.PLAYLIST_READ_PRIVATE, Scope.PLAYLIST_MODIFY_PRIVATE];
exports.libraryScopes = [Scope.USER_LIBRARY_MODIFY, Scope.USER_LIBRARY_READ];
exports.listeningHistoryScopes = [Scope.USER_TOP_READ, Scope.USER_READ_PLAYBACK_POSITION, Scope.USER_READ_RECENTLY_PLAYED];
exports.followScopes = [Scope.USER_FOLLOW_READ, Scope.USER_FOLLOW_MODIFY];
