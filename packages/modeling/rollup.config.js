import * as fs from 'fs'

import terser from '@rollup/plugin-terser'

const { name, version, license } = JSON.parse(fs.readFileSync('package.json'))

export default {
  input: './src/index.js',
  output: [
    {
      file: './dist/jscad-modeling.js',
      format: 'es',
      banner: `/*! ${name} V${version} (${license}) */`
    }
  ],
  plugins: [
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
