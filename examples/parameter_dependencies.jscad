// title: Rounded Cube

function getParameterDefinitions() {
  return [
    { name: 'type', type: 'choice', default: 'cube', caption: 'Type of object:', values: ['cube', 'sphere'], captions: ['Rounded Cube', 'Sphere'], default: 'cube' },
    { name: 'width', type: 'float', default: 10, caption: "Width:", 'depends': 'type', 'dependvalue': 'cube' },
    { name: 'height', type: 'float', default: 14, caption: "Height:", 'depends': 'type', 'dependvalue': 'cube' },
    { name: 'depth', type: 'float', default: 7, caption: "Depth:", 'depends': 'type', 'dependvalue': 'cube' },
    { name: 'rounded', type: 'choice', caption: 'Round the corners', values: [0, 1], captions: ["No", "Yes"], default: 1, 'depends': 'type', 'dependvalue': 'cube' },
    { name: 'diameter', type: 'float', default: 10, caption: 'Diameter:', 'depends': 'type', 'dependvalue': 'sphere' },
  ];
}

function main(params) {
  var result;
  if (params.type === 'cube') {
    if(params.rounded == 1) {
      result = CSG.roundedCube({radius: [params.width, params.height, params.depth], roundradius: 2, resolution: 8});
    } else {
      result = CSG.cube({radius: [params.width, params.height, params.depth]});
    }
  } else {
    result = CSG.sphere({radius: params.diameter / 2, resolution: 32});
  }
  return result;
}
