import { mat4 } from '@jscad/modeling'

import { parse } from './parse.js'

/*
 * Parse the given 3MF source (XML) into 3MF build items, objects, materials, and colorgroups.
 *
 * Each build item is a 3MF mesh with
 *   oid: object id of which to build (and transform)
 *   transform : mat4 with transforms for rotation/translation
 *   sequence: unique sequence number of item
 */
export const parseModel = (options, source) => {
  const { includedItems } = options

  // parse the 3MF contents (XML)
  const { objects, materials, colorgroups, items } = parse(source)
  if (objects.length === 0) {
    throw new Error('3MF parsing failed, no valid 3MF objects retrieved')
  }

  // get a list of objects to include in the results
  const buildItems = []
  items.forEach((item) => {
    const components = getComponents(item, objects)
    for (let i = 0; i < components.length; i++) {
      const component = components[i]
      component.sequence = buildItems.length
      buildItems.push(component)
    }
  })

  if (includedItems === 'all') {
    // FIXME loop through objects.. include anything missing
  }

  return { buildItems, objects, materials, colorgroups }
}

const getComponents = (component, objects) => {
  const object = objects.find((obj) => obj.id === component.objectid)
  const components = []
  if (object.mesh) {
    const cmp = { otype: object.otype, oid: object.id, transform: component.transform }
    if (object.name) cmp.oname = object.name
    if (object.partnumber) cmp.opartnumber = object.partnumber
    components.push(cmp)
  }
  if (object.components) {
    object.components.forEach((c) => {
      const subcomponents = getComponents(c, objects)
      subcomponents.forEach((s) => {
        mat4.multiply(s.transform, c.transform, s.transform)
        components.push(s)
      })
    })
  }
  return components
}
