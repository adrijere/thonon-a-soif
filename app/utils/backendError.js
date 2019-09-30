/**
 *  Backend Error Prototype abstracting API returned response error
 *
 */
import {
  filter,
  flow,
  has,
  header,
  isArray,
  isEmpty,
  map,
  negate,
  pickBy,
  size,
  startsWith,
  toString,
  transform,
  typeOf,
} from './fp'

export const ERRORS = {
  MISC: 'miscelleanous backend error returned',
}
/**
 *  Backend Error Constructor
 *  @param {string} message
 *  @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#ES5_Custom_Error_Object
 */
function BackendError(message) {
  const instance = new Error(message)

  Object.setPrototypeOf(instance, Object.getPrototypeOf(this))

  return instance
}

BackendError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

export default BackendError
/**
 *  Response Error To String
 *    a) provided error in JSON `message` property
 *    b) provided error in JSON `global` property
 *    c) first provided error in JSON miscelleanous property
 *    d) provided error in body
 *    e) no error provided
 *  @param {Response|object} response
 *  @return {string}
 */
export function responseErrorToString(response) {
  try {
    if (typeOf(response) !== 'object' || typeOf(response.data) !== 'object')
      throw 'not formatted as an object'
    // a)
    if (has('message', response.data))
      return toString(response.data.message);

    let collection = flow([
      pickBy(filter(isArray)),
      pickBy(filter(negate(size)))
    ])(response.data)

    if (!size(collection))
      throw 'no error found in backend error object'

    let list = transform(
      (acc, value, key) => acc.push(`${key}:${value[0]}`),
      []
    )(collection)

    let globalErr = flow([
      map,
      filter(startsWith('global:')),
      header
    ])(list)
    // b), c)
    return toString(globalErr || header(list))

  } catch (e) {
    // d), e)
    return !isEmpty(response) && !isEmpty(response.data) ?
      toString(response.data) :
      ERRORS.MISC
  }
}
