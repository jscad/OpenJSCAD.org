precision mediump float;

uniform float camNear, camFar;
uniform mat4 model, view, projection;

attribute vec3 position;
varying vec3 fragNormal, fragPosition;
varying vec4 worldPosition;

//#pragma glslify: zBufferAdjust = require('./zBufferAdjust')

void main() {
  //fragNormal = normal;
  fragPosition = position;
  worldPosition = model * vec4(position, 1);
  vec4 glPosition = projection * view * worldPosition;
  gl_Position = glPosition;
  //gl_Position = zBufferAdjust(glPosition, camNear, camFar);
}
