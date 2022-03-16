// note that API is injected so it is independent of implementation ! (vanilla vs vtree)
const main = (api) => {
  const { cube, sphere, union, translate } = api

  const foo = () => [
    cube(),
    translate([13, 0, 0], cube()),
    sphere({ fn: 128 })
  ]

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
