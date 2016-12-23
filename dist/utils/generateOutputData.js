'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateOutputData;

var _convertToBlob = require('../io/convertToBlob');

var _convertToBlob2 = _interopRequireDefault(_convertToBlob);

var _rebuildSolid = require('../jscad/rebuildSolid');

var _getParameterDefinitionsCLI = require('./getParameterDefinitionsCLI');

var _getParameterDefinitionsCLI2 = _interopRequireDefault(_getParameterDefinitionsCLI);

var _formats = require('../io/formats');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * generate output data from source
 * @param {String} source the original source
 * @param {Object} params hash of parameters to pass to main function
 * @param {String} options
 * @return a Promise with the output data
 */
function generateOutputData(source, params, options) {
  var defaults = {
    implicitGlobals: true,
    outputFormat: 'stl'
  };
  options = Object.assign({}, defaults, options);
  var _options = options,
      implicitGlobals = _options.implicitGlobals,
      outputFormat = _options.outputFormat;


  var globals = {};
  if (implicitGlobals) {
    globals.oscad = require('../modeling/index').default;
  }
  globals.extras = { cli: { getParameterDefinitionsCLI: _getParameterDefinitionsCLI2.default } };

  // modify main to adapt parameters
  var mainFunction = 'var wrappedMain = main\n  main = function(){\n    var paramsDefinition = (typeof getParameterDefinitions !== \'undefined\') ? getParameterDefinitions : undefined\n    return wrappedMain(getParameterDefinitionsCLI(paramsDefinition, ' + JSON.stringify(params) + '))\n  }';
  source = source + '\n  ' + mainFunction + '\n  ';

  // objects = rebuildSolidSync(source, '', params, globals, callback)
  return new Promise(function (resolve, reject) {
    var callback = function callback(err, result) {
      if (!err) {
        return resolve(result);
      }
      return reject(err);
    };

    if (outputFormat === 'jscad' || outputFormat === 'js') {
      resolve(source);
    } else {
      (0, _rebuildSolid.rebuildSolidSync)(source, '', params, globals, callback);
    }
  }).then(function (objects) {
    var formatInfo = {
      convertCAG: true, convertCSG: true, mimetype: _formats.formats[outputFormat].mimetype
    };
    return (0, _convertToBlob2.default)(objects, { format: outputFormat, formatInfo: formatInfo });
  });

  // return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}