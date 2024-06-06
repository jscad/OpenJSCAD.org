import banner from 'rollup-plugin-banner'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-obj-serializer.min.js',
      format: 'umd',
      name: 'jscadObjSerializer'
    },
    {
      file: 'dist/jscad-obj-serializer.es.js',
      format: 'es'
    }
  ],

  plugins: [
    nodeResolve(),
    banner('<%= pkg.description %>\n@module <%= pkg.name %>\n@version <%= pkg.version %>\n@license <%= pkg.license %>'),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
