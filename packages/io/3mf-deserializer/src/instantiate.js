import { maths } from '@jscad/modeling'

import { createObject } from './objectBuilder.js'

import { parse } from './parse.js'

export const instantiate = (options, src) => {
  const { includedItems, includedType } = options

  // parse the 3MF contents (XML)
  const { model, objects, materials, items } = parse(src)
  if (!model) {
    throw new Error('3MF parsing failed, no valid 3MF data retrieved')
  }
  console.log(model)
  console.log(objects)
  // console.log(objects[0].mesh)
  // console.log(objects[3].components)
  console.log(materials)
  console.log(items)
  // get a list of objects to include in the results
  let buildItems = []
  items.forEach((item) => {
    const components = getComponents(item, objects)
    buildItems.push(...components)
  })

  if (includedItems == 'all') {
    // FIXME loop through objects.. include anything missing
  }

console.log("*****BUILD")
console.log(buildItems)
console.log("*****BUILD")
  // FIXME filter for desired mesh types

  // return objectify(amfObj, { amfMaterials, amfTextures, amfConstels })
}

const getComponents = (component, objects) => {
  const object = objects.find((obj) => {
    return obj.id == component.objectid
  })
  const components = []
  if (object.mesh) {
    const cmp = { mesh: object.mesh, transform: component.transform, id: object.id }
    if (object.name) cmp.name = object.name
    if (object.partnumber) cmp.partnumber = object.partnumber
    if (object.pid) cmp.pid = object.pid
    if (object.pindex) cmp.pindex = object.pindex
    components.push(cmp)
  }
  if (object.components) {
    object.components.forEach((c) => {
// console.log("#####component",c)
      const subcomponents = getComponents(c, objects)
      subcomponents.forEach((s) => {
        maths.mat4.multiply(s.transform, c.transform, s.transform)
// console.log("#####subcomponent",s)
        components.push(s)
      })
    })
  }
  return components
}

const objectify = (amf, data) => {
  const objects = amf.objects.filter((o) => o.type === 'object')
  return objects.map((object, index) => createObject(object, index, data, { amf, instantiate: true }))
}
