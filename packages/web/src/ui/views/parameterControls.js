const html = require('nanohtml')

let paramControls
let currentGroupName
let currentGroupIsExpanded

/**
 * Creates a series of table row elements for the list of parameters
 * @param  {Object} prevParameterValues - Current values and state of parameters to maintain consistency
 * @param {array} parameterDefinitions - The definitions provides by the current model script
 * @param {function} rebuildSolid - The method to call when parameters change.
 * @returns {{controls: Array of DOM elements}}
 */
const createParamControls = (prevParameterValues = {}, parameterDefinitions, rebuildSolid) => {
  paramControls = []
  currentGroupName = ''
  currentGroupIsExpanded = true

  const controls = parameterDefinitions.map((paramDefinition) => {
    return createParamRowFromDefinition(paramDefinition, prevParameterValues, rebuildSolid)
  })

  return { controls }
}

/**
 * Create a single table row for the parameter window.
 * @param paramDefinition
 * @param prevParameterValues
 * @param rebuildSolid
 * @returns {element}
 */
const createParamRowFromDefinition = (paramDefinition, prevParameterValues, rebuildSolid) => {
  const type = paramDefinition.type.toLowerCase()
  if (type === 'group') {
    return createGroupRowFromDefinition(paramDefinition, prevParameterValues)
  }
  return createInputRowFromDefinition(type, paramDefinition, prevParameterValues, rebuildSolid)
}

/**
 * Render a Group Header parameter in HTML
 * @param paramDefinition
 * @param prevParameterValues
 * @returns {*}
 */
const createGroupRowFromDefinition = (paramDefinition, prevParameterValues) => {
  let label = paramDefinition.name + ':'
  let tdClassName = ''
  if ('caption' in paramDefinition) {
    label = paramDefinition.caption
    tdClassName = 'caption'
  }

  if (paramDefinition.name in prevParameterValues) {
    currentGroupIsExpanded = prevParameterValues[paramDefinition.name] !== 'closed'
  } else {
    currentGroupIsExpanded = paramDefinition.initial !== 'closed'
  }

  currentGroupName = paramDefinition.name
  const trClassName = 'groupTitle ' + (currentGroupIsExpanded ? 'open' : 'closed')

  const groupHeaderRow = html`<tr class=${trClassName} data-groupname=${currentGroupName} >
        <td class=${tdClassName} colspan="2">
            <h1>
                <svg class="icon icon-open feather feather-chevron-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><polyline points="6 9 12 15 18 9"/></svg>
                <svg class="icon icon-closed feather feather-chevron-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><polyline points="9 18 15 12 9 6"/></svg>
                ${label}
            </h1>
        </td>
      </tr>`

  // this is to make groups collapsible
  groupHeaderRow.onclick = () => {
    toggleGroupVisibility(groupHeaderRow)
    return true
  }

  groupHeaderRow.paramName = paramDefinition.name
  groupHeaderRow.paramType = paramDefinition.type
  return groupHeaderRow
}

/**
 * Given the Table Row element for a group header, show or hide the elements of the group.
 * @param groupHeaderElement
 */
const toggleGroupVisibility = (groupHeaderElement) => {
  let displayValue
  if (groupHeaderElement.className.includes('open')) {
    groupHeaderElement.classList.remove('open')
    groupHeaderElement.classList.add('closed')
    displayValue = 'none'
  } else {
    groupHeaderElement.classList.remove('closed')
    groupHeaderElement.classList.add('open')
    displayValue = ''
  }

  const inputRowsInGroup = document.getElementsByClassName(groupHeaderElement.dataset.groupname)
  Array.from(inputRowsInGroup).forEach((item) => {
    item.style.display = displayValue
  })
}

/**
 * Render an Input parameter in HTML
 * @param {string} type - the type of input to create.
 * @param paramDefinition
 * @param prevParameterValues
 * @param rebuildSolid
 * @returns { element }
 */
