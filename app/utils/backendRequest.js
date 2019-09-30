/**
 *  Backend Request Prototype interfacing an Axios instance
 *
 *  @link https://github.com/axios/axios
 */
import axios from 'axios'
import { AsyncStorage } from "react-native";
import Qs from 'qs'
import {
  assign,
  get,
  isBoolean,
  isEmpty,
  map,
  transform,
  typeOf,
} from './fp'
import config from '../config/config'
import BackendError from './backendError'
import { responseErrorToString } from './backendError'
import httpInterceptor from './httpInterceptor'

export const AXIOS_CONFIG = {
  baseURL: config.apiEndPoint,
  paramsSerializer: serializeURLParams,
  timeout: 0, // no timeout handling
  validateStatus: status => status >= 200 && status < 300,
  responseType: 'json',
  responseEncoding: 'utf8',
}

export const ERRORS = {
  API_RELEASE_NOT_PROVIDED: 'api release is not provided in response headers',
  API_VERSION_DEPRECATED: 'cache api major version does not match response version',
  AUTH_CACHE_NOT_FOUND: 'cache authentication has not been found',
}

export const USER_KEY = "userToken";

/**
 *  Backend Request Constructor
 *  @param {object} options
 *  @param {string} options.method
 *  @param {string} options.route
 *  @param {object} options.data optional
 *  @param {object} options.params optional url params
 *  @param {boolean} options.withAuthorization default true
 *  @param {boolean} options.withAPIVersionMatching default true
 */
const BackendRequest = function({
  method,
  route,
  data = undefined,
  params = undefined,
  withAuthorization = true,
  withAPIVersionMatching = true,
}) {
  this.config = {
    method,
    data,
    params,
    withAuthorization,
    withAPIVersionMatching,
    url: route,
    ...AXIOS_CONFIG
  }
  this.handler = undefined
  this.response = undefined
}


BackendRequest.prototype.initialize = async function() {
  return initialize.call(this)
}

export default BackendRequest
/**
 *  Initialize
 *  @this {object} instance of backend request
 *  @throws {Error}
 */
async function initialize() {
  await setConfiguration.call(this)
    .then(() => {
      [
        setHandler,
        addGlobalInterceptor,
        addCustomInterceptor
      ].forEach(init => {
        init.call(this)
      })
    })



  // const promises = [
  //   setConfiguration,
  //   setHandler,
  //   addGlobalInterceptor,
  //   addCustomInterceptor,
  // ].map(init => Promise.resolve(init.call(this)))

  return Promise.resolve()
}
/**
 *  Exec
 *  @return {Promise}
 *    - resolve: <*> response body data
 *    - reject : <Error> cf. backendError
 */
BackendRequest.prototype.exec = function() {
  return this.handler.request()
}
/**
 *  Set Configuration
 *        - provide Bearer Token in headers on demand
 *  @this {object}
 */
async function setConfiguration() {
  this.config.headers = assign({}, this.config.headers)
  // (?) issue with `transformRequest` methods where axios instance.data were
  //     returned with a `toString`
  this.config.data = fixBooleanValue(this.config.data)
  if (this.config.withAuthorization)
    return await provideJWT(this.config.headers)

  return Promise.resolve()
}
/**
 *  Set Handler
 *  @this {object}
 */
function setHandler() {
  this.handler = axios.create(this.config)
}
/**
 *  Add Global Interceptor
 *  @this {object}
 */
function addGlobalInterceptor() {
  this.handler.interceptors.request.use(
    httpInterceptor.request,
    httpInterceptor.requestError
  )

  this.handler.interceptors.response.use(
    httpInterceptor.response,
    httpInterceptor.responseError
  )

}
/**
 *  Add Custom Interceptor
 *        - check API version matching if needed
 *        - finally declare `response` instance field
 *  @this {object}
 */
function addCustomInterceptor() {
  this.handler.interceptors.response.use(
    response => {
      this.response = response
      
      return Promise.resolve(response.data)
    },
    error => {
      this.response = error.response
      let message = responseErrorToString(this.response);

      throw new BackendError(message);
    }
  )

}
/**
 *  Serialize URL Params
 *  @param {object} params
 *  @return {string}
 */
function serializeURLParams(params) {
  return Qs.stringify(params, {arrayFormat: 'brackets'})
}
/**
 *  Fix Boolean Value
 *        - each boolean value will be converted to string type (API specificity)
 *  @param {*} data
 *  @return {*}
 */
function fixBooleanValue(data) {
  if (typeOf(data) === 'array')
    return map(convertBooleanToString, data)

  if (typeOf(data) === 'object')
    return transform((acc, value, key) => {
      acc[key] = convertBooleanToString(value)
    }, {}, data)

  return convertBooleanToString(data)
}
/**
 *  Provide JWT
 *        - unpure function as it can be called within axios `transform`methods
 *  @param {object} headers mutate
 *  @throws {Error}
 */
async function provideJWT(headers) {
  const token = await AsyncStorage.getItem(USER_KEY);
  if (isEmpty(token))
    throw new Error(ERRORS.AUTH_CACHE_NOT_FOUND)

  headers['Authorization'] = token
}

/**
 *  Convert Boolean To String
 *  @param {*} value
 *  @return {*}
 */
function convertBooleanToString(value) {
  return (isBoolean(value)) ?
    (!isEmpty(value)).toString() :
    value;
}
