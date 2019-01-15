module.exports = {
  prepareRender: require('./rendering/render'),
  drawCommands: {
    // draw commands should bootstrap themselves the first time they are run
    drawGrid: require('./rendering/drawGrid/index.js'),
    drawAxis: require('./rendering/drawAxis'),
    drawMesh: require('./rendering/drawMesh/index.js')
  },
  cameras: {
    camera: require('./cameras/camera'),
    orthographic: require('./cameras/orthographicCamera'),
    perspective: require('./cameras/perspectiveCamera')
  },
  entitiesFromSolids: require('./geometry-utils/entitiesFromSolids')
}
