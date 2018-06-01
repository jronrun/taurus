import axios from 'axios'
// enable mock
import mock from '../mock'

if (!global.config.debug.mock) {
  mock.restore()
}

let http = axios.create({
  baseURL: global.config.api,
  timeout: 1000
  // headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
})

http.interceptors.request.use(function (request) {
  return request
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  const request = response.config
  if (global.config.debug.http) {
    console.log(
      '>>>', request.method.toUpperCase(), request.url, request.params,
      '\n   ', response.status, response.data
    )
  }
  return response
}, function (error) {
  if (global.config.debug.http) {
    //error {"config":{"transformRequest":{},"transformResponse":{},"timeout":1000,"xsrfCookieName":"XSRF-TOKEN",
    // "xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"headers":{"Accept":"application/json, text/plain, */*"},
    // "method":"get","baseURL":"http://localhost:8088","url":"http://192.168.20.191:8696/test"},
    // "code":"ECONNABORTED","request":{}}
    let { response = {}, config: request } = error
    if (request) {
      console.log(
        '>>>', request.method.toUpperCase(), request.url, request.params,
        '\n   ', response.status, response.data
      )
    }
  }

  // Do something with response error
  return Promise.reject(error)
})

//Vue.prototype.$http = http

//TODO rem
global.http=http;

export default http
