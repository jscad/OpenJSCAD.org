"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = toArray;
/* converts input data to array if it is not already an array*/
function toArray(data) {
  if (!data) return [];
  if (data.constructor !== Array) return [data];
  return data;
}