import banner from 'rollup-plugin-banner'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import versionInjector from 'rollup-plugin-version-injector'
import terser from '@rollup/plugin-terser'

export default {
  input: 'src/index.js',

  output: [
    {
      file: 'dist/jscad-stl-deserializer.min.js',
      format: 'umd',
      name: 'jscadStlDeserializer'
    },
    {
      file: 'dist/jscad-stl-deserializer.es.js',
      format: 'es'
    }
  ],

  plugins: [
    nodeResolve(),
    banner('<%= pkg.description %>\n@module <%= pkg.name %>\n@version <%= pkg.version %>\n@license <%= pkg.license %>'),
    versionInjector({ injectInComments: { fileRegexp: /\.(html)$/ }, logLevel: 'warn' }),
    terser({ compress: { module: true }, mangle: false, format: { comments: 'some' } })
  ]
}
