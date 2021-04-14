const vColorVert = `
precision mediump float;

uniform float camNear, camFar;
uniform mat4 model, view, projection, unormal;

attribute vec3 position, normal;
attribute vec4 color;

attribute float ao;
varying float ambientAo;

varying vec3 surfaceNormal, surfacePosition;
varying vec4 _worldSpacePosition;
varying vec4 vColor;

void main() {
  surfacePosition = position;
  surfaceNormal = (unormal * vec4(normal, 1.0)).xyz; //vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
  vec4 worldSpacePosition = model * vec4(position, 1);
  _worldSpacePosition = worldSpacePosition;
  //gl_Position = projection * view * worldSpacePosition;

  vColor = color;

  //ambientAo = (1. - ao) * (0.5 * max(normal.x, 0.) + 0.5);

  vec4 glPosition = projection * view * model * vec4(position, 1);
  gl_Position = glPosition;
  //gl_Position = zBufferAdjust(glPosition, camNear, camFar);
}
`
const vColorFrag = `
precision mediump float;
varying vec3 surfaceNormal, surfacePosition;

uniform float ambientLightAmount;
uniform float diffuseLightAmount;
uniform float specularLightAmount;

uniform vec3 lightDirection;
uniform vec4 lightColor;
uniform vec3 opacity;
uniform float uMaterialShininess;

varying vec4 vColor;
uniform vec4 ucolor;
uniform float vColorToggler;

uniform vec2 printableArea;
vec4 errorColor = vec4(0.15, 0.15, 0.15, 0.3);//vec4(0.15, 0.15, 0.15, 0.3);
varying vec4 _worldSpacePosition;
varying float ambientAo;

void main () {
  vec4 depth = gl_FragCoord;
  vec4 endColor = vColor * vColorToggler + ucolor * (1.0 - vColorToggler);

  vec3 ambient = ambientLightAmount * endColor.rgb ; //ambientAo * 

  float diffuseWeight = dot(surfaceNormal, lightDirection);
  vec3 diffuse = diffuseLightAmount * endColor.rgb * clamp(diffuseWeight , 0.0, 1.0 );

  //specular
  
  vec4 specularColor = vec4(lightColor);
  vec3 eyeDirection = normalize(surfacePosition.xyz);
  vec3 reflectionDirection = reflect(-lightDirection, surfaceNormal);
  float specularLightWeight = pow(max(dot(reflectionDirection, eyeDirection), 0.0), uMaterialShininess);
  vec3 specular = specularColor.rgb * specularLightWeight * specularLightAmount;

  /*float light2Multiplier = 0.2;
  float diffuseWeight2 = dot(surfaceNormal, vec3(-lightDirection.x, lightDirection.y, lightDirection.z));
  vec3 diffuse2 = diffuseLightAmount * endColor.rgb * clamp(diffuseWeight2 , 0.0, 1.0 ) * light2Multiplier;

  float light3Multiplier = 0.2;  
  float diffuseWeight3 = dot(surfaceNormal, vec3(lightDirection.x, -lightDirection.y, lightDirection.z));
  vec3 diffuse3 = diffuseLightAmount * endColor.rgb * clamp(diffuseWeight3 , 0.0, 1.0 ) * light3Multiplier;

  float light4Multiplier = 0.2;  
  float diffuseWeight4 = dot(surfaceNormal, vec3(-lightDirection.x, -lightDirection.y, lightDirection.z));
  vec3 diffuse4 = diffuseLightAmount * endColor.rgb * clamp(diffuseWeight4 , 0.0, 1.0 ) * light4Multiplier;*/
  
  gl_FragColor = vec4((ambient + diffuse + specular), endColor.a);
  //gl_FragColor = vec4((ambient + diffuse + diffuse2 + diffuse3 + diffuse4), endColor.a);
}
`

module.exports = { frag: vColorFrag, vert: vColorVert }
