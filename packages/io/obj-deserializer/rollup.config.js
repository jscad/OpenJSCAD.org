import banner from 'rollup-plugin-banner'
import versionInjector from 'rollup-plugin-version-injector';

export default {
  external: ['@jscad/modeling'],

  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-obj-deserializer.min.js',
      format: 'umd',
      name: 'jscadObjDeserializer',
      globals: {
        '@jscad/modeling': 'jscadModeling'
      }
    },
    {
      file: 'dist/jscad-obj-deserializer.es.js',
      format: 'es',
    }
  ],

  plugins: [
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License'),
    versionInjector({injectInComments:{fileRegexp: /\.(html)$/},logLevel: 'warn'}),
  ]
}
