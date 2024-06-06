import banner from 'rollup-plugin-banner'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-regl-renderer.min.js',
      format: 'umd',
      name: 'jscadReglRenderer'
    },
    {
      file: 'dist/jscad-regl-renderer.es.js',
      format: 'es'
    }
  ],

  plugins: [
    nodeResolve(),
    commonjs(),
    banner('<%= pkg.description %>\n@module <%= pkg.name %>\n@version <%= pkg.version %>\n@license <%= pkg.license %>'),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
