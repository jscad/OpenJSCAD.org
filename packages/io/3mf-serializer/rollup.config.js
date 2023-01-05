import banner from 'rollup-plugin-banner'
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  external: ['@jscad/modeling'],

  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-3mf-serializer.min.js',
      format: 'umd',
      name: 'jscad3mfSerializer',
      globals: {
        '@jscad/modeling': 'jscadModeling'
      }
    },
    {
      file: 'dist/jscad-3mf-serializer.es.js',
      format: 'es',
    }
  ],

  plugins: [
    commonjs(),
    banner('<%= pkg.description %>\n<%= pkg.name %>\nVersion <%= pkg.version %>\n<%= pkg.license %> License'),
    nodeResolve()
  ]
}
