import banner from 'rollup-plugin-banner'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/jscad-modeling.min.js',
      format: 'umd',
      name: 'jscadModeling'
    },
    {
      file: 'dist/jscad-modeling.es.js',
      format: 'es'
    }
  ],
  plugins: [
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License'),
    terser({ compress: { module: true }, mangle: false, format: { comments: false} })
  ]
}
