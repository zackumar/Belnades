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
    Scope["ugc_image_upload"] = "ugc-image-upload";
    //Spotify Connect
    Scope["user_read_playback_state"] = "user-read-playback-state";
    Scope["user_modified_playback_state"] = "user-modify-playback-state";
    Scope["user_read_currently_playing"] = "user-read-currently-playing";
    //Playback
    Scope["streaming"] = "streaming";
    Scope["app_remote_control"] = "app-remote-control";
    //Users
    Scope["user_read_email"] = "user-read-email";
    Scope["user_read_private"] = "user-read-private";
    //Playlist
    Scope["playlist_read_collaborative"] = "playlist-read-collaborative";
    Scope["playlist_modify_public"] = "playlist-modify-public";
    Scope["playlist_read_private"] = "playlist-read-private";
    Scope["playlist_modify_private"] = "playlist-modify-private";
    //Library
    Scope["user_library_modify"] = "user-library-modify";
    Scope["user_library_read"] = "user-library-read";
    //Listenting History
    Scope["user_top_read"] = "user-top-read";
    Scope["user_read_playback_position"] = "user-read-playback-position";
    Scope["user_read_recently_played"] = "user-read-recently-played";
    //Follow
    Scope["user_follow_read"] = "user-follow-read";
    Scope["user_follow_modify"] = "user-follow-modify";
})(Scope = exports.Scope || (exports.Scope = {}));
exports.allScopes = Object.values(Scope);
exports.imageScopes = [Scope.ugc_image_upload];
exports.spotifyConnectScopes = [Scope.user_read_playback_state, Scope.user_modified_playback_state, Scope.user_read_currently_playing];
exports.playbackScopes = [Scope.streaming, Scope.app_remote_control];
exports.userScopes = [Scope.user_read_email, Scope.user_read_private];
exports.playlistScopes = [Scope.playlist_read_collaborative, Scope.playlist_modify_public, Scope.playlist_read_private, Scope.playlist_modify_private];
exports.libraryScopes = [Scope.user_library_modify, Scope.user_library_read];
exports.listeningHistoryScopes = [Scope.user_top_read, Scope.user_read_playback_position, Scope.user_read_recently_played];
exports.followScopes = [Scope.user_follow_read, Scope.user_follow_modify];
