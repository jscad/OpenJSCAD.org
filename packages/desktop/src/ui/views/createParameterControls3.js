// getParamDefinitions(script)
const html = require('bel')

const createParamControls = (prevParamValues = {}, paramDefinitions, rebuildSolid) => {
  const paramControls = []

  const controls = paramDefinitions.map(function (paramDefinition) {
    const type = paramDefinition.type.toLowerCase()
    let subControls
    // console.log('type', type)
    switch (type) {
      case 'choice':
        subControls = createChoiceControl(paramDefinition, prevParamValues[paramDefinition.name])
        break
      case 'radio':
        subControls = createRadioControl(paramDefinition, prevParamValues[paramDefinition.name])
        break
      case 'group':
        subControls = createGroupControl(paramDefinition)
        break
      default:
        subControls = createControl(paramDefinition, prevParamValues[paramDefinition.name])
        break
    }
    let label = paramDefinition.name + ':'
    let className = ''
    if ('caption' in paramDefinition) {
      label = paramDefinition.caption
      className = 'caption'
    }

    let trClassName = 'controlsLine'
    if (type === 'group') {
      label = html`<h1>${label}</h1>`
      trClassName = 'groupTitle'
      subControls = subControls.map(control => html`<th class=${control.className}> ${control.text} </th>`)
    } else {
      subControls.forEach(control => {
        control.onchange = function (e) {
          const l = e.currentTarget.nextElementSibling
          if (l !== null && l.nodeName === 'LABEL') {
            l.innerHTML = e.currentTarget.value
          }
          if (rebuildSolid) {
            rebuildSolid(paramControls)
          }
        }
      })
    }
    const subItems = subControls.map(control => {
      return html`<div>${control} ${'label' in control ? control.label : ''}</div>`
    })
    return html`<tr class=${trClassName}>
      <td class=${className}> ${label} </td>
      <td> ${subItems}</td>
    </tr>`
  })

  return { controls }
}

const createGroupControl = definition => {
  const text = definition.caption ? definition.caption : definition.name
  const className = definition.caption ? 'caption' : ''
  const control = html`<title class=${className}>${text}</title>`
  control.paramName = definition.name
  control.paramType = definition.type
  return [control]
}

const createChoiceControl = (definition, prevValue) => {
  if (!('values' in definition)) {
    throw new Error('Definition of choice parameter (' + definition.name + ") should include a 'values' parameter")
  }
  const values = definition.values
  const captions = 'captions' in definition ? definition.captions : definition.values

  if (captions.length !== values.length) {
    throw new Error('Definition of choice parameter (' + definition.name + ") should have the same number of items for 'captions' and 'values'")
  }

  const options = captions.map(function (caption, index) {
    const value = values[index]
    let selected = false
    if (prevValue !== undefined) {
      selected = (prevValue === value)
    } else if ('default' in definition) {
      selected = (definition.default === value)
    } else if ('initial' in definition) {
      selected = (definition.initial === value)
    }
    return html`<option value=${value} selected=${selected}>
      ${caption}
    </option>`
  })

  const control = html`<select>
    ${options}
  </select`
  control.paramName = definition.name
  control.paramType = definition.type

  return [control]
}

const createRadioControl = (definition, prevValue) => {
  if (!('values' in definition)) {
    throw new Error('Definition of choice parameter (' + definition.name + ") should include a 'values' parameter")
  }
  const values = definition.values
  const captions = 'captions' in definition ? definition.captions : definition.values

  if (captions.length !== values.length) {
    throw new Error('Definition of choice parameter (' + definition.name + ") should have the same number of items for 'captions' and 'values'")
  }

  const controls = captions.map(function (caption, index) {
    const value = values[index]
    let selected = false
    if (prevValue !== undefined) {
      selected = (prevValue === value)
    } else if ('default' in definition) {
      selected = (definition.default === value)
    } else if ('initial' in definition) {
      selected = (definition.initial === value)
    }

    const control = html`<label>
      ${caption}
      <input type='radio' value=${value} name=${definition.name} checked=${selected}/>
      </label>`
    // html`<input type='radio' value=${value} checked=${selected} name='${definition.name}'/>`
    control.children[0].paramName = definition.name
    control.children[0].paramType = definition.type

    return control
  })

  return controls
}

