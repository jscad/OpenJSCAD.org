import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-post-replace'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'src/module.js',
  dest: 'dist/module.js',
  format: 'cjs',
  moduleName: 'openjscad',
  sourceMap: true,
  external: [
    '@jscad/csg'
  ],
  plugins: [
    buble(),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports: {
        'node_modules/@jscad/csg/csg.js': [ 'CSG', 'CAG' ],
        '@jscad/io': ['amfSerializer', 'stlSerializer', 'dxfSerializer', 'svgSerializer',  'x3dSerializer', 'jsonSerializer', 'makeBlob']
      }
    }),
    replace({
      '../../package.json': '../package.json'
    }),
    uglify()
  ]
}
