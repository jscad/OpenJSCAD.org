import banner from 'rollup-plugin-banner'
import versionInjector from 'rollup-plugin-version-injector';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-json-deserializer.min.js',
      format: 'umd',
      name: 'jscadJsonSerializer',
    },
    {
      file: 'dist/jscad-json-deserializer.es.js',
      format: 'es',
    }
  ],

  plugins: [
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License'),
    versionInjector({injectInComments:{fileRegexp: /\.(html)$/},logLevel: 'warn'}),
    nodeResolve(),
  ]
}
