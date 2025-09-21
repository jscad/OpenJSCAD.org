/**
 * JSCAD Utility functions for arrays
 * @module @jscad/array-utils
 * @version 3.0.1-alpha.0
 * @license MIT
 */
const flatten=arr=>arr.reduce(((acc,val)=>Array.isArray(val)?acc.concat(flatten(val)):acc.concat(val)),[]),fnNumberSort=(a,b)=>a-b,head=array=>{if(Array.isArray(array)&&0!==array.length)return array[0]},insertSorted=(array,element,compareFunction)=>{let leftbound=0,rightbound=array.length;for(;rightbound>leftbound;){const testindex=Math.floor((leftbound+rightbound)/2);compareFunction(element,array[testindex])>0?leftbound=testindex+1:rightbound=testindex}return array.splice(leftbound,0,element),array},nth=(array,index)=>{if(Array.isArray(array)&&!(array.length<index))return array[index]},padToLength=(anArray,padding,targetLength)=>{for(anArray=anArray.slice();anArray.length<targetLength;)anArray.push(padding);return anArray},toArray=array=>Array.isArray(array)?array:null==array?[]:[array];export{flatten,fnNumberSort,head,insertSorted,nth,padToLength,toArray};
