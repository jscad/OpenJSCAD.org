/**
 * JSON Deserializer for JSCAD
 * @module @jscad/json-deserializer
 * @version 3.0.1-alpha.0
 * @license MIT
 */
/**
 * JSCAD Utility functions for arrays
 * @module @jscad/array-utils
 * @version 3.0.1-alpha.0
 * @license MIT
 */
const flatten=arr=>arr.reduce(((acc,val)=>Array.isArray(val)?acc.concat(flatten(val)):acc.concat(val)),[]),deserialize=(options,input)=>{const defaults={filename:"json",output:"script",version:"3.0.1-alpha.0",addMetaData:!0};options=Object.assign({},defaults,options),input=((stringOrArrayBuffer,defaultBinaryEncoding="utf-8")=>"string"==typeof stringOrArrayBuffer?stringOrArrayBuffer:new TextDecoder(defaultBinaryEncoding).decode(new Uint8Array(stringOrArrayBuffer)))(input);let objects=JSON.parse(input);var array;return objects=flatten((array=objects,Array.isArray(array)?array:null==array?[]:[array])),"script"===options.output?translate(options,objects):objects},translate=(options,objects)=>{const{addMetaData:addMetaData,filename:filename,version:version}=options;let script=addMetaData?`//\n// Produced by JSCAD IO Library : JSON Deserializer (${version})\n// date: ${new Date}\n// source: ${filename}\n//\n`:"";return script+=`\nconst { geometries } = require('@jscad/modeling')\n\nconst main = () => {\n  const objects = [${translateToList(objects)} ]\n  return objects\n}\n\n${translateToObjects(objects)}\n\nmodule.exports = { main }\n`,script},translateToList=objects=>objects.reduce(((script,object,index)=>script+` json${index},`),""),translateToObjects=objects=>objects.reduce(((script,object,index)=>script+translateToObject(object,index)),""),translateToObject=(object,index)=>`const json${index} = ${JSON.stringify(object)}\n`,mimeType="application/json";export{deserialize,mimeType};
