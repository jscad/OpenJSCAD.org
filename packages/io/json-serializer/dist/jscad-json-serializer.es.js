/**
 * JSON Serializer for JSCAD
 * @module @jscad/json-serializer
 * @version 3.0.0-alpha.0
 * @license MIT
 */
/**
 * JSCAD Utility functions for arrays
 * @module @jscad/array-utils
 * @version 3.0.0-alpha.0
 * @license MIT
 */
const flatten=arr=>arr.reduce(((acc,val)=>Array.isArray(val)?acc.concat(flatten(val)):acc.concat(val)),[]),mimeType="application/json",replacer=(key,value)=>{switch(key){case"transforms":case"plane":return Array.from(value);case"points":case"vertices":return value.map((v=>Array.from(v)));case"outlines":return value.map((o=>o.map((v=>Array.from(v)))))}return value},serialize=(options,...objects)=>{options=Object.assign({},{statusCallback:null},options),objects=flatten(objects),options.statusCallback&&options.statusCallback({progress:0});const notation=JSON.stringify(objects,replacer);return options.statusCallback&&options.statusCallback({progress:100}),[notation]};export{mimeType,serialize};
