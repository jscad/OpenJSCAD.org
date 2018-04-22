const examplesData = [
  { file: 'logo.jscad', title: 'OpenJSCAD.org Logo' },
  { file: 'logo.amf', title: 'OpenJSCAD.org Logo', type: 'AMF' },

  { file: 'example001.jscad', title: 'Sphere with cutouts', spacing: true },
  { file: 'example001.scad', title: 'Sphere with cutouts', type: 'OpenSCAD' },
  { file: 'example002.jscad', title: 'Cone with cutouts' },
  { file: 'example002.scad', title: 'Cone with cutouts', type: 'OpenSCAD' },
  { file: 'example003.jscad', title: 'Cube with cutouts' },
  { file: 'example003.scad', title: 'Cube with cutouts', type: 'OpenSCAD' },
  // { file:'example004.jscad', title: 'Cube minus sphere' },
  { file: 'example005.jscad', title: 'Pavillon' },

  // { file:'cnc-cutout.jscad', title: 'CNC Corner Cutouts', new: true, spacing: true },

  // { file:'bunch-cubes.jscad', title: 'Bunch of Cubes', new: true },
  { file: 'transformations.jscad', title: 'Transformations', spacing: true },
  { file: 'lookup.jscad', title: 'Lookup()'},
  { file: 'expand.jscad', title: 'Expand()' },
  { file: 'rectangular_extrude.jscad', title: 'Rectangular_extrude()' },
  { file: 'linear_extrude.jscad', title: 'Linear_extrude()' },
  { file: 'rotate_extrude.jscad', title: 'Rotate_extrude()' },
  { file: 'polyhedron.jscad', title: 'Polyhedron()' },
  { file: 'hull.jscad', title: 'Hull()' },
  { file: 'chain_hull.jscad', title: 'Chain_hull()' },
  { file: 'torus.jscad', title: 'Torus()' },

  { file: 'text.jscad', title: 'Vector_text()', spacing: true },

  { file: 'transparency.jscad', title: 'Transparency', spacing: true },
  { file: 'transparency.amf', title: 'Transparency', type: 'AMF' },
  { file: 'transparency2.jscad', title: 'Transparency 2' },

  { file: 'slices/double-screw.jscad', title: 'SolidFromSlices(): Double Screw', spacing: true },
  { file: 'slices/four2three.jscad', title: 'SolidFromSlices(): 4 to 3' },
  { file: 'slices/four2three-round.jscad', title: 'SolidFromSlices(): 4 to 3 round' },
  { file: 'slices/spring.jscad', title: 'SolidFromSlices(): Spring' },
  { file: 'slices/tor.jscad', title: 'SolidFromSlices(): Tor (multi-color)' },
  { file: 'slices/rose.jscad', title: 'SolidFromSlices(): Rose Curve' },

  { file: 'servo.jscad', title: 'Interactive Params: Servo Motor', wrap: true },
  { file: 'gear.jscad', title: 'Interactive Params: Gear' },
  { file: 's-hook.jscad', title: 'Interactive Params: S Hook' },
  { file: 'grille.jscad', title: 'Interactive Params: Grille' },
  { file: 'axis-coupler.jscad', title: 'Interactive Params: Axis Coupler' },
  { file: 'lamp-shade.jscad', title: 'Interactive Params: Lamp Shade' },
  { file: 'celtic-knot-ring.jscad', title: 'Interactive Params: Celtic Knot Ring' },
  { file: 'stepper-motor.jscad', title: 'Interactive Params: Stepper Motor' },
  { file: 'iphone4-case.jscad', title: 'Interactive Params: iPhone4 Case' },
  { file: 'name_plate.jscad', title: 'Interactive Params: Name Plate' },
  { file: 'balloons.jscad', title: 'Interactive Params: Balloons' },

  { file: 'globe.jscad', title: 'Include(): Globe', spacing: true },
  { file: 'platonics/', title: 'Recursive Include(): Platonics' },

  { file: 'babypanda2.svg', title: 'SVG Image: Baby Panda', spacing: true},

  { file: '3d_sculpture-VernonBussler.stl', title: '3D Model: 3D Sculpture (Vernon Bussler)', type: 'STL', spacing: true },
  { file: 'frog-OwenCollins.stl', title: '3D Model: Frog (Owen Collins)', type: 'STL' },
  { file: 'thing_7-Zomboe.stl', title: '3D Model: Thing 7 / Flower (Zomboe)', type: 'STL' },
  { file: 'yoda-RichRap.stl', title: '3D Model: Yoda (RichRap)', type: 'STL' },
  { file: 'feathers_mcgraw.stl', title: '3D Model: Feathers Mcgraw (q1g0ng)', type: 'STL'}
]

const html = require('bel')

/* if (me === 'web-online') {
  var wrap = 26
  var colp = 100 / Math.floor(examples.length / wrap + 1) + '%'
  var src = '<table width=100%><tr><td widthx=' + colp + ' valign=top>'
  for (var i = 0; i < examples.length; i++) {
    if (examples[i].wrap) {
      src += '</td><td class="examplesSeparator" widthx=' + colp + ' valign=top>'
    }
    if (examples[i].spacing) src += '<p/>'
    src += `<li><a class='example' data-path=${'examples/' + examples[i].file} href='#'> + ${examples[i].title} </a>
`
    if (examples[i].type) src += ' <span class=type>(' + examples[i].type + ')</span></a>'
    if (examples[i].new) src += ' <span class=newExample>new</span></a>'
  }
  src += '</td></tr></table>'*/

module.exports = function help (state, i18n) {
  var wrap = 26
  var colp = 100 / Math.floor(examplesData.length / wrap + 1) + '%'

  const exampleElems = examplesData.map((example) => {
    const type = example.type || ''
    return html`
    <tr>
      <td class="examplesSeparator" widthx=' + colp + ' valign=top>
        <a class='example' data-path=${'examples/' + example.file} href='#'> ${example.title} </a>
        <span class=${type}>${type}</span> 
      </td>
    </tr>
    `
  })

  // <td widthx=' + ${colp} + ' valign=top>

  return html`
    <span id='help' style='visibility:${state.activeTool === 'help' ? 'visible' : 'hidden'};' >
      <div>
        <h3>Documentation:</h3>
        <a class="navlink" href="https://openjscad.org/dokuwiki/doku.php" target="_blank">User Guide / Documentation <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">How to program with OpenJSCAD: online, offline & CLI</span>
        <br/>
        <a class="navlink" href="https://plus.google.com/communities/114958480887231067224" rel="publisher" target="_blank">Recent Updates <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">Announcements of recent developments</span>
        <br/>
        <a class="navlink" href="https://plus.google.com/communities/114958480887231067224" target="_blank">Google+ Community <img src="imgs/externalLink.png" style="externalLink"></a>
        <br/><span class="menuSubInfo">Discuss with other users &amp; developers</span>
      </div>
      <div>
        <h3>Examples:</h3>
        <table>
          ${exampleElems}
        </table>
      </div>
    </span>
  `
}