const createControl = (definition, prevValue) => {
  const controlList = [
    { type: 'text', control: 'text', required: ['type', 'name'], initial: '' },
    { type: 'int', control: 'number', required: ['type', 'name'], initial: 0 },
    { type: 'float', control: 'number', required: ['type', 'name'], initial: 0.0 },
    { type: 'number', control: 'number', required: ['type', 'name'], initial: 0.0 },
    { type: 'checkbox', control: 'checkbox', required: ['type', 'name', 'checked'], initial: '' },
    { type: 'radio', control: 'radio', required: ['type', 'name', 'checked'], initial: '' },
    { type: 'color', control: 'color', required: ['type', 'name'], initial: '#000000' },
    { type: 'date', control: 'date', required: ['type', 'name'], initial: '' },
    { type: 'email', control: 'email', required: ['type', 'name'], initial: '' },
    { type: 'password', control: 'password', required: ['type', 'name'], initial: '' },
    { type: 'url', control: 'url', required: ['type', 'name'], initial: '' },
    { type: 'slider', control: 'range', required: ['type', 'name', 'min', 'max'], initial: 0, label: true }
  ]
  // check for required parameters
  if (!('type' in definition)) {
    throw new Error('Parameter definition (' + definition + ") must include a 'type' parameter")
  }
  let typeData = controlList.filter(x => definition.type === x.type)
  typeData = (typeData && typeData.length > 0) ? typeData[0] : undefined
  if (!typeData) {
    throw new Error('Parameter definition (' + definition + ') is not known')
  }

  // validate fields
  const definitionFields = Object.keys(definition)
  typeData.required.forEach(function (requiredField) {
    if (!definitionFields.includes(requiredField)) {
      throw new Error(`Parameter definition for "${definition.name}" must include a "${requiredField}" parameter`)
    }
  })

  // determine initial value of control
  let controlValue
  if (prevValue !== undefined) {
    controlValue = prevValue
  } else if ('initial' in definition) {
    controlValue = definition.initial
  } else if ('default' in definition) {
    controlValue = definition.default
  } else {
    controlValue = typeData.initial
  }
  let control = html`<input
    type=${typeData.control} value=${controlValue} checked=${'checked' in definition ? controlValue : ''}>
  </input>`

  // set name and type (used later for obtaining values)
  control.paramName = definition.name
  control.paramType = definition.type
  // set generic HTML attributes
  for (const property in definition) {
    if (Object.prototype.hasOwnProperty.call(definition, property)) {
      if (typeData.required.indexOf(property) < 0) {
        control.setAttribute(property, definition[property])
      }
    }
  }

  // add a label if necessary
  /* if ('label' in controlInstance) {
    control.label = document.createElement('label')
    control.label.innerHTML = control.value
  } */

  return [control]

  control = document.createElement('input')
  let i, j, controlInstance, paramName
  for (i = 0; i < controlList.length; i++) {
    controlInstance = controlList[i]
    if (controlInstance.type === definition.type) {
      for (j = 0; j < controlInstance.required.length; j++) {
        paramName = controlInstance.required[j]
        if (paramName in definition) {
          if (paramName === 'index') continue
          if (paramName === 'type') continue
          if (paramName === 'checked') { // setAttribute() only accepts strings
            control.checked = definition.checked
          } else {
            control.setAttribute(paramName, definition[paramName])
          }
        } else {
          throw new Error('Parameter definition (' + definition + ") must include a '" + paramName + "' parameter")
        }
      }
      break
    }
  }
  if (i === controlList.length) {
    throw new Error('Parameter definition (' + definition + ") is not a valid 'type'")
  }
  // set the control type
  control.setAttribute('type', controlInstance.control)
}

module.exports = { createParamControls }
