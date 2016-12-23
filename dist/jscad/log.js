'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.log = log;
exports.status = status;
function log(txt) {
  var timeInMs = Date.now();
  var prevtime = OpenJsCad.log.prevLogTime;
  if (!prevtime) prevtime = timeInMs;
  var deltatime = timeInMs - prevtime;
  log.prevLogTime = timeInMs;
  var timefmt = (deltatime * 0.001).toFixed(3);
  txt = '[' + timefmt + '] ' + txt;
  if ((typeof console === 'undefined' ? 'undefined' : _typeof(console)) == 'object' && typeof console.log == 'function') {
    console.log(txt);
  } else if ((typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && typeof self.postMessage == 'function') {
    self.postMessage({ cmd: 'log', txt: txt });
  } else throw new Error('Cannot log');
}

// See Processor.setStatus()
// Note: leave for compatibility
function status(s) {
  log(s);
}