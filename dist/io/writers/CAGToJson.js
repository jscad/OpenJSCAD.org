'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CAGToJson;
var Blob = typeof window !== 'undefined' ? window.Blob : require('../../utils/Blob').default;

function CAGToJson(CAG) {
  var str = '{ "type": "cag","sides": [';
  var comma = '';
  CAG.sides.map(function (side) {
    str += comma;
    str += JSON.stringify(side);
    comma = ',';
  });
  str += '] }';
  return new Blob([str], {
    type: 'application/json'
  });
}