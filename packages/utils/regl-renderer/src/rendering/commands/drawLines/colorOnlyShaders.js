const frag = `
precision mediump float;
uniform vec4 ucolor;

void main () {
  gl_FragColor = ucolor;
}
`
export { frag }
