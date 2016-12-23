'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rebuildSolidSync = rebuildSolidSync;
exports.rebuildSolidAsync = rebuildSolidAsync;

var _jscadFunction = require('./jscad-function');

var _jscadFunction2 = _interopRequireDefault(_jscadFunction);

var _includeJscadSync = require('./includeJscadSync');

var _includeJscadSync2 = _interopRequireDefault(_includeJscadSync);

var _webWorkify = require('webWorkify');

var _webWorkify2 = _interopRequireDefault(_webWorkify);

var _csg = require('../csg');

var _misc = require('../utils/misc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * helper function that finds include() statements in files,
 * fetches their code & returns it (recursively) returning the whole code with
 * inlined includes
 * this is more reliable than async xhr + eval()
 * @param {String} text the original script (with include statements)
 * @param {String} relpath relative path, for xhr resolution
 * @returns {String} the full script, with inlined
 */
function replaceIncludes(text, relpath) {
  return new Promise(function (resolve, reject) {
    var scriptWithIncludes = text;
    var includesPattern = /(?:include)\s?\("([\w\/.\s]*)"\);?/gm;

    var foundIncludes = [];
    var foundIncludesFull = [];
    var match = void 0;
    while (match = includesPattern.exec(text)) {
      foundIncludes.push(match[1]);
      foundIncludesFull.push(match[0]);
    }

    var tmpPromises = foundIncludes.map(function (uri, index) {
      var promise = (0, _includeJscadSync2.default)(relpath, uri);
      return promise.then(function (includedScript) {
        return replaceIncludes(includedScript, relpath).then(function (substring) {
          var currentItem = foundIncludesFull[index];
          scriptWithIncludes = scriptWithIncludes.replace(currentItem, substring);
          return scriptWithIncludes;
        });
      });
    });
    Promise.all(tmpPromises).then(function (x) {
      return resolve(scriptWithIncludes);
    });
  });
}

/**
 * evaluate script & rebuild solids, in main thread
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} globals the globals to use when evaluating the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 */
function rebuildSolidSync(script, fullurl, parameters, globals, callback) {
  var relpath = fullurl;
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1);
  }

  replaceIncludes(script, relpath).then(function (fullScript) {
    var func = (0, _jscadFunction2.default)(fullScript, globals);
    // stand-in for the include function(no-op)
    var include = function include(x) {
      return x;
    };
    try {
      var objects = func(parameters, include, globals);
      objects = (0, _misc.toArray)(objects);
      if (objects.length === 0) {
        throw new Error('The JSCAD script must return one or more CSG or CAG solids.');
      }
      callback(undefined, objects);
    } catch (error) {
      callback(error, undefined);
    }
  }).catch(function (error) {
    return callback(error, undefined);
  });
}

/**
 * evaluate script & rebuild solids, in seperate thread/webworker
 * @param {String} script the script
 * @param {String} fullurl full url of current script
 * @param {Object} parameters the parameters to use with the script
 * @param {Object} globals the globals to use when evaluating the script
 * @param {Object} callback the callback to call once evaluation is done /failed
 */
function rebuildSolidAsync(script, fullurl, parameters, globals, callback) {
  if (!parameters) {
    throw new Error("JSCAD: missing 'parameters'");
  }
  if (!window.Worker) throw new Error('Worker threads are unsupported.');

  var relpath = fullurl;
  if (relpath.lastIndexOf('/') >= 0) {
    relpath = relpath.substring(0, relpath.lastIndexOf('/') + 1);
  }

  replaceIncludes(script, relpath).then(function (fullScript) {
    var worker = (0, _webWorkify2.default)(require('./jscad-worker.js'));
    worker.onmessage = function (e) {
      if (e.data instanceof Object) {
        var data = e.data.objects.map(function (object) {
          if (object['class'] === 'CSG') {
            return _csg.CSG.fromCompactBinary(object);
          }
          if (object['class'] === 'CAG') {
            return _csg.CAG.fromCompactBinary(object);
          }
        });
        callback(undefined, data);
      }
    };
    worker.onerror = function (e) {
      callback('Error in line ' + e.lineno + ' : ' + e.message, undefined);
    };
    worker.postMessage({ cmd: 'render', fullurl: fullurl, script: script, parameters: parameters });
  }).catch(function (error) {
    return callback(error, undefined);
  });
}