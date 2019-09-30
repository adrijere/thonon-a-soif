/**
 *  Smart Reference for Lodash/FP methods
 *
 *        - Convert some necessary variadic iteratee methods [1]
 *        - Even if this vendor breaks cherry picking, please continue to do so
 *          eg. "import { transform } from '~/assets/fp'" (so it will be "tree-
 *          shaking ready")
 *        - Dissociate Lodash/FP `isEmpty` and real `isEmpty` one [2]
 *        - Add extra methods
 *
 *        (?) has discovered a non listed issue with `curry()` where `this`
 *            injection is broken (multiple arguments method will be called
 *            with `this` as `Global`, even if with a "JS-safe-code") → do not
 *            use `curry()` for instance propert methods
 *
 *  (+) Add additional methods
 *      - `isEmpty`
 *      - `typeOf`
 *      - `toString`
 *      - `fromJSON`
 *      - `promiseTry` based on "es6-promise-try" [3]
 *      - `generateUUID`
 *      - `promiseReflect` based on "bluebird reflect" idea [4]
 *      - `roundPrecise` enhancing `round` with precise arguments [5]
 *
 *  @link https://github.com/lodash/lodash/wiki/FP-Guide#user-content-convert [1]
 *  @link https://github.com/lodash/lodash/issues/496 [2]
 *  @link https://github.com/tc39/proposal-promise-try [3]
 *  @link http://bluebirdjs.com/docs/api/reflect.html [4]
 *  @link https://github.com/lodash/lodash/issues/2393 [5]
 *  @link https://github.com/jfmengels/lodash-fp-docs
 */
import {
  transform as _transform,
  toString as _toString,
  forOwn as _forOwn,
  forIn as _forIn,
  each as _each,
} from 'lodash/fp'

export const transform = _transform.convert({ cap: false })
export const forOwn = _forOwn.convert({ cap: false })
export const forIn = _forIn.convert({ cap: false })
export const each = _each.convert({ cap: false })

export { isEmpty as isCollectionEmpty } from 'lodash/fp'

export { default as promiseTry } from 'es6-promise-try'
/**
 *  Is Empty
 *  @param {*} mixedVar
 *  @return {boolean}
 */
export function isEmpty(mixedVar) {
  const emptyValues = [undefined, null, false, 0, '', '0']

  for (let i = 0; i < emptyValues.length; i ++)
    if (mixedVar === emptyValues[i])
      return true

  if (typeof mixedVar === 'object') {
    for (let key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }

  return false
}
/**
 *  Type Of
 *  @param {*} mixedVar
 *  @return {string}
 */
export function typeOf(mixedVar) {
  var s = Object.prototype.toString.call(mixedVar);
  return s.slice(8, s.length - 1).toLowerCase();
}
/**
 *  To String
 *  @param {*} mixedVar
 *  @return {string}
 */
export function toString(mixedVar) {
  if (typeOf(mixedVar) === 'error' && mixedVar.hasOwnProperty('message'))
    return mixedVar.message
  return _toString(mixedVar)
}
/**
 *  From JSON
 *        - leave value as is if not an object nor an array
 *        - eg.
 *              <string> "{}"   → <object> {}
 *              <string> "[]"   → <array> []
 *              <string> "foo"  → <string> "foo"
 *              <string> "3"    → <number> 3
 *              <string> "true" → <boolean> true
 *  @public
 *  @param {*} mixedVar
 *  @return {*}
 */
export function fromJSON(mixedVar) {
  try {
    return JSON.parse(mixedVar)
  } catch (e) {
    return mixedVar
  }
}
/**
 *  Generate UUID
 *  @return {String}
 */
export function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
/**
 *  Reflect
 *  @param {Promise} promise
 *  @return {Promise}
 *    - <string> status ["resolved" | "rejected"]
 *    - <*> result
 */
export function promiseReflect(promise) {
  return promise
    .then(
      res => ({ status: 'resolved', result: res }),
      res => ({ status: 'rejected', result: res }),
    )
}

/**
 *  Round Precise
 *        - based on Lodash classic round method
 *        - /!\ no auto currying yet
 *  @link https://github.com/lodash/lodash/blob/master/round.js
 *  @param {number} precision
 *  @return {(<number>) => (<number>)}
 */
export function roundPrecise(precision) {
  return number => {
    const func = Math.round
    precision = precision == null ? 0 : (precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292))
    if (precision) {
      // Shift with exponential notation to avoid floating-point issues.
      // See [MDN](https://mdn.io/round#Examples) for more details.
      let pair = `${number}e`.split('e')
      const value = func(`${pair[0]}e${+pair[1] + precision}`)

      pair = `${value}e`.split('e')
      return +`${pair[0]}e${+pair[1] - precision}`
    }
    return func(number)
  }
}

export * from 'lodash/fp'
