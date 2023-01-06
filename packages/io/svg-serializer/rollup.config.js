import banner from 'rollup-plugin-banner'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import versionInjector from 'rollup-plugin-version-injector';

export default {
  external: ['@jscad/modeling'],

  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-svg-serializer.min.js',
      format: 'umd',
      name: 'jscadSvgSerializer',
      globals: {
        '@jscad/modeling': 'jscadModeling'
      }
    },
    {
      file: 'dist/jscad-svg-serializer.es.js',
      format: 'es',
    }
  ],

  plugins: [
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License'),
    versionInjector({injectInComments:{fileRegexp: /\.(html)$/},logLevel: 'warn'}),
    nodeResolve()
  ]
}
