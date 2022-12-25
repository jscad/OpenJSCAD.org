import banner from 'rollup-plugin-banner'
import versionInjector from 'rollup-plugin-version-injector';

export default {
  external: ['@jscad/modeling'],

  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-dxf-deserializer.min.js',
      format: 'umd',
      name: 'jscadDxfSerializer',
      globals: {
        '@jscad/modeling': 'jscadModeling'
      }
    },
    {
      file: 'dist/jscad-dxf-deserializer.es.js',
      format: 'es',
    }
  ],

  plugins: [
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License'),
    versionInjector({injectInComments:{fileRegexp: /\.(html)$/},logLevel: 'warn'}),
  ]
}
