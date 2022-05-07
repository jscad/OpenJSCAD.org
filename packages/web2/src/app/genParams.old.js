const GROUP_SELECTOR = 'DIV[type="group"]'
const INPUT_SELECTOR = 'INPUT, SELECT'
const BUTTON_SELECTOR = 'BUTTON'

function forEachInput (target, callback) {
  target.querySelectorAll(INPUT_SELECTOR).forEach(callback)
}

function forEachGroup (target, callback) {
  target.querySelectorAll(GROUP_SELECTOR).forEach(callback)
}

function forEachButton (target, callback) {
  target.querySelectorAll(BUTTON_SELECTOR).forEach(callback)
}

const numeric = { number: 1, float: 1, int: 1, range: 1, slider: 1 }

function applyRange (inp) {
  const label = inp.previousElementSibling
  if (label && label.tagName === 'LABEL') {
    const info = label.querySelector('I')
    if (info) info.innerHTML = inp.value === undefined ? '' : inp.value
  }
}

function genParams ({
  params,
  target,
  callback,
  storedValues = {},
  buttons = ['reset', 'save', 'load', 'edit', 'link']
}
) {
  const initialValues = {}
  const funcs = {
    group: () => '',
    choice: inputChoice,
    radio: inputRadio,
    float: inputNumber,
    range: inputNumber,
    slider: inputNumber,
    int: inputNumber,
    text: inputNumber,
    url: inputNumber,
    email: inputNumber,
    date: inputNumber,
    password: inputNumber,
    color: inputNumber,
    // TODO radio similar options as choice
    checkbox: function ({ name, value }) {
      const checkedStr = value === 'checked' || value === true ? 'checked' : ''
      return `<input type="checkbox" name="${name}" ${checkedStr}/>`
    },
    number: inputNumber
  }

  function inputRadio ({ name, type, captions, value, values }) {
    if (!captions) captions = values

    let ret = '<div type="radio">'

    for (let i = 0; i < values.length; i++) {
      const checked =
        value === values[i] || value === captions[i] ? 'checked' : ''
      ret += `<label><input type="radio" _type="${type}" name="${name}" numeric="${
        typeof values[0] === 'number' ? '1' : '0'
      }" value="${values[i]}" ${checked}/>${captions[i]}</label>`
    }
    return ret + '</div>'
  }

  function inputChoice ({ name, type, captions, value, values }) {
    if (!captions) captions = values

    let ret = `<select _type="${type}" name="${name}" numeric="${
      typeof values[0] === 'number' ? '1' : '0'
    }">`

    for (let i = 0; i < values.length; i++) {
      const checked =
        value === values[i] || value === captions[i] ? 'selected' : ''
      ret += `<option value="${values[i]}" ${checked}>${captions[i]}</option>`
    }
    return ret + '</select>'
  }

  function inputNumber (def) {
    let { name, type, value, min, max, step, placeholder, live } = def
    if (value === null || value === undefined) value = numeric[type] ? 0 : ''
    let inputType = type
    if (type === 'int' || type === 'float') inputType = 'number'
    if (type === 'range' || type === 'slider') inputType = 'range'
    let str = `<input _type="${type}" type="${inputType}" name="${name}"`
    if (step !== undefined) str += ` step="${step || ''}"`
    if (min !== undefined) str += ` min="${min || ''}"`
    if (max !== undefined) str += ` max="${max || ''}"`
    if (value !== undefined) str += ` value="${value}"`
    str += ` live="${live ? 1 : 0}"`
    if (placeholder !== undefined) str += ` placeholder="${placeholder}"`
    return str + '/>'
  }

  let html = ''
  let closed = false
  const missing = {}

  params.forEach((def) => {
    let { type, caption, name, hint } = def

    def.value = initialValues[name] = def.initial || def.default || def.checked
    if (storedValues[name] !== undefined) {
      def.value = storedValues[name]
    }

    if (type === 'group') {
      const ch = caption[0]
      closed = def.value === 'closed'
      if (ch === '>' || ch === '+') {
        caption = caption.substring(1).trim()
        closed = true
      }
    }
    def.closed = closed

    html += `<div class="form-line" type="${def.type}" closed="${
      closed ? 1 : 0
    }" `
    if (type === 'group') html += ` name="${name}"`
    html += '">'

    html += '<label'
    if (type === 'group') html += ` name="${name}"`
    if (hint) html += ` title="${hint}"`
    html += '>'
    if (type === 'checkbox') html += funcs[type](def)
    html += `${caption}<i>${def.value === undefined ? '' : def.value}</i></label>`

    if (funcs[type] && type !== 'checkbox') html += funcs[type](def)

    if (!funcs[type]) missing[type] = 1

    html += '</div>\n'
  })

  const missingKeys = Object.keys(missing)
  if (missingKeys.length) console.log('missing param impl', missingKeys)

  function _callback (source = 'change') {
    callback(getParams(target), source)
  }

  html += '<div class="jscad-param-buttons"><div>'
  buttons.forEach((button) => {
    const { id, name } =
      typeof button === 'string' ? { id: button, name: button } : button
    html += `<button action="${id}"><b>${name}</b></button>`
  })
  html += '</div></div>'

  target.innerHTML = html

  forEachInput(target, (inp) => {
    inp.addEventListener('input', function (evt) {
      applyRange(inp)
      if (inp.getAttribute('live') === '1') _callback('live')
    })
    if (inp.getAttribute('live') !== '1') {
      inp.addEventListener('change', () => _callback('change'))
    }
  })

  function groupClick (evt) {
    let groupDiv = evt.target
    if (groupDiv.tagName === 'LABEL') groupDiv = groupDiv.parentNode
    const closed = groupDiv.getAttribute('closed') === '1' ? '0' : '1'
    do {
      groupDiv.setAttribute('closed', closed)
      groupDiv = groupDiv.nextElementSibling
    } while (groupDiv && groupDiv.getAttribute('type') !== 'group')
    _callback('group')
  }

  function buttonClick (evt) {
    let bt = evt.target
    while (bt && bt.tagName !== 'BUTTON') bt = bt.parentNode
    const action = bt.getAttribute('action')
    if (action === 'reset') {
      forEachInput(target, inp => {
        const name = inp.getAttribute('name')
        inp.value = initialValues[name]
        _callback()
      })
    }
    console.log('buttonClick', action, bt, evt)
  }

  forEachGroup(target, (div) => {
    div.onclick = groupClick
  })

  forEachButton(target, (bt) => {
    bt.onclick = buttonClick
  })
}

function getParams (target) {
  const params = {}
  if (!target) return params

  forEachGroup(target, (elem) => {
    const name = elem.getAttribute('name')
    params[name] = elem.getAttribute('closed') === '1' ? 'closed' : ''
  })

  forEachInput(target, (elem) => {
    const name = elem.name
    let value = elem.value
    if (elem.tagName === 'INPUT') {
      if (elem.type === 'checkbox') value = elem?.checked
      if (elem.type === 'range' || elem.type === 'color') applyRange(elem)
    }

    if (
      numeric[elem.getAttribute('type')] ||
      elem.getAttribute('numeric') === '1'
    ) {
      value = parseFloat(String(value || 0))
    } else if (value && typeof (value) === 'string' && /^(\d+|\d+\.\d+)$/.test(value.trim())) {
      value = parseFloat(String(value || 0))
    }
    if (elem.type === 'radio' && !elem.checked) return // skip if not checked radio button

    params[name] = value
  })
  return params
}

genParams.getParams = getParams
