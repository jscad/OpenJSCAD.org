module.exports = {
  prepareRender: require('./rendering/render'),
  drawCommands: {
    // draw commands should bootstrap themselves the first time they are run
    drawGrid: require('./rendering/commands/drawGrid/multi.js'),
    drawAxis: require('./rendering/commands/drawAxis'),
    drawMesh: require('./rendering/commands/drawMesh/index.js')
  },
  cameras: {
    camera: require('./cameras/camera'),
    orthographic: require('./cameras/orthographicCamera'),
    perspective: require('./cameras/perspectiveCamera')
  },
  controls: {
    orbit: require('./controls/orbitControls')
  },
  entitiesFromSolids: require('./geometry-utils-V2/entitiesFromSolids')

}
