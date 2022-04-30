const vColorVert = `
precision mediump float;

uniform float camNear, camFar;
uniform mat4 model, view, projection;

attribute vec3 position, normal;
attribute vec4 color;

varying vec3 surfaceNormal, surfacePosition;
varying vec4 _worldSpacePosition;
varying vec4 vColor;

void main() {
  vColor = color;

  surfacePosition = position;
  surfaceNormal = normal;
  vec4 worldSpacePosition = model * vec4(position, 1);
  _worldSpacePosition = worldSpacePosition;

  vec4 glPosition = projection * view * model * vec4(position, 1);
  gl_Position = glPosition;
}
`

const vColorFrag = `
precision mediump float;
varying vec4 vColor;

void main () {
  gl_FragColor = vColor;
}
`
module.exports = { frag: vColorFrag, vert: vColorVert }
