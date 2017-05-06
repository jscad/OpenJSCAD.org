const { getCookie } = require('./cookies')

var options = [ 'renderCode', 'author', 'license' ]
var metakeys = [ 'author', 'license' ]

//small helper function
function getOrCreateElementById (id) {
  let elt = document.getElementById(id)
  if (!elt) {
    elt = document.createElement('div')
    elt.id = id
  }
  return elt
}


function saveOptions (metadata) {
  for (var k in options) {
    k = options[k]
    setCookie(k, document.getElementById(k).value)
    if (metakeys[k]) metadata[k] = options[k]
  }
}

function getOptions () {
  for (var k in options) {
    k = options[k]
    if (getCookie(k)) {
      document.getElementById(k).value = getCookie(k)
    }
  }
}

function createOptions () {
  var src = ''
  src += "<form id=optionsForm onsubmit='saveOptions(); return false'>"
  src += '<div class=optionGroup><b>Your Identity / Full Name & Email</b><br/>'
  src += '<input id=author type=text name=author size=30><div class=optionInfo>Applies when you export AMF (sets metadata)</div></div>'

  var licenseOptions = {
    'Public Domain': 'Public Domain',
    'CC BY': 'Creative Commons CC BY',
    'CC BY-ND': 'Creative Commons CC BY-ND',
    'CC BY-NC': 'Creative Commons CC BY-NC',
    'CC BY-SA': 'Creative Commons CC BY-SA',
    'CC BY-NC-SA': 'Creative Commons CC BY-NC-SA',
    'CC BY-NC-ND': 'Creative Commons CC BY-NC-ND',
    'MIT': 'MIT License',
    'GPLv2': 'GPLv2',
    'GPLv3': 'GPLv3',
    'Copyright': 'Copyright',
  }
  src += '<div class=optionGroup><b>Default License</b><br/>'
  src += '<select id=license name=license>'
  for (var k in licenseOptions) {
    src += "<option value='" + k + "'>" + licenseOptions[k]
    src += '<br/>'
  }
  src += '</select><div class=optionInfo>Applies when you export AMF (sets metadata)</div></div>\n'

  if (0) {
    var renderCodeOptions = {
      shiftReturn: 'SHIFT+RETURN',
      auto: 'Automatic'
    }
    src += '<div class=optionGroup><b>Render Code</b></br>'
    src += '<select id=renderCode name=renderCode>'
    for (var k in renderCodeOptions) {
      src += "<option value='" + k + "'>" + renderCodeOptions[k]
    }
    src += '</select></div>'
  }

  if (1) {
    var plateOptions = {
      '200x200': '200mm x 200mm',
      '150x150': '150mm x 150mm',
      '100x100': '100mm x 100mm',
      'custom': 'Custom',
      'none': 'None',
    }
    src += '<div class=optionGroup><b>Plate</b></br>'
    src += '<select id=plate name=plate>'
    for (var k in plateOptions) {
      src += "<option value='" + k + "'>" + plateOptions[k]
    }
    src += '</select><br/>'
    src += "<div style='display: none' id=customPlate>Custom: <input type=text id=plateCustomX name=plateCustomX size=4 value='125'> x <input type=text id=plateCustomY name=plateCustomY size=4 value='125'> [mm]</div>"
    src += '</div>'
  }

  if (1) {
    var themeOptions = {
      'bright': 'Bright',
      'dark': 'Dark',
    }
    src += '<div class=optionGroup><b>Theme</b></br>'
    src += '<select id=theme name=theme>'
    for (var k in themeOptions) {
      src += "<option value='" + k + "'>" + themeOptions[k]
    }
    src += '</select><br/>'
    src += '</div>'
  }

  src += '</form>'
  let elt = getOrCreateElementById('options')
  elt.innerHTML = src
  return elt
}

module.exports = {
  saveOptions,
  getOptions,
  createOptions
}
