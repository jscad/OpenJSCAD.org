const mat4 = require('gl-mat4')

const cameraState = {
  view: mat4.identity(new Float32Array(16)),
  projection: mat4.identity(new Float32Array(16)),
  matrix: mat4.identity(new Float32Array(16)), // not sure if needed
  near: 1, // 0.01,
  far: 18000,
  up: [0, 0, 1],
  // distance: 10.0, // not sure if needed
  eye: new Float32Array(3), // same as position
  position: [450, 550, 700],
  target: [0, 0, 0],
  fov: Math.PI / 4,
  aspect: 1,
  viewport: [0, 0, 0, 0],
  projectionType: 'perspective'
}

const cameraProps = {
}

const defaults = Object.assign({}, cameraState, cameraProps)

function setProjection (camera, input) {
  // context.viewportWidth / context.viewportHeight,
  const aspect = input.width / input.height

  const projection = mat4.perspective(camera.projection, camera.fov, aspect,
    camera.near,
    camera.far)
  const viewport = [0, 0, input.width, input.height]

  return {projection, aspect, viewport}
}

module.exports = {cameraState, cameraProps, defaults, setProjection}
