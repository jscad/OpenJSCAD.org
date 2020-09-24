const html = require('nanohtml')

const examplesData = [
  { file: 'core/primitives/primitives2D.js', title: '2D Primitives' },
  { file: 'core/primitives/primitives3D.js', title: '3D Primitives' },
  { file: 'core/primitives/polyhedron.js', title: 'Custom Polyhedron' },
  { file: 'core/primitives/torus.js', title: 'Torus' },
  { file: 'core/primitives/dodecahedron.js', title: 'Dodecahedron' },
  { file: 'core/primitives/roundedCuboid.js', title: 'Rounded Cuboid' },
  { file: 'core/primitives/sphere.js', title: 'Sphere Variations' },

  { file: 'core/booleans/basicBooleans.js', title: 'Basic Booleans' },
  { file: 'core/extrusions/basicExtrusions.js', title: 'Basic Extrusions' },
  { file: 'core/extrusions/extrudeFromSlices.js', title: 'Extrude From Slices' },
  { file: 'core/hulls/hull2D.js', title: '2D Hull & Hull Chain' },
  { file: 'core/hulls/hull3D.js', title: '3D Hull & Hull Chain' },
  { file: 'core/text/text.js', title: 'Creating Text' },
  { file: 'core/expansions/offset.js', title: 'Offset Geometry' },
  { file: 'core/expansions/expand.js', title: 'Expand Path or Object' },
  { file: 'core/transforms/center.js', title: 'Center Geometries' },

  { file: 'core/colors/basicColors.js', title: 'Basic Colors' },
  { file: 'core/colors/colorCube.js', title: 'Color Cube' },
  { file: 'core/colors/transparency.js', title: 'Transparency' },

  { file: 'core/measurements/measureBounds.js', title: 'Measure Bounds' },
  { file: 'core/measurements/measureAggregateBounds.js', title: 'Measure Aggregate Bounds' },
  { file: 'core/measurements/measureAreaAndVolume.js', title: 'Measure Area & Volume' },
  { file: 'core/curves/bezier/simpleExtrude.js', title: 'Simple Extrude' },
  { file: 'core/curves/bezier/extrudeAlongPath.js', title: 'Extrude Along a Path' },

  { file: 'parameters/allParamTypes.js', title: 'All Parameter Types' },
  { file: 'parameters/gear.js', title: 'Involute Gear' },
  { file: 'parameters/balloons.js', title: 'Birthday Balloons' },

  { file: 'module-design/', title: 'Modular Design' },

  { file: 'import/SVGImport/', title: 'SVG Import' },
  { file: 'import/STLImport/', title: 'STL Import' },
  { file: 'import/AMFImport/', title: 'AMF Import' }
]

const examples = (state, i18n) => {
  const baseUrl = window.location.origin
  const examplesElements = examplesData.map((example) => {
    const type = example.type ? `<span class="${example.type}">${example.type}</span>` : ''
    const exampleUrl = `${baseUrl}/examples/${example.file}`
    return html`
    <li>
      <a class="example" data-path="${exampleUrl}" href="#"> ${example.title} </a> ${type}
    </li>
    `
  })
  return html`<ul>${examplesElements}</ul>`
}

module.exports = examples
