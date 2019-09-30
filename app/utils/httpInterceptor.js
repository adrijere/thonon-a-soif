/**
 *  Singleton acting as a global HTTP Interceptor
 *
 *        - signature's method follows Axios configuration [1]
 *
 *  @link https://gist.github.com/moreta/fb2625c59aa788009b1f7ce8e44ac559 [1]
 */
import Logger from './console'


const console = new Logger({ callee: 'plugin:http-interceptor' })

const httpInterceptor = {
  /**
   *  Request
   *  @param {object} config
   *  @return {Promise} <object>
   */
  request(config) {
    return Promise.resolve(config)
  },
  /**
   *  Request Error
   *  @param {object} error
   *  @retunr {Promise}
   */
  requestError(error) {
    console.warn('request error captured', error)

    return Promise.reject(error)
  },
  /**
   *  Response Error
   *  @param {object} response
   *  @param {object} response.config
   *  @param {object} response.data
   *  @param {object} response.headers
   *  @param {XMLHttpRequest} response.request
   *  @param {number} response.status
   *  @param {string} response.statusText
   *  @return {Promise} <object>
   */
  response(response) {
    return Promise.resolve(response)
  },
  /**
   *  Response Error
   *  @param {object} error
   *  @param {object} error.config
   *  @param {XMLHttpRequest} error.request
   *  @param {object} error.response
   *  @return {Promise}
   */
  responseError(error) {
    return Promise.reject(error)
  },

}

export default httpInterceptor
