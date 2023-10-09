/**
 * JSCAD Utility functions for arrays
 * @module @jscad/array-utils
 * @version 3.0.0-alpha.0
 * @license MIT
 */
var global,factory;global=this,factory=function(exports){const flatten=arr=>arr.reduce(((acc,val)=>Array.isArray(val)?acc.concat(flatten(val)):acc.concat(val)),[]);exports.flatten=flatten,exports.fnNumberSort=(a,b)=>a-b,exports.head=array=>{if(Array.isArray(array)&&0!==array.length)return array[0]},exports.insertSorted=(array,element,compareFunction)=>{let leftbound=0,rightbound=array.length;for(;rightbound>leftbound;){const testindex=Math.floor((leftbound+rightbound)/2);compareFunction(element,array[testindex])>0?leftbound=testindex+1:rightbound=testindex}return array.splice(leftbound,0,element),array},exports.nth=(array,index)=>{if(Array.isArray(array)&&!(array.length<index))return array[index]},exports.padToLength=(anArray,padding,targetLength)=>{for(anArray=anArray.slice();anArray.length<targetLength;)anArray.push(padding);return anArray},exports.toArray=array=>Array.isArray(array)?array:null==array?[]:[array],Object.defineProperty(exports,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?factory(exports):"function"==typeof define&&define.amd?define(["exports"],factory):factory((global="undefined"!=typeof globalThis?globalThis:global||self).jscadArrayUtils={});
