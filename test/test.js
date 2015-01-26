
var assert = require('assert');
var getWindow = require('../');
var getDocument = require('get-document');

describe('get-window', function () {

  it('should work with the global Window object', function () {
    var win = getWindow(window);
    assert(win === window);
  });

  it('should work with the global Document object', function () {
    var win = getWindow(document);
    assert(win === window);
  });

  it('should work with the `document.body` object', function () {
    var win = getWindow(document.body);
    assert(win === window);
  });

  it('should work with the a DOM element inside `document.body`', function () {
    var win = getWindow(document.body.firstChild);
    assert(win === window);
  });

  it('should work with a new DOM element', function () {
    var win = getWindow(document.createElement('div'));
    assert(win === window);
  });

  it('should work with a new TextNode', function () {
    var win = getWindow(document.createTextNode(''));
    assert(win === window);
  });

  // skip on IE <= 8
  if ('function' === typeof document.createRange) {
    it('should work with a DOM Range instance', function () {
      var win = getWindow(document.createRange());
      assert(win === window);
    });
  }

  // skip on IE <= 8
  if ('function' === typeof window.getSelection) {
    it('should work with a DOM Selection instance', function () {
      var sel = window.getSelection();

      // NOTE: a Selection needs to have some kind of selection on it
      // (i.e. not `type: "None"`) in order for a Document to be found
      var range = document.createRange();
      range.selectNode(document.body);
      sel.removeAllRanges();
      sel.addRange(range);

      var win = getWindow(sel);
      assert(win === window);

      // clean up
      sel.removeAllRanges();
    });
  }

  it('should work with the child node of an IFRAME element', function () {
    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    // `contentWindow` should be used for best browser compatibility
    var doc = getDocument(iframe.contentWindow);
    assert.equal(9, doc.nodeType);

    doc.open();
    doc.write('<body><b>hello world</b></body>');
    doc.close();

    var win = getWindow(doc);
    assert(win);
    assert(win !== window);

    // test the <body>
    var body = doc.body;
    assert(win === getWindow(body));

    // test the <b> node
    assert(win === getWindow(body.firstChild));

    // clean up
    document.body.removeChild(iframe);
  });

});
