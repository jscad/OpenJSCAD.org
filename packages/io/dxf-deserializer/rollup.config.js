import * as fs from 'fs'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import versionInjector from 'rollup-plugin-version-injector'
import terser from '@rollup/plugin-terser'

const {name, version, license} = JSON.parse(fs.readFileSync('package.json'))

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-dxf-deserializer.min.js',
      format: 'umd',
      name: 'jscadDxfDeserializer',
      banner: `/*! ${name} V${version} (${license}) */`
    },
    {
      file: 'dist/jscad-dxf-deserializer.es.js',
      format: 'es',
      banner: `/*! ${name} V${version} (${license}) */`
    }
  ],

  plugins: [
    nodeResolve(),
    versionInjector({ injectInComments: { fileRegexp: /\.(html)$/ }, logLevel: 'warn' }),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
