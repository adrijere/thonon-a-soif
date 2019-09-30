/**
 *  Prototype enhancing default browser console handler
 *
 *  @param {boolean} devOnly default is true to allow safe debug log
 *  @param {object} handler default is the global `console`
 *  @param {boolean} silent default is false
 *  @param {string} callee "type:name" optional, types are "plugin",
 *                  "assets", "middleware" and "component",
 */
import { typeOf, isEmpty, split } from './fp'

const TYPES = ['log', 'info', 'error', 'warn', 'debug'];

export default function Logger({
  devOnly = true,
  callee = '',
  handler = console,
  silent = false
} = {}) {
  this.devOnly = devOnly
  this.callee = callee
  this.handler = handler
  this.silent = silent
}

TYPES.forEach(type => {
  Logger.prototype[type] = function() {
    return this.write(type)(...arguments)
  }
})

Logger.prototype.write = function(type) {
  return (...messages) => {
    try {
      let row = new Row()
      let calleeOptions = split(':', this.callee)
      // Validation
      validateOutput(this.silent, this.devOnly, process.env.NODE_ENV)
      // Add the bullet
      row.push(
        getBulletContent(type),
        getBulletStyle(type)
      )
      // Add the date
      row.push(
        getCreationDate(),
        'font-size: 9px; padding: 4px 5px;'
      )
      // Add the callee (optional)
      if (calleeOptions.length > 1)
        row.push(
          calleeOptions[1],
          getCalleeStyle(calleeOptions[0])
        )
      // Add provided messages
      messages.forEach(row.push)
      // Output
      this.handler.log.apply(console, row.toArray())
    } catch (e) {
      // eslint-disable-next-line no-console
    }
  }
}
/**
 *  Validate Output
 *  @param {boolean} isSilent
 *  @param {string} isDevelopmentEnvironmentOnly
 *  @param {string} currentEnvironment
 *  @throws {Error}
 */
function validateOutput(
  isSilent,
  isDevelopmentEnvironmentOnly,
  currentEnvironment) {
  if (isSilent)
    throw new Error('silent log cannot be output')
  if (isDevelopmentEnvironmentOnly && currentEnvironment !== 'development')
    throw new Error('log output is restricted to development environment only')
}
/**
 *  Get Bullet Content
 *  @private
 *  @param {string} type
 *  @return {string}
 */
function getBulletContent(type) {
  return (type === 'log') ? '▷' : '▶';
}
/**
 *  Get Bullet Style
 *  @param {string} type
 *  @return {string}
 */
function getBulletStyle(type) {
  let style = 'color: ';

  switch (type) {
    case 'error'  : style += '#BF3F3F'; break;
    case 'warn'   : style += '#D4CC5B'; break;
    case 'info'   : style += '#69A1F0'; break;
    default       : style += '#A9A9A9'; break;
  }

  return style + '; padding: 4px 5px; font-weight: bold;';
}
/**
 *  Get Creation Date
 *  @return {string}
 */
function getCreationDate() {
  return new Date().toLocaleTimeString();
}
/**
 *  Get Callee Style
 *  @param {string} type
 *  @return {string}
 */
function getCalleeStyle(type) {
  let style = 'color: #FFFFFF; background: ';

  switch (type) {
    case 'plugin'    : style += '#A1D490'; break;
    case 'component' : style += '#D4A190'; break;
    case 'middleware': style += '#B6CDB9'; break;
    case 'store'     : style += '#90C3D4'; break;
  }

  return style + '; padding: 4px 5px; font-size: 10px;';
}
/**
 *  Row
 *  @class
 */
const Row = function() {
  // A list of cells contained in the row
  const cells = [];

  return {
    /**
     *  Push
     *        - add a cell into the row
     *  @public
     *  @param {*} content
     *  @param {string} style [optional]
     */
    push: function(content, style) {
      const cell = {
        content: content
      };
      // Inject style if provided
      if (typeOf(style) === 'string')
        cell.style = style;
      // Add the cell
      cells.push(cell);
    },
    /**
     *  To Array
     *  @public
     *  @return {array}
     */
    toArray: function() {
      let stylizedContents = '';
      let styleRules       = [];
      let miscContents     = [];

      for (let idx = 0; idx < cells.length; idx ++) {
        let cell = cells[idx];
        // Cell without style case
        if (! ('style' in cell)) {
          miscContents.push(cell.content);
          continue;
        }
        // Stylized cell
        stylizedContents += '%c' + cell.content;
        styleRules.push(cell.style);
      }

      return (isEmpty(stylizedContents)) ?
        miscContents :
        [stylizedContents].concat(styleRules, miscContents);
    }
  };
};
