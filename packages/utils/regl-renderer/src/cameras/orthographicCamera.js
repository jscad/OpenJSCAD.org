const mat4 = require('gl-mat4')

const cameraState = {
  view: mat4.identity(new Float32Array(16)),
  projection: mat4.identity(new Float32Array(16)),
  matrix: mat4.identity(new Float32Array(16)), // not sure if needed
  near: 1, // 0.01,
  far: 1300,
  up: [0, 0, 1],
  // distance: 10.0, // not sure if needed
  eye: new Float32Array(3), // same as position
  position: [150, 250, 200],
  target: [0, 0, 0],
  fov: Math.PI / 4,
  aspect: 1,
  viewport: [0, 0, 0, 0],
  zoom: 1,
  projectionType: 'orthographic'
}

const cameraProps = {}

const setProjection = (camera, input) => {
  const { width, height } = input
  // context.viewportWidth / context.viewportHeight,
  const aspect = width / height
  const viewport = [0, 0, width, height]
  const multiplier = camera.zoom

  const left = -width * multiplier
  const right = width * multiplier
  const bottom = -height * multiplier
  const top = height * multiplier

  const projection = mat4.ortho([], left, right, bottom, top, camera.near, camera.far)
  return { projection, aspect, viewport }
}

module.exports = { cameraState, cameraProps, setProjection }
