
/**
 * Module dependencies.
 */

var getDocument = require('get-document');

/**
 * Module exports.
 */

module.exports = getWindow;

/**
 * Returns `true` if `w` is a Window object, or `false` otherwise.
 *
 * @param {?} w - Window object, maybe
 * @return {Boolean}
 * @private
 */

function isWindow (w) {
  return w && w.window === w;
}

/**
 *
 * @param {Mixed} node - DOM node, selection, or range in which to find the `document` object
 * @return {Document} the `window` object associated with `node`
 * @public
 */

function getWindow(node) {
  if (isWindow(node)) {
    return node;
  }

  // TODO: add old-IE fallback logic: http://stackoverflow.com/a/10260692
  var doc = getDocument(node);
  return doc.defaultView;
}
