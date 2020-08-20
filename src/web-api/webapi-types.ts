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
