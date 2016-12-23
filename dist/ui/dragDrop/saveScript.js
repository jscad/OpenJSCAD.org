"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveScript = saveScript;
function saveScript(gMemFs, filename, source) {
  // console.log("saveScript("+filename+","+source+")")
  gMemFs[filename] = { name: filename, source: source };
}