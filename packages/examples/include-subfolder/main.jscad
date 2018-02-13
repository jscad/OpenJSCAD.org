include('sub/subModule.jscad')
function main () {
  var cube = CSG.cube()
  return difference(cube, subsphere())
}
