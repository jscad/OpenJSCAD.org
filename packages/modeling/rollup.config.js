import banner from 'rollup-plugin-banner'

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
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License')
  ]
}
