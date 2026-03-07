import * as fs from 'fs'

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const {name, version, license} = JSON.parse(fs.readFileSync('package.json'))

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-3mf-serializer.min.js',
      format: 'umd',
      name: 'jscad3mfSerializer',
      banner: `/*! ${name} V${version} (${license}) */`
    },
    {
      file: 'dist/jscad-3mf-serializer.es.js',
      format: 'es',
      banner: `/*! ${name} V${version} (${license}) */`
    }
  ],

  plugins: [
    commonjs(),
    nodeResolve(),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
