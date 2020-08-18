class Request {
    private scheme: string
    private host: string
    private port: number
    private path: string

    private headers: any
    private queryParameters: any
    private bodyParameters: any

    constructor(scheme: string, host: string, port: number, path: string, headers: object, queryParams: object, bodyParams: object) {
        this.scheme = scheme
        this.host = host
        this.port = port
        this.path = path

        this.headers = headers
        this.queryParameters = queryParams
        this.bodyParameters = bodyParams
    }

    public get getScheme() {
        return this.scheme
    }

    public get getHost() {
        return this.host
    }

    public get getPort() {
        return this.port
    }

    public get getPath() {
        return this.path
    }

    public get getHeaders() {
        return this.headers
    }

    public get getQueryParams() {
        return this.queryParameters
    }

    public get getBodyParams() {
        return this.bodyParameters
    }

    public getUri(): string {
        if (!this.scheme || !this.host || !this.port) {
            throw new Error('Missing required components to constuct URI')
        }

        let uri = `${this.scheme}://${this.host}`
        if ((this.scheme === 'http' && this.port !== 80) || (this.scheme === 'https' && this.port !== 443)) {
            uri += ':' + this.port
        }
        if (this.path) {
            uri += this.path
        }
        return uri
    }

    public getUrl(): string {
        let uri = this.getUri()
        if (this.queryParameters) {
            return uri + this.getQueryParametersAsString()
        }
        return uri
    }

    public getQueryParametersAsString(): string | undefined {
        if (this.queryParameters) {
            return (
                '?' +
                Object.keys(this.queryParameters)
                    .filter((key: string) => {
                        return this.queryParameters[key] !== undefined
                    })
                    .map((key: string) => {
                        return `${key}=${encodeURIComponent(this.queryParameters[key])}`
                    })
                    .join('&')
            )
        }
        return
    }

    public execute(method: Function, callback?: Function): any {
        if (callback) {
            method(this, callback)
            return
        }

        let self = this
        return new Promise((resolve: any, reject: any) => {
            method(self, (err: any, res: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        })
    }
}

class RequestBuilder {
    private scheme: string | undefined
    private host: string | undefined
    private port: number | undefined
    private path: string | undefined

    private headers: any
    private queryParameters: any
    private bodyParameters: any

    public withScheme(scheme: string): RequestBuilder {
        this.scheme = scheme
        return this
    }

    public withHost(host: string): RequestBuilder {
        this.host = host
        return this
    }

    public withPort(port: number): RequestBuilder {
        this.port = port
        return this
    }

    public withPath(path: string): RequestBuilder {
        this.path = path
        return this
    }

    public withAuth(accessToken: string): RequestBuilder {
        if (accessToken) {
            this.withHeaders({ Authorization: `Bearer ${accessToken}` })
        }
        return this
    }

    public withQueryParameters(queryParams: object): RequestBuilder {
        this.queryParameters = Object.assign(this.queryParameters || {}, queryParams)
        return this
    }

    public withBodyParameters(bodyParams: object): RequestBuilder {
        this.bodyParameters = Object.assign(this.bodyParameters || {}, bodyParams)
        return this
    }

    public withHeaders(headers: object): RequestBuilder {
        this.headers = Object.assign(this.headers || {}, headers)
        return this
    }

    public build(): Request {
        if (!this.scheme || !this.host) {
            throw new Error('Missing required components to build request')
        }
        if (!this.port) {
            if (this.scheme === 'http') {
                this.port = 80
            } else if (this.scheme === 'https') {
                this.port = 443
            } else {
                throw new Error('Missing port. Could not infer from scheme')
            }
        }
        if (!this.path) {
            this.path = '/'
        }

        return new Request(this.scheme, this.host, this.port, this.path, this.headers, this.queryParameters, this.bodyParameters)
    }
}

export { Request, RequestBuilder }
