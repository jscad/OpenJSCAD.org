const mat4 = require('gl-mat4')

/** function that injects most of the uniforms into the regl context:
 * ie keeps track of all regl global state.
 * @param  {} regl
 * @param  {} params={}
 */
const renderWrapper = (regl, params = {}) => {
  const { fbo } = params

  const commandParams = {
    cull: {
      enable: true
    },
    context: {
      lightDirection: [0.2, 0.2, 1]// [0.19, 0.47, 0.29]
    },
    uniforms: {
      view: (context, props) => props.camera.view,
      eye: (context, props) => props.camera.position,
      // projection: (context, props) => mat4.perspective([], props.camera.fov, context.viewportWidth/context.viewportHeight, props.camera.near, props.camera.far), //props.camera.projection,//context.viewportWidth also an alternative?
      projection: (context, props) => props.camera.projection,
      camNear: (context, props) => props.camera.near,
      camFar: (context, props) => props.camera.far,
      // accessories to the above
      invertedView: (context, props) => mat4.invert([], props.camera.view),
      // lighting stuff, needs cleanup
      lightPosition: (context, props) => props && props.rendering && props.rendering.lightPosition ? props.rendering.lightPosition : [100, 200, 100],
      lightDirection: (context, props) => props && props.rendering && props.rendering.lightDirection ? props.rendering.lightDirection : context.lightDirection || [0, 0, 0],
      lightView: (context) => mat4.lookAt([], context.lightDirection, [0.0, 0.0, 0.0], [0.0, 0.0, 1.0]),
      lightProjection: mat4.ortho([], -25, -25, -20, 20, -25, 25),
      lightColor: (context, props) => props && props.rendering && props.rendering.lightColor ? props.rendering.lightColor : [1, 0.8, 0],
      ambientLightAmount: (context, props) => props && props.rendering && props.rendering.ambientLightAmount ? props.rendering.ambientLightAmount : 0.3,
      diffuseLightAmount: (context, props) => props && props.rendering && props.rendering.diffuseLightAmount ? props && props.rendering && props.rendering.diffuseLightAmount : 0.89,
      specularLightAmount: (context, props) => props && props.rendering && props.rendering.specularLightAmount ? props.rendering.specularLightAmount : 0.16,
      uMaterialShininess: (context, props) => props && props.rendering && props.rendering.materialShininess ? props.rendering.materialShininess : 8.0,
      materialAmbient: [0.5, 0.8, 0.3],
      materialDiffuse: [0.5, 0.8, 0.3],
      materialSpecular: [0.5, 0.8, 0.3]
    },
    framebuffer: fbo
  }

  // it returns a function
  return regl(Object.assign({}, commandParams, params.extras))
}

module.exports = renderWrapper
