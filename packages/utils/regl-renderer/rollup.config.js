import banner from 'rollup-plugin-banner'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import versionInjector from 'rollup-plugin-version-injector'

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-regl-renderer.min.js',
      format: 'umd',
      name: 'jscadReglRenderer'
    },
    {
      file: 'dist/jscad-regl-renderer.es.js',
      format: 'es'
    }
  ],

  plugins: [
    nodeResolve(),
    commonjs(),
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License'),
    versionInjector({ injectInComments: { fileRegexp: /\.(html)$/ }, logLevel: 'warn' })
  ]
}
