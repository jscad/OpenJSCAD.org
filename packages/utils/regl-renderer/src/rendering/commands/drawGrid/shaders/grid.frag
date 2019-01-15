precision mediump float;
uniform vec4 color;
varying vec3 fragNormal, fragPosition;
varying vec4 worldPosition;

uniform vec4 fogColor;
uniform bool fadeOut;
void main() {
  float dist = .5;
  if(fadeOut){
    dist = distance( vec2(0.,0.), vec2(worldPosition.x, worldPosition.y));
    dist *= 0.0025;
    dist = sqrt(dist);
    //dist = clamp(dist, 0.0, 1.0);
  }

  gl_FragColor = mix(color, fogColor, dist);
}
