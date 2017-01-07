import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-post-replace'

export default {
  entry: 'src/module.js',
  dest: 'dist/module.js',
  format: 'cjs',
  moduleName: 'openjscad',
  sourceMap: true,
  plugins: [
    buble(),
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      namedExports: {
        'node_modules/csg/csg.js': [ 'CSG', 'CAG' ]
      }
    }),
    replace({
      '../../package.json': '../package.json'
    })
  ]
}
