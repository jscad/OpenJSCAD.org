import vec3 from 'gl-vec3'
import mat4 from 'gl-mat4'

import * as orthographicCamera from './orthographicCamera.js'
import * as perspectiveCamera from './perspectiveCamera.js'

export const fromOrthographicToPerspective = (orthographicCamera) => {
  const { near, far, fov, zoom } = orthographicCamera
  // recompute projection matrix to use perspective camera projection matrix
  const { viewport } = orthographicCamera
  const projection = perspectiveCamera.setProjection(orthographicCamera, { width: viewport[2], height: viewport[3] })
  const { projectionType } = perspectiveCamera.cameraState
  return Object.assign({}, orthographicCamera, projection, { projectionType }, { near, far, fov })
}

export const fromPerspectiveToOrthographic = (perspectiveCamera) => {
  const { fov, aspect } = perspectiveCamera

  // set the orthographic view rectangle to 0,0,width,height
  // see here : http://stackoverflow.com/questions/13483775/set-zoomvalue-of-a-perspective-equal-to-perspective

  const distance = vec3.length(vec3.subtract([], perspectiveCamera.position, perspectiveCamera.target)) * 0.3
  const width = Math.tan(fov) * distance * aspect
  const height = Math.tan(fov) * distance

  // we re-use near, far, & projection matrix of orthographicCamera
  const { near, far, viewport } = perspectiveCamera
  const fCam = { zoom: 1, near, far }
  const orthographicCamera = orthographicCamera.cameraState
  const projection = orthographicCamera.setProjection(fCam, { width, height })
  return Object.assign({}, orthographicCamera, perspectiveCamera, projection, { projectionType: orthographicCamera.projectionType, viewport })
}

export const toPerspectiveView = ({ camera }) => {
  const offsetToTarget = vec3.distance(camera.position, camera.target)
  const distance = offsetToTarget
  const position = [distance, distance, distance]
  const view = mat4.lookAt(mat4.create(), position, camera.target, camera.up)

  return { view, position }
}

/**
 * Calculate the camera view and position for acheiving the given preset view.
 */
export const toPresetView = (viewName, { camera }) => {
  const presets = {
    top: [0, -0.000001, 1],
    bottom: [0, 0, -1],
    front: [0, 1, 0],
    back: [0, -1, 0],
    left: [-1, 0, 0],
    right: [1, 0, 0],
    undefined: [0, 0, 0]
  }

  const offsetToTarget = vec3.distance(camera.position, camera.target)
  const position = vec3.add(vec3.create(), presets[viewName].map((x) => x * offsetToTarget), camera.target)
  const view = mat4.lookAt(mat4.create(), position, camera.target, camera.up)

  return { view, position }
}
