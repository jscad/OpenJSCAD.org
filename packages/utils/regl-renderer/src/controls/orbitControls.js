const vec3 = require('gl-vec3')
const mat4 = require('gl-mat4')
const { max, min, sqrt, PI, sin, cos, atan2 } = Math

const computeBounds = require('../bound-utils/computeBounds')

// TODO: make it more data driven ?
/*
setFocus => modify the focusPoint input
rotate => modify the angle input

*/
/* cameras are assumed to have:
 projection
 view
 target (focal point)
 eye/position
 up
*/
// TODO:  multiple data, sometimes redundant, needs simplification
/*
- camera state
- camera props

- controls state
- controls props

- other

*/

const controlsProps = {
  limits: {
    minDistance: 0.01,
    maxDistance: 10000
  },
  drag: 0.27, // Decrease the momentum by 1% each iteration
  EPS: 0.000001,
  zoomToFit: {
    auto: true, // always tried to apply zoomTofit
    targets: 'all',
    tightness: 1.5 // how close should the fit be: the lower the tigher : 1 means very close, but fitting most of the time
  },
  // all these, not sure are needed in this shape
  userControl: {
    zoom: true,
    zoomSpeed: 1.0,
    rotate: true,
    rotateSpeed: 1.0,
    pan: true,
    panSpeed: 1.0
  },
  autoRotate: {
    enabled: false,
    speed: 2.0 // 30 seconds per round when fps is 60
  },
  autoAdjustPlanes: true // adjust near & far planes when zooming in &out
}

const controlsState = {
  // orbit controls state
  thetaDelta: 0,
  phiDelta: 0,
  scale: 1
}

const defaults = Object.assign({}, controlsState, controlsProps)

const update = ({ controls, camera }, output) => {
  // custom z up is settable, with inverted Y and Z (since we use camera[2] => up)
  const { EPS, drag } = controls
  const { position, target } = camera
  const up = controls.up ? controls.up : camera.up

  let curThetaDelta = controls.thetaDelta
  const curPhiDelta = controls.phiDelta
  const curScale = controls.scale

  const offset = vec3.subtract([], position, target)
  let theta
  let phi

  // console.log('target', target)
  // console.log(matrix)

  if (up[2] === 1) {
    // angle from z-axis around y-axis, upVector : z
    theta = atan2(offset[0], offset[1])
    // angle from y-axis
    phi = atan2(sqrt(offset[0] * offset[0] + offset[1] * offset[1]), offset[2])
  } else {
    // in case of y up
    theta = atan2(offset[0], offset[2])
    phi = atan2(sqrt(offset[0] * offset[0] + offset[2] * offset[2]), offset[1])
  // curThetaDelta = -(curThetaDelta)
  }

  if (controls.autoRotate.enabled && controls.userControl.rotate) {
    curThetaDelta += 2 * Math.PI / 60 / 60 * controls.autoRotate.speed
  }

  theta += curThetaDelta
  phi += curPhiDelta

  // restrict phi to be betwee EPS and PI-EPS
  phi = max(EPS, min(PI - EPS, phi))
  // multiply by scaling effect and restrict radius to be between desired limits
  const radius = max(controls.limits.minDistance, min(controls.limits.maxDistance, vec3.length(offset) * curScale))

  if (up[2] === 1) {
    offset[0] = radius * sin(phi) * sin(theta)
    offset[2] = radius * cos(phi)
    offset[1] = radius * sin(phi) * cos(theta)
  } else {
    offset[0] = radius * sin(phi) * sin(theta)
    offset[1] = radius * cos(phi)
    offset[2] = radius * sin(phi) * cos(theta)
  }

  const newPosition = vec3.add(vec3.create(), target, offset)
  const newView = mat4.lookAt(mat4.create(), newPosition, target, up)

  const dragEffect = 1 - max(min(drag, 1.0), 0.01)
  const positionChanged = vec3.distance(position, newPosition) > 0 // TODO optimise

  /* let newMatrix = mat4.create()
  newMatrix = mat4.lookAt(newMatrix, newPosition, target, up)
  newMatrix = mat4.translate(matrix, matrix, newPosition) */

  // update camera matrix
  // let quaternion = quatFromRotationMatrix(mat4.lookAt(mat4.create(), [0, 0, 0], target, up))
  // let newMatrix = composeMat4(mat4.create(), newPosition, quaternion, [1, 1, 1])

  // view = newMatrix

  /* if (output) {
    output.controls.thetaDelta = curThetaDelta * dragEffect
  } */

  return {
    // controls state
    controls: {
      thetaDelta: curThetaDelta * dragEffect,
      phiDelta: curPhiDelta * dragEffect,
      scale: 1,
      changed: positionChanged
    },
    // camera state
    camera: {
      position: newPosition,
      view: newView
    }
    // matrix: newMatrix
  }
}

