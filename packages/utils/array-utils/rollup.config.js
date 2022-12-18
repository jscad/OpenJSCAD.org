import banner from 'rollup-plugin-banner'

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
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License')
  ]
}
