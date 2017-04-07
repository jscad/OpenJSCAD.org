import buble from 'rollup-plugin-buble'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-post-replace'

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'cjs',
  moduleName: '@jscad/io',
  sourceMap: true,
  external: [
    'csg'
  ],
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
    })
  ]
}
