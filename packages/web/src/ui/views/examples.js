const examplesData = [
  { file: 'various/logo.jscad', title: 'OpenJSCAD.org Logo' },
  { file: 'formas/amf/logo.amf', title: 'OpenJSCAD.org Logo', type: 'AMF' },

  { file: 'various/example001.jscad', title: 'Sphere with cutouts', spacing: true },
  { file: 'various/example001.scad', title: 'Sphere with cutouts', type: 'OpenSCAD' },
  { file: 'various/example002.jscad', title: 'Cone with cutouts' },
  { file: 'various/example002.scad', title: 'Cone with cutouts', type: 'OpenSCAD' },
  { file: 'various/example003.jscad', title: 'Cube with cutouts' },
  { file: 'various/example003.scad', title: 'Cube with cutouts', type: 'OpenSCAD' },
  // { file:'example004.jscad', title: 'Cube minus sphere' },
  { file: 'various/example005.jscad', title: 'Pavillon' },

  // { file:'cnc-cutout.jscad', title: 'CNC Corner Cutouts', new: true, spacing: true },

  // { file:'bunch-cubes.jscad', title: 'Bunch of Cubes', new: true },
  { file: 'core/transformations.jscad', title: 'Transformations', spacing: true },
  { file: 'core/lookup.jscad', title: 'Lookup()' },
  { file: 'core/expand.jscad', title: 'Expand()' },
  { file: 'core/rectangular_extrude.jscad', title: 'Rectangular_extrude()' },
  { file: 'core/linear_extrude.jscad', title: 'Linear_extrude()' },
  { file: 'core/rotate_extrude.jscad', title: 'Rotate_extrude()' },
  { file: 'core/polyhedron.jscad', title: 'Polyhedron()' },
  { file: 'core/hull.jscad', title: 'Hull()' },
  { file: 'core/chain_hull.jscad', title: 'Chain_hull()' },
  { file: 'core/torus.jscad', title: 'Torus()' },

  { file: 'core/text.jscad', title: 'Vector_text()', spacing: true },

  { file: 'core/transparency.jscad', title: 'Transparency', spacing: true },
  { file: 'formats/amf/transparency.amf', title: 'Transparency', type: 'AMF' },
  { file: 'core/transparency2.jscad', title: 'Transparency 2' },

  { file: 'core/slices/double-screw.jscad', title: 'SolidFromSlices(): Double Screw', spacing: true },
  { file: 'core/slices/four2three.jscad', title: 'SolidFromSlices(): 4 to 3' },
  { file: 'core/slices/four2three-round.jscad', title: 'SolidFromSlices(): 4 to 3 round' },
  { file: 'core/slices/spring.jscad', title: 'SolidFromSlices(): Spring' },
  { file: 'core/slices/tor.jscad', title: 'SolidFromSlices(): Tor (multi-color)' },
  { file: 'core/slices/rose.jscad', title: 'SolidFromSlices(): Rose Curve' },

  { file: 'parameters/servo.jscad', title: 'Interactive Params: Servo Motor', wrap: true },
  { file: 'parameters/gear.jscad', title: 'Interactive Params: Gear' },
  { file: 'parameters/s-hook.jscad', title: 'Interactive Params: S Hook' },
  { file: 'parameters/grille.jscad', title: 'Interactive Params: Grille' },
  { file: 'parameters/axis-coupler.jscad', title: 'Interactive Params: Axis Coupler' },
  { file: 'parameters/lamp-shade.jscad', title: 'Interactive Params: Lamp Shade' },
  { file: 'parameters/celtic-knot-ring.jscad', title: 'Interactive Params: Celtic Knot Ring' },
  { file: 'parameters/stepper-motor.jscad', title: 'Interactive Params: Stepper Motor' },
  { file: 'parameters/iphone4-case.jscad', title: 'Interactive Params: iPhone4 Case' },
  { file: 'parameters/name_plate.jscad', title: 'Interactive Params: Name Plate' },
  { file: 'parameters/balloons.jscad', title: 'Interactive Params: Balloons' },

  { file: 'globe.jscad', title: 'Include(): Globe', spacing: true },
  { file: 'platonics/', title: 'Recursive Include(): Platonics' },

  { file: 'babypanda2.svg', title: 'SVG Image: Baby Panda', spacing: true },

  { file: '3d_sculpture-VernonBussler.stl', title: '3D Model: 3D Sculpture (Vernon Bussler)', type: 'STL', spacing: true },
  { file: 'frog-OwenCollins.stl', title: '3D Model: Frog (Owen Collins)', type: 'STL' },
  { file: 'thing_7-Zomboe.stl', title: '3D Model: Thing 7 / Flower (Zomboe)', type: 'STL' },
  { file: 'yoda-RichRap.stl', title: '3D Model: Yoda (RichRap)', type: 'STL' },
  { file: 'feathers_mcgraw.stl', title: '3D Model: Feathers Mcgraw (q1g0ng)', type: 'STL' }
]
const html = require('bel')

module.exports = function examples (state, i18n) {
  var wrap = 26
  var colp = 100 / Math.floor(examplesData.length / wrap + 1) + '%'

  const baseUrl = window.location.origin
  const exampleElems = examplesData.map((example) => {
    const type = example.type || ''
    const exampleUrl = `${baseUrl}/examples/${example.file}`
    return html`
    <tr>
      <td class="examplesSeparator" width="${colp}" valign="top">
        <a class="example" data-path="${exampleUrl}" href="#"> ${example.title} </a>
        <span class="${type}">${type}</span> 
      </td>
    </tr>
    `
  })
  return exampleElems
}
