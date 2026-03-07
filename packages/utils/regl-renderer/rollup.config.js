import * as fs from 'fs'

import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'

const {name, version, license} = JSON.parse(fs.readFileSync('package.json'))

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-regl-renderer.min.js',
      format: 'umd',
      name: 'jscadReglRenderer',
      banner: `/*! ${name} V${version} (${license}) */`
    },
    {
      file: 'dist/jscad-regl-renderer.es.js',
      format: 'es',
      banner: `/*! ${name} V${version} (${license}) */`
    }
  ],

  plugins: [
    nodeResolve(),
    commonjs(),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
