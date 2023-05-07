import banner from 'rollup-plugin-banner'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import versionInjector from 'rollup-plugin-version-injector'

export default {
  external: ['@jscad/array-utils', '@jscad/modeling'],

  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-3mf-deserializer.min.js',
      format: 'umd',
      name: 'jscad3MFDeserializer',
      globals: {
        '@jscad/array-utils': 'jscadArrayUtils',
        '@jscad/modeling': 'jscadModeling'
      }
    },
    {
      file: 'dist/jscad-3mf-deserializer.es.js',
      format: 'es'
    }
  ],

  plugins: [
    commonjs(),
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License'),
    versionInjector({ injectInComments: { fileRegexp: /\.(html)$/ }, logLevel: 'warn' }),
    nodeResolve()
  ]
}
