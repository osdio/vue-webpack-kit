import qs from 'query-string';


const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const apiPreffix = '/api';
const env = process.env.NODE_ENV;
const isSetHeaderAuth = env !== 'production' && env !== 'production.native' && env !== 'development.native';


// 处理基本的错误, 如500, 404等等
function filterStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res
    }
    else {
        let error = new Error(res.statusText);
        error.res = res;
        error.type = 'http';
        throw error;
    }
}


// 解析为json格式
function parseJSON(res) {
    return res.json();
}


// 处理错误的返回信息(200)
function filterData(data) {
    if (data.code === 0) {
        return data.data
    }
    let error = new Error(data.msg);
    error.data = data;
    error.type = 'data';
    throw error;
}


export function get(url, params, headers = {}) {
    if (url.indexOf('/') === 0) {
        url = apiPreffix + url;
    }
    if (params) {
        url += '?' + qs.stringify(params);
    }

    return fetch(url, {
        headers: bindDevAuthHeader(headers),
        credentials: 'same-origin'
    })
        .then(filterStatus)
        .then(parseJSON)
        .then(filterData)
}


export function post(url, body, headers = {}) {
    if (url.indexOf('/') === 0) {
        url = apiPreffix + url;
    }
    let h = bindDevAuthHeader(headers);
    let fetchOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            ...defaultHeaders,
            ...h
        },
        credentials: 'same-origin'
    };

    return fetch(url, fetchOptions)
        .then(filterStatus)
        .then(parseJSON)
        .then(filterData)
}

export function bindDevAuthHeader(headers) {
    let ret = {
        ...headers
    }, auth;
    if (isSetHeaderAuth) {
        auth = window.localStorage.getItem('auth');
        auth && (ret.Authorization = auth);
    }
    return ret;
}



