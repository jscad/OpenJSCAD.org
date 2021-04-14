// not that API is injected so it is independant of implementation ! (vanilla vs vtree)
function main (api) {
  const { cube, sphere, difference, intersection, union, scale, rotate, translate } = api

  function foo () {
    return [
      cube(),
      translate([13, 0, 0], cube()),
      sphere({ fn: 128 })
    ]
  }

  return [
    foo(),
    cube(),
    translate([13, 0, 0], cube()),
    translate([0, 0, 2], sphere()),
    union(cube(), sphere()),
    sphere({ fn: 128 })
  ]
}

module.exports = main
