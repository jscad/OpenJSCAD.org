'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isChrome = isChrome;
exports.isSafari = isSafari;
exports.detectBrowser = detectBrowser;
function isChrome() {
  return window.navigator.userAgent.search('Chrome') >= 0;
}

function isSafari() {
  return (/Version\/[\d\.]+.*Safari/.test(window.navigator.userAgent)
  ); // FIXME WWW says don't use this
}

function detectBrowser() {
  if (navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)/i)) {
    return RegExp.$1.toLowerCase();
  } else {
    return 'unknown';
  }
}