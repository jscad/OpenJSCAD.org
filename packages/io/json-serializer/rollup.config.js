import * as fs from 'fs'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const {name, version, license} = JSON.parse(fs.readFileSync('package.json'))

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-json-serializer.min.js',
      format: 'umd',
      name: 'jscadJsonSerializer',
      banner: `/*! ${name} V${version} (${license}) */`
    },
    {
      file: 'dist/jscad-json-serializer.es.js',
      format: 'es',
      banner: `/*! ${name} V${version} (${license}) */`
    }
  ],

  plugins: [
    nodeResolve(),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
