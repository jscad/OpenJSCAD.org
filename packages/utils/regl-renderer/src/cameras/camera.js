const vec3 = require('gl-vec3')
const mat4 = require('gl-mat4')

const fromOrthographicToPerspective = (orthographicCamera) => {
  const { near, far, fov, zoom } = orthographicCamera
  console.log('fov', fov, 'zoom', zoom)
  // : fov / zoom
  // recompute projection matrix to use perspective camera projection matrix
  const { viewport } = orthographicCamera
  const projection = require('./perspectiveCamera').setProjection(orthographicCamera, { width: viewport[2], height: viewport[3] })
  const { projectionType } = require('./perspectiveCamera').cameraState
  return Object.assign({}, orthographicCamera, projection, { projectionType }, { near, far, fov })
}

const fromPerspectiveToOrthographic = (perspectiveCamera) => {
  const { fov, aspect } = perspectiveCamera

  // set the orthographic view rectangle to 0,0,width,height
  // see here : http://stackoverflow.com/questions/13483775/set-zoomvalue-of-a-perspective-equal-to-perspective
  // const target = perspectiveCamera.target === undefined ? vec3.create() : perspectiveCamera.target

  const distance = vec3.length(vec3.subtract([], perspectiveCamera.position, perspectiveCamera.target)) * 0.3
  const width = Math.tan(fov) * distance * aspect
  const height = Math.tan(fov) * distance

  // const halfWidth = width
  // const halfHeight = height

  // const left = halfWidth
  // const right = -halfWidth
  // const top = -halfHeight
  // const bottom = halfHeight

  // we need to compute zoom from distance ? or pass it from controls ?

  // we re-use near, far, & projection matrix of orthographicCamera
  const { near, far, viewport } = perspectiveCamera
  const fCam = { zoom: 1, near, far }
  const orthographicCamera = require('./orthographicCamera').cameraState
  const projection = require('./orthographicCamera').setProjection(fCam, { width, height })
  return Object.assign({}, orthographicCamera, perspectiveCamera, projection, { projectionType: orthographicCamera.projectionType, viewport })
  // return Object.assign({}, orthoCam, projection, {near, far, left, right, top, bottom, target})
}

const toPerspectiveView = ({ camera }) => {
  const offsetToTarget = vec3.distance(camera.position, camera.target)
  const distance = offsetToTarget
  const position = [distance, distance, distance]
  const view = mat4.lookAt(mat4.create(), position, camera.target, camera.up)

  return { view, position }
}

const toPresetView = (viewName, { camera }) => {
  const presets = {
    top: [0, 0, 1],
    bottom: [0, 0, -1],
    front: [0, 1, 0],
    back: [0, -1, 0],
    left: [1, 0, 0],
    right: [-1, 0, 0],
    undefined: [0, 0, 0]
  }

  const offsetToTarget = vec3.distance(camera.position, camera.target)
  const position = vec3.add([], presets[viewName].map((x) => x * offsetToTarget), camera.target)
  const view = mat4.lookAt(mat4.create(), position, camera.target, camera.up)

  return { view, position }
}

module.exports = {
  toPerspectiveView,
  toPresetView,
  fromOrthographicToPerspective,
  fromPerspectiveToOrthographic
}
