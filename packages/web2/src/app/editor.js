import { EditorState } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { } from '@codemirror/highlight'
import { basicSetup } from '@codemirror/basic-setup'
import { javascript } from '@codemirror/lang-javascript'
import { Jsx6 } from '../jsx6'

export class JscadEditor extends Jsx6 {
  init () {
    const startState = EditorState.create({
      doc: `
const jscad = require('@jscad/modeling')
// https://openjscad.xyz/docs/module-modeling_primitives.html
const { cuboid, sphere, torus, cylinder } = jscad.primitives

const { rotate, translate } = jscad.transforms
const { degToRad } = jscad.utils // because jscad uses radians for rotations
// https://openjscad.xyz/docs/module-modeling_booleans.html
const { subtract } = jscad.booleans

function main({
  //@jscad-params
  // Box example
  width = 40, // Width
  length = 20, // Length
  height = 10, // Height
  hole = 3, // Hole for cables diameter (0=no hole)
  wall = 1, // wall {min:0.5, step:0.5}
  flip = 0, // print orientation {type: 'choice', values: [0, 90, 180]}
}) {
  return sphere({radius:50})
  let wallOffset = wall * 2
  let model = subtract(
    cuboid({ size: [width, length, height] }),
    translate(
      [0, 0, wall],
      cuboid({ size: [width - wallOffset, length - wallOffset, height + wall] })
    )
  )
  if (hole) {
    model = subtract(
      model,
      translate(
        [width / 2 - wall / 2],
        rotate(
          [0, degToRad(90), 0],
          cylinder({ radius: hole / 2, height: wall })
        )
      )
    )
  }
  return rotate([degToRad(flip), 0, degToRad(90)], model)
}

module.exports = { main } // eslint-disable-line      
      `,
      extensions: [basicSetup, javascript()]
    })
    this.view = new EditorView({
      state: startState,
      parent: this.el
    })
  }

  getValue () {
    return this.view.state.doc.toString()
  }
}