/**
  * compute camera state to rotate the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} angle value of the angle to rotate
  * @return {Object} the updated camera data/state
*/
const rotate = ({ controls, camera, speed = 1 }, angle) => {
  let {
    thetaDelta,
    phiDelta
  } = controls

  if (controls.userControl.rotate) {
    thetaDelta += (angle[0] * speed)
    phiDelta += (angle[1] * speed)
  }

  return {
    controls: {
      thetaDelta,
      phiDelta
    },
    camera
  }
}

/**
  * compute camera state to zoom the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} zoomDelta value of the zoom
  * @return {Object} the updated camera data/state
*/
const zoom = ({ controls, camera, speed = 1 }, zoomDelta = 0) => {
  let { scale } = controls

  if (controls.userControl.zoom && camera && zoomDelta !== undefined && zoomDelta !== 0 && !isNaN(zoomDelta)) {
    const sign = Math.sign(zoomDelta) === 0 ? 1 : Math.sign(zoomDelta)
    zoomDelta = (zoomDelta / zoomDelta) * sign * speed// controls.userControl.zoomSpeed
    // adjust zoom scaling based on distance : the closer to the target, the lesser zoom scaling we apply
    // zoomDelta *= Math.exp(Math.max(camera.scale * 0.05, 1))
    // updated scale after we will apply the new zoomDelta to the current scale
    const newScale = (zoomDelta + controls.scale)
    // updated distance after the scale has been updated, used to prevent going outside limits
    const newDistance = vec3.distance(camera.position, camera.target) * newScale

    if (newDistance > controls.limits.minDistance && newDistance < controls.limits.maxDistance) {
      scale += zoomDelta
    }
    // for ortho cameras
    if (camera.projectionType === 'orthographic') {
      const distance = vec3.length(vec3.subtract([], camera.position, camera.target)) * 0.3
      const width = Math.tan(camera.fov) * distance * camera.aspect
      const height = Math.tan(camera.fov) * distance

      const projection = require('../cameras/orthographicCamera').setProjection(camera, { width, height })
      camera = projection
    }

    /* if (controls.autoAdjustPlanes) {
      // these are empirical values , after a LOT of testing
      const distance = vec3.squaredDistance(camera.target, camera.position)
      camera.near = Math.min(Math.max(5, distance * 0.0015), 100)
    } */
  }
  return { controls: { scale }, camera }
}

/**
  * compute camera state to pan the camera
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Float} delta value of the raw pan delta
  * @return {Object} the updated camera data/state
*/
const pan = ({ controls, camera, speed = 1 }, delta) => {
  const unproject = require('camera-unproject')
  const { projection, view, viewport } = camera
  const combinedProjView = mat4.multiply([], projection, view)
  const invProjView = mat4.invert([], combinedProjView)

  const panStart = [
    viewport[2],
    viewport[3],
    0
  ]
  const panEnd = [
    viewport[2] - delta[0],
    viewport[3] + delta[1],
    0
  ]
  const unPanStart = unproject([], panStart, viewport, invProjView)
  const unPanEnd = unproject([], panEnd, viewport, invProjView)
  // TODO scale by the correct near/far value instead of 1000 ?
  // const planesDiff = camera.far - camera.near
  const offset = vec3.subtract([], unPanStart, unPanEnd).map((x) => x * speed * 250 * controls.scale)

  return {
    controls,
    camera: {
      position: vec3.add(vec3.create(), camera.position, offset),
      target: vec3.add(vec3.create(), camera.target, offset)
    }
  }
}

