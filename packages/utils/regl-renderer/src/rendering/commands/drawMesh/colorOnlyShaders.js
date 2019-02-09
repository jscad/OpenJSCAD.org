const vColorFrag = `
precision mediump float;
uniform vec4 ucolor;

void main () {
  gl_FragColor = ucolor;
}
`
module.exports = { frag: vColorFrag }
