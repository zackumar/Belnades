"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.put = exports.del = exports.post = exports.get = void 0;
var superagent_1 = __importDefault(require("superagent"));
function getParamsFromRequest(request) {
    var options = {};
    if (request.getQueryParams) {
        options.query = request.getQueryParams;
    }
    if (request.getHeaders && request.getHeaders['Content-Type'] === 'application/json') {
        options.data = JSON.stringify(request.getBodyParams);
    }
    else if (request.getBodyParams) {
        options.data = request.getBodyParams;
    }
    if (request.getHeaders) {
        options.headers = request.getHeaders;
    }
    return options;
}
function makeRequest(method, uri, options, callback) {
    var req = superagent_1.default.get.bind(superagent_1.default)(uri);
    if (options.query) {
        req.query(options.query);
    }
    if (options.data && options.headers['Content-Type'] !== 'application/json') {
        req.type('from');
        req.send(options.data);
    }
    else if (options.data) {
        req.send(options.data);
    }
    if (options.headers) {
        req.set(options.headers);
    }
    req.end(function (err, response) {
        if (err) {
            return callback(err);
        }
        return callback(undefined, {
            body: response.body,
            headers: response.headers,
            statusCode: response.statusCode,
        });
    });
}
function get(request, callback) {
    var options = getParamsFromRequest(request);
    var method = superagent_1.default.get;
    makeRequest(method, request.getUri(), options, callback);
}
exports.get = get;
function post(request, callback) {
    var options = getParamsFromRequest(request);
    var method = superagent_1.default.post;
    makeRequest(method, request.getUri(), options, callback);
}
exports.post = post;
function del(request, callback) {
    var options = getParamsFromRequest(request);
    var method = superagent_1.default.del;
    makeRequest(method, request.getUri(), options, callback);
}
exports.del = del;
function put(request, callback) {
    var options = getParamsFromRequest(request);
    var method = superagent_1.default.put;
    makeRequest(method, request.getUri(), options, callback);
}
exports.put = put;
