import banner from 'rollup-plugin-banner'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import versionInjector from 'rollup-plugin-version-injector'

export default {
  external: ['@jscad/modeling'],

  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-x3d-deserializer.min.js',
      format: 'umd',
      name: 'jscadX3dDeserializer',
      globals: {
        '@jscad/modeling': 'jscadModeling'
      }
    },
    {
      file: 'dist/jscad-x3d-deserializer.es.js',
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
