interface Album {
    albumType: string
    artists: Artist[]
    availableMarkets: string[]
    copyrights: Copyright[]
    externalIds: ExternalIds
    externalUrls: ExternalUrls
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
    externalUrls: ExternalUrls
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
    externalUrls: ExternalUrls
    uri: string
}
