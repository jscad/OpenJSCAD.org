import banner from 'rollup-plugin-banner'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-3mf-serializer.min.js',
      format: 'umd',
      name: 'jscad3mfSerializer'
    },
    {
      file: 'dist/jscad-3mf-serializer.es.js',
      format: 'es'
    }
  ],

  plugins: [
    commonjs(),
    nodeResolve(),
    banner('<%= pkg.description %>\n@module <%= pkg.name %>\n@version <%= pkg.version %>\n@license <%= pkg.license %>'),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
