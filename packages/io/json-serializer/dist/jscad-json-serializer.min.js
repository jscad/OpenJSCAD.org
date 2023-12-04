/**
 * JSON Serializer for JSCAD
 * @module @jscad/json-serializer
 * @version 3.0.0-alpha.0
 * @license MIT
 */
var global,factory;global=this,factory=function(exports){
/**
   * JSCAD Utility functions for arrays
   * @module @jscad/array-utils
   * @version 3.0.0-alpha.0
   * @license MIT
   */
const flatten=arr=>arr.reduce(((acc,val)=>Array.isArray(val)?acc.concat(flatten(val)):acc.concat(val)),[]),replacer=(key,value)=>{switch(key){case"transforms":case"plane":return Array.from(value);case"points":case"vertices":return value.map((v=>Array.from(v)));case"outlines":return value.map((o=>o.map((v=>Array.from(v)))))}return value};exports.mimeType="application/json",exports.serialize=(options,...objects)=>{options=Object.assign({},{statusCallback:null},options),objects=flatten(objects),options.statusCallback&&options.statusCallback({progress:0});const notation=JSON.stringify(objects,replacer);return options.statusCallback&&options.statusCallback({progress:100}),[notation]},Object.defineProperty(exports,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?factory(exports):"function"==typeof define&&define.amd?define(["exports"],factory):factory((global="undefined"!=typeof globalThis?globalThis:global||self).jscadJsonSerializer={});
