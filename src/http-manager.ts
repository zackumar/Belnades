import superagent from 'superagent'
import { Request } from './request'

function getParamsFromRequest(request: Request) {
    let options: any = {}
    if (request.getQueryParams) {
        options.query = request.getQueryParams
    }
    if (request.getHeaders && request.getHeaders['Content-Type'] === 'application/json') {
        options.data = JSON.stringify(request.getBodyParams)
    } else if (request.getBodyParams) {
        options.data = request.getBodyParams
    }
    if (request.getHeaders) {
        options.headers = request.getHeaders
    }
    return options
}

function makeRequest(method: Function, uri: string, options: any, callback: CallableFunction) {
    let req = method.bind(superagent)(uri)
    if (options.query) {
        req.query(options.query)
    }
    if (options.data && options.headers['Content-Type'] !== 'application/json') {
        req.type('from')
        req.send(options.data)
    } else if (options.data) {
        req.send(options.data)
    }
    if (options.headers) {
        req.set(options.headers)
    }
    req.end((err: any, response: any) => {
        if (err) {
            return callback(err)
        }

        return callback(undefined, {
            body: response.body,
            headers: response.headers,
            statusCode: response.statusCode,
        })
    })
}

function get(request: Request, callback: CallableFunction) {
    var options = getParamsFromRequest(request)
    var method = superagent.get
    makeRequest(method, request.getUri(), options, callback)
}

function post(request: Request, callback: CallableFunction) {
    var options = getParamsFromRequest(request)
    var method = superagent.post
    makeRequest(method, request.getUri(), options, callback)
}

function del(request: Request, callback: CallableFunction) {
    var options = getParamsFromRequest(request)
    var method = superagent.del
    makeRequest(method, request.getUri(), options, callback)
}

function put(request: Request, callback: CallableFunction) {
    var options = getParamsFromRequest(request)
    var method = superagent.put
    makeRequest(method, request.getUri(), options, callback)
}

export { get, post, del, put }
