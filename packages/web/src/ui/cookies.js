// ui-cookies.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// Cookie Functionality
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// --- Dependencies
// none

// --- Global Variables

// --- Global Functions

function setCookie (name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toGMTString()
  }
  document.cookie = escape(name) + '=' + escape(value) + expires + '; path=/'
}

function getCookie (name) {
  var nameEQ = escape(name) + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length))
  }
  return null
}

function deleteCookie (name) {
  setCookie(name, '', -1)
}

module.exports = {
  setCookie,
  getCookie,
  deleteCookie
}
