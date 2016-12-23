'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = includeJscadSync;
//
// THESE FUNCTIONS ARE SERIALIZED FOR INCLUSION IN THE FULL SCRIPT
//
// TODO It might be possible to cache the serialized versions
//

// Include the requested script via MemFs (if available) or HTTP Request
//
// (Note: This function is appended together with the JSCAD script)
//
function includeJscadSync(relpath, fn) {
  //console.log('include', relpath, fn)
  // include the requested script via MemFs if possible
  return new Promise(function (resolve, reject) {
    if ((typeof gMemFs === 'undefined' ? 'undefined' : _typeof(gMemFs)) === 'object') {
      for (var fs in gMemFs) {
        if (gMemFs[fs].name === fn) {
          //eval(gMemFs[fs].source)
          resolve(gMemFs[fs].source);
        }
      }
    }
    // include the requested script via webserver access
    var xhr = new XMLHttpRequest();
    var url = relpath + fn;
    if (fn.match(/^(https:|http:)/i)) {
      url = fn;
    }
    xhr.open('GET', url, false);
    xhr.onload = function () {
      var src = this.responseText;
      //console.log('src',src)
      //eval(src) // UGH ???
      resolve(src);
    };
    xhr.onerror = function () {};
    xhr.send();
  });
}