/**
 * JSON Deserializer for JSCAD
 * @module @jscad/json-deserializer
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
const flatten=arr=>arr.reduce(((acc,val)=>Array.isArray(val)?acc.concat(flatten(val)):acc.concat(val)),[]),translate=(options,objects)=>{const{addMetaData:addMetaData,filename:filename,version:version}=options;let script=addMetaData?`//\n// Produced by JSCAD IO Library : JSON Deserializer (${version})\n// date: ${new Date}\n// source: ${filename}\n//\n`:"";return script+=`\nconst { geometries } = require('@jscad/modeling')\n\nconst main = () => {\n  const objects = [${translateToList(objects)} ]\n  return objects\n}\n\n${translateToObjects(objects)}\n\nmodule.exports = { main }\n`,script},translateToList=objects=>objects.reduce(((script,object,index)=>script+` json${index},`),""),translateToObjects=objects=>objects.reduce(((script,object,index)=>script+translateToObject(object,index)),""),translateToObject=(object,index)=>`const json${index} = ${JSON.stringify(object)}\n`;exports.deserialize=(options,input)=>{const defaults={filename:"json",output:"script",version:"3.0.0-alpha.0",addMetaData:!0};options=Object.assign({},defaults,options);let objects=JSON.parse(input);var array;return objects=flatten((array=objects,Array.isArray(array)?array:null==array?[]:[array])),"script"===options.output?translate(options,objects):objects},exports.mimeType="application/json",Object.defineProperty(exports,"__esModule",{value:!0})},"object"==typeof exports&&"undefined"!=typeof module?factory(exports):"function"==typeof define&&define.amd?define(["exports"],factory):factory((global="undefined"!=typeof globalThis?globalThis:global||self).jscadJsonDeserializer={});
