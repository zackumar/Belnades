export interface Album {
    interfaceType: 'album'

    albumType: string
    artists: Artist[]
    availableMarkets: string[]
    copyrights: Copyright[]
    externalIds: ExternalId
    externalUrls: ExternalUrl
    genres: string[]
    href: string
    id: string
    images: APIImage[]
    label: string
    name: string
    popularity: number
    releaseDate: string
    releaseDatePrecision: string
    restrictions: Restrictions
    tracks: Track[]
    type: string
    uri: string
}

export interface Artist {
    externalUrls: ExternalUrl
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: APIImage[]
    name: string
    popularity: number
    type: string
    uri: string
}

export interface AudioFeatures {
    acousticness: number
    analysisUrl: string
    danceability: number
    durationMiliseconds: number
    energy: number
    id: string
    instrumentalness: number
    key: number //Pitch Class Notation,
    liveness: number
    loudness: number
    mode: number
    speechiness: number
    tempo: number
    timeSignature: number
    trackHref: string
    type: string
    uri: string
    valence: number
}

export interface Category {
    href: string
    icons: APIImage[]
    id: string
    name: string
}

export interface Context {
    type: string
    href: string
    externalUrls: ExternalUrl
    uri: string
}

export interface Copyright {
    text: string
    type: string // C/P
}

export interface Cursor {
    after: string
}

export interface Disallows {
    interruptingPlayback: boolean
    pausing: boolean
    resuming: boolean
    seeking: boolean
    skippingNext: boolean
    skippingBack: boolean
    togglingRepeatContext: boolean
    togglingShuffle: boolean
    togglingRepeatTrack: boolean
    transferingPlayback: boolean
}

export interface Error {
    status: number
    message: string
}

export interface PlayerError {
    status: number
    message: string
    reason: string
}

export interface ExternalId {
    type: string
    id: string
}

export interface ExternalUrl {
    type: string
    url: string
}

export interface Followers {
    href: string
    total: number
}

export interface APIImage {
    height: number
    url: string
    widht: number
}

export interface Paging {
    href: string
    items: []
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}

export interface CursorBasedPaging {
    href: string
    items: []
    limit: number
    next: string
    cursors: Cursor
    total: number
}

export interface PlayHistory {
    track: Track
    playedAt: Date //Timestamp
    context: Context
}

export interface Playlist {
    collaborative: boolean
    description: string | undefined
    externalUrls: ExternalUrl
    followers: Followers
    href: string
    id: string
    images: APIImage[]
    name: string
    owner: User
    public: boolean | undefined
    snapshotId: string
    tracks: Paging //[] inside paging object
    type: string
    uri: string
}

export interface PlaylistTrack {
    addedAt: Date //timestamp
    addedBy: User
    isLocal: boolean
    track: Track | Episode
}

export interface Recommendations {
    seeds: RecommendationsSeed[]
    tracks: Track[]
}

export interface RecommendationsSeed {
    afterFilteringSize: number
    afterRelinkingSize: number
    href: string
    id: string
    initialPoolSize: number
    type: string
}

export interface Restrictions {
    reason: string
}

export interface SavedTrack {
    addedAt: Date //Timestamp
    track: Track
}

export interface SavedAlbum {
    addedAt: Date //Timestamp
    album: Album
}

export interface SavedShow {
    addedAt: Date //Timestamp
    show: Show
}

export interface Track {
    album: Album
    artist: Artist[]
    availableMarkets: string[]
    discNumber: number
    durationMiliseconds: number
    explicit: boolean
    externalIds: ExternalId
    externalUrls: ExternalUrl
    href: string
    id: string
    isPlayable: boolean
    linkedFrom: TrackLink
    restrictions: Restrictions
    name: string
    popularity: number
    previewUrl: string | undefined
    trackNumber: number
    type: string
    uri: string
    isLocal: boolean
}

export interface TrackLink {
    externalUrls: ExternalUrl
    href: string
    id: string
    type: string
    uri: string
}

export interface Episode {
    audioPreviewUrl: string
    description: string
    durationMiliseconds: number
    explicit: boolean
    externalUrls: ExternalUrl
    href: string
    id: string
    images: APIImage[]
    isExternallyHosted: boolean
    isPlayable: boolean
    languages: string[]
    name: string
    releaseDate: string
    releaseDatePrecision: string
    resumePoint: ResumePoint
    show: Show
    type: string
    uri: string
}

export interface ResumePoint {
    fullyPlayed: boolean
    resumePositionMiliseconds: number
}

export interface Show {
    availableMarkets: string[]
    copyrights: Copyright[]
    description: string
    explicit: boolean
    episodes: Paging //Episodes [] inside
    externalUrls: ExternalUrl
    href: string
    id: string
    images: APIImage[]
    isExternallyHosted: boolean | undefined
    languages: string[]
    mediaType: string
    name: string
    publisher: string
    type: string
    uri: string
}

export interface User {
    country: string
    displayName: string
    email: string
    externalUrls: ExternalUrl
    followers: Followers
    href: string
    id: String
    images: APIImage[]
    product: string
    type: string
    uri: string
}
