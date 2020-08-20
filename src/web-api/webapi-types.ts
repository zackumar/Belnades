interface Album {
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

interface Artist {
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

interface AudioFeatures {
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

interface Category {
    href: string
    icons: APIImage[]
    id: string
    name: string
}

interface Context {
    type: string
    href: string
    externalUrls: ExternalUrl
    uri: string
}

interface Copyright {
    text: string
    type: string // C/P
}

interface Cursor {
    after: string
}

interface Disallows {
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

interface Error {
    status: number
    message: string
}

interface PlayerError {
    status: number
    message: string
    reason: string
}

interface ExternalId {
    type: string
    id: string
}

interface ExternalUrl {
    type: string
    url: string
}

interface Followers {
    href: string
    total: number
}

interface APIImage {
    height: number
    url: string
    widht: number
}

interface Paging {
    href: string
    items: []
    limit: number
    next: string
    offset: number
    previous: string
    total: number
}

interface CursorBasedPaging {
    href: string
    items: []
    limit: number
    next: string
    cursors: Cursor
    total: number
}

interface PlayHistory {
    track: Track
    playedAt: Date //Timestamp
    context: Context
}

interface Playlist {
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

interface PlaylistTrack {
    addedAt: Date //timestamp
    addedBy: User
    isLocal: boolean
    track: Track | Episode
}

interface Recommendations {
    seeds: RecommendationsSeed[]
    tracks: Track[]
}

interface RecommendationsSeed {
    afterFilteringSize: number
    afterRelinkingSize: number
    href: string
    id: string
    initialPoolSize: number
    type: string
}

interface Restrictions {
    reason: string
}

interface SavedTrack {
    addedAt: Date //Timestamp
    track: Track
}

interface SavedAlbum {
    addedAt: Date //Timestamp
    album: Album
}

interface SavedShow {
    addedAt: Date //Timestamp
    show: Show
}

interface Track {
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

interface TrackLink {
    externalUrls: ExternalUrl
    href: string
    id: string
    type: string
    uri: string
}

interface Episode {
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

interface ResumePoint {
    fullyPlayed: boolean
    resumePositionMiliseconds: number
}

interface Show {
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

interface User {
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
