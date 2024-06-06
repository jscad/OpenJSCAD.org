import banner from 'rollup-plugin-banner'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/jscad-array-utils.min.js',
      format: 'umd',
      name: 'jscadArrayUtils'
    },
    {
      file: 'dist/jscad-array-utils.es.js',
      format: 'es'
    }
  ],
  plugins: [
    banner('<%= pkg.description %>\n@module <%= pkg.name %>\n@version <%= pkg.version %>\n@license <%= pkg.license %>'),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