const createInputRowFromDefinition = (type, paramDefinition, prevParameterValues, rebuildSolid) => {
  let subControls
  switch (type) {
    case 'choice':
      subControls = createChoiceControl(paramDefinition, prevParameterValues[paramDefinition.name])
      break
    case 'radio':
      subControls = createRadioControl(paramDefinition, prevParameterValues[paramDefinition.name])
      break
    default:
      subControls = createInputControl(paramDefinition, prevParameterValues[paramDefinition.name])
      break
  }

  let label = paramDefinition.name + ':'
  let tdClassName = ''
  if ('caption' in paramDefinition) {
    label = paramDefinition.caption
    tdClassName = 'caption'
  }

  let trClassName = 'controlsLine'
  if (currentGroupName) {
    trClassName += ' ' + currentGroupName
  }
  const trStyle = (currentGroupIsExpanded ? '' : 'display:none')

  subControls.forEach((control) => {
    control.onchange = () => {
      if (rebuildSolid) {
        rebuildSolid(paramControls)
      }
    }
  })

  const subItems = subControls.map((control) => html`<div>${control} ${'label' in control ? control.label : ''}</div>`)
  const element = html`<tr class=${trClassName} style=${trStyle} >
        <td class=${tdClassName}> ${label} </td>
        <td colspan="2"> ${subItems}</td>
      </tr>`
  element.dataset.groupName = currentGroupName
  return element
}

/**
 * Create the input elements for a Choice (select) parameter
 * @param definition
 * @param prevValue
 * @returns {[*]}
 */
const createChoiceControl = (definition, prevValue) => {
  if (!('values' in definition)) {
    throw new Error('Definition of choice parameter (' + definition.name + ") should include a 'values' parameter")
  }
  const values = definition.values
  const captions = 'captions' in definition ? definition.captions : definition.values

  if (captions.length !== values.length) {
    throw new Error('Definition of choice parameter (' + definition.name + ") should have the same number of items for 'captions' and 'values'")
  }

  const options = captions.map((caption, index) => {
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

/**
 * Creates the DOM elements for a group of radio buttons
 * @param definition
 * @param prevValue
 * @returns {*}
 */
const createRadioControl = (definition, prevValue) => {
  if (!('values' in definition)) {
    throw new Error('Definition of choice parameter (' + definition.name + ") should include a 'values' parameter")
  }
  const values = definition.values
  const captions = 'captions' in definition ? definition.captions : definition.values

  if (captions.length !== values.length) {
    throw new Error('Definition of choice parameter (' + definition.name + ") should have the same number of items for 'captions' and 'values'")
  }

  return captions.map((caption, index) => {
    const value = values[index]
    let selected = false
    if (prevValue !== undefined) {
      selected = (prevValue === value)
    } else if ('default' in definition) {
      selected = (definition.default === value)
    } else if ('initial' in definition) {
      selected = (definition.initial === value)
    }

    const control = html`
      <label>
        ${caption}
        <input type='radio' value=${value} name=${definition.name} checked=${selected}/>
      </label>
    `
    control.children[0].paramName = definition.name
    control.children[0].paramType = definition.type

    return control
  })
}

/**
 * Creates the DOM elements for general input types.
 * @param definition
 * @param prevValue
 * @returns {[*]}
 */
const createInputControl = (definition, prevValue) => {
  console.log('parameterControls.createInputControl')
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
  const handledAttributes = ['type', 'name', 'checked', 'initial', 'default']

  // check for required parameters
  if (!('type' in definition)) {
    throw new Error('Parameter definition (' + definition + ") must include a 'type' parameter")
  }
  let typeData = controlList.filter((x) => definition.type === x.type)
  typeData = (typeData && typeData.length > 0) ? typeData[0] : undefined
  if (!typeData) {
    throw new Error('Parameter definition (' + definition + ') is not known')
  }

  // validate fields
  const definitionFields = Object.keys(definition)
  typeData.required.forEach((requiredField) => {
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

  const control = html`<input
    type=${typeData.control} 
    value=${controlValue} 
    checked=${'checked' in definition ? controlValue : ''} 
  />`

  // set name and type (used later for obtaining values)
  control.paramName = definition.name
  control.paramType = definition.type
  // set generic HTML attributes
  for (const property in definition) {
    if (Object.prototype.hasOwnProperty.call(definition, property)) {
      if (handledAttributes.indexOf(property) < 0) {
        control.setAttribute(property, definition[property])
      }
    }
  }

  return [control]
}

module.exports = { createParamControls }
