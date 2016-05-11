import qs from 'query-string';
import config from '../config';

const { apiPreffix, defaultHttpContentType } = config;


//  请求http的Content-Type格式, 一般为application/json, 某系系统比较老旧, 所以还是兼容form形式
let defaultHeaders = {
  'Accept': 'application/json'
};
let defaultType = 'json';
if (defaultHttpContentType && defaultHttpContentType !== 'default') {
  defaultHeaders = {
    ...defaultHeaders,
    'Content-Type': defaultHttpContentType
  };
  defaultType = 'form';
}


const defaultOptions = {
  credentials: 'same-origin'
};


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


// 转换成form表单形式
function toForm(body) {
  let form = new FormData();
  Object.keys(body).forEach(key=> {
    form.append(key, body[ key ]);
  });
  return form;
}


export function get({ url, params, headers = {}, options={} }) {
  if (url.indexOf('/') === 0) {
    url = apiPreffix + url;
  }
  if (params) {
    url += '?' + qs.stringify(params);
  }

  let fetchOptions = {
    headers: {
      ...defaultHeaders,
      headers
    },
    ...defaultOptions,
    ...options
  };

  return fetch(url, fetchOptions)
    .then(filterStatus)
    .then(parseJSON)
    .then(filterData)
}


export function post({ url, body, headers = {}, options={}, type='json', type = defaultType }) {
  if (url.indexOf('/') === 0) {
    url = apiPreffix + url;
  }
  let fetchOptions = {
    method: 'POST',
    body: type == 'json' ? JSON.stringify(body) : toForm(body),
    headers: {
      ...defaultHeaders,
      headers
    },
    ...defaultOptions,
    ...options
  };

  return fetch(url, fetchOptions)
    .then(filterStatus)
    .then(parseJSON)
    .then(filterData)
}



