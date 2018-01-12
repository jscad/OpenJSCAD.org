// title      : Rounded Cube
// author     : Rene K. Mueller
// license    : MIT License
// description: testing roundedCube() function
// file       : rounded-cube.jscad

function getParameterDefinitions() {
  return [
    { name: 'width', type: 'float', default: 10, caption: "Width:" },
    { name: 'height', type: 'float', default: 14, caption: "Height:" },
    { name: 'depth', type: 'float', default: 7, caption: "Depth:" },
    { name: 'rounded', type: 'choice', caption: 'Round the corners', values: [0, 1], captions: ["No", "Yes"], default: 1 },
  ];
}

function main(params) {
  var result;
  if(params.rounded == 1) {
    result = CSG.roundedCube({radius: [params.width, params.height, params.depth], roundradius: 2, resolution: 8});
  } else {
    result = CSG.cube({radius: [params.width, params.height, params.depth]});
  }
  return result;
}