/**
  * compute camera state to 'fit' an object on screen
  * Note1: this is a non optimal but fast & easy implementation
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Object} entity an object containing a 'bounds' property for bounds information
  * @return {Object} the updated camera data/state
*/
const zoomToFit = ({ controls, camera, entities }) => {
  // our camera.fov is already in radian, no need to convert
  const { zoomToFit } = controls
  if (entities.length < 1 || zoomToFit.targets !== 'all') { //! == 'all' || entity === undefined || !entity.bounds) {
    return { controls, camera }
  }

  let bounds
  if (entities.length > 1) {
    // more than one entity, targeted, need to compute the overall bounds
    const geometries = entities.map((entity) => entity.geometry)
    bounds = computeBounds(geometries)
  } else {
    bounds = entities[0].bounds
  }

  // fixme: for now , we only use the first item
  const { fov, target, position } = camera
  const { tightness } = Object.assign({}, zoomToFit, controlsProps.zoomToFit)
  /*
    - x is scaleForIdealDistance
    - currentDistance is fixed
    - how many times currentDistance * x = idealDistance
    So
    x = idealDistance / currentDistance
  */
  const idealDistanceFromCamera = (bounds.dia * tightness) / Math.tan(fov / 2.0)
  const currentDistance = vec3.distance(target, position)
  const scaleForIdealDistance = idealDistanceFromCamera / currentDistance

  return {
    camera: { target: bounds.center },
    controls: { scale: scaleForIdealDistance }
  }
}

/**
  * compute controls state to 'reset it' to the given state
  * Note1: this is a non optimal but fast & easy implementation
  * @param {Object} controls the controls data/state
  * @param {Object} camera the camera data/state
  * @param {Object} desiredState the state to reset the camera to: defaults to default values
  * @return {Object} the updated camera data/state
*/
const reset = ({ controls, camera }, desiredState) => {
  const options = {
    camera: {
      position: desiredState.camera.position,
      target: desiredState.camera.target,
      projection: mat4.perspective([], camera.fov, camera.aspect, camera.near, camera.far),
      view: desiredState.camera.view
    },
    controls: {
      thetaDelta: desiredState.controls.thetaDelta,
      phiDelta: desiredState.controls.phiDelta,
      scale: desiredState.controls.scale
    }
  }
  return options
}

// FIXME: upgrade or obsolete
const setFocus = ({ controls, camera }, focusPoint) => {
  const sub = (a, b) => a.map((a1, i) => a1 - b[i])
  const add = (a, b) => a.map((a1, i) => a1 + b[i]) // NOTE: NO typedArray.map support on old browsers, polyfilled
  const camTarget = camera.target
  const diff = sub(focusPoint, camTarget) // [ focusPoint[0] - camTarget[0],
  const zOffset = [0, 0, diff[2] * 0.5]
  camera.target = add(camTarget, zOffset)
  camera.position = add(camera.position, zOffset)
  return camera

  // old 'zoom to fit' update code
  /* if (targetTgt && positionTgt) {
    const posDiff = vec3.subtract([], positionTgt, newPosition)
    const tgtDiff = vec3.subtract([], targetTgt, newTarget)
    // console.log('posDiff', newPosition, positionTgt, newTarget, targetTgt)
    if (vec3.length(posDiff) > 0.1 && vec3.length(tgtDiff) > 0.1) {
      newPosition = vec3.scaleAndAdd(newPosition, newPosition, posDiff, 0.1)
      newTarget = vec3.scaleAndAdd(newTarget, newTarget, tgtDiff, 0.1)
    }

    if (settings.autoAdjustPlanes) {
      var distance = vec3.squaredDistance(newTarget, newPosition)
      near = Math.min(Math.max(5, distance * 0.0015), 100) // these are empirical values , after a LOT of testing
      projection = mat4.perspective([], camera.fov, camera.aspect, camera.near, camera.far)
    }
  } */
}

module.exports = {
  controlsProps,
  controlsState,
  defaults,
  update,
  rotate,
  zoom,
  pan,
  zoomToFit,
  reset
}
