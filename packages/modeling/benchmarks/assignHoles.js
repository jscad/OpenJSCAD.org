// From the repository root: node packages/modeling/benchmarks/assignHoles.js [count] [row|grid]
const assert = require('assert')
const { performance } = require('perf_hooks')
const { geom2 } = require('../src/geometries')
const { extrudeLinear } = require('../src/operations/extrusions')
const { measureVolume } = require('../src/measurements')
const assignHoles = require('../src/operations/extrusions/earcut/assignHoles')

const count = Number(process.argv[2] || 128)
const layout = process.argv[3] || 'grid'
assert(Number.isSafeInteger(count) && count > 0)
assert(layout === 'row' || layout === 'grid')
const columns = layout === 'row' ? count : Math.ceil(Math.sqrt(count))
const segments = 32
const sides = []
for (let i = 0; i < count; i++) {
  const cx = (i % columns) * 12
  const cy = Math.floor(i / columns) * 12
  for (const [radius, winding] of [[4, 1], [2, -1]]) {
    const points = Array.from({ length: segments }, (_, n) => {
      const angle = winding * 2 * Math.PI * n / segments
      return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
    })
    points.forEach((point, n) => sides.push([point, points[(n + 1) % points.length]]))
  }
}
const geometry = geom2.create(sides)
const hierarchy = assignHoles(geometry)
assert.strictEqual(hierarchy.length, count)
assert(hierarchy.every(({ solid, holes }) => solid.length === segments && holes.length === 1 && holes[0].length === segments))

const median = (operation) => {
  const warmups = count <= 32 ? 100 : count <= 128 ? 30 : 12
  const repetitions = count === 1 ? 30 : count <= 32 ? 3 : 1
  for (let i = 0; i < warmups; i++) operation()
  const samples = []
  for (let i = 0; i < 13; i++) {
    const start = performance.now()
    for (let repeat = 0; repeat < repetitions; repeat++) operation()
    samples.push((performance.now() - start) / repetitions)
  }
  return samples.sort((a, b) => a - b)[6]
}
const assignmentMs = median(() => assignHoles(geometry))
const extrusionMs = median(() => extrudeLinear({ height: 2 }, geometry))
const extrusion = extrudeLinear({ height: 2 }, geometry)
const expectedVolume = count * 2 * (4 * 4 - 2 * 2) * segments * Math.sin(2 * Math.PI / segments) / 2
assert(Math.abs(measureVolume(extrusion) - expectedVolume) < expectedVolume * 1e-8)
console.log(JSON.stringify({ count, layout, assignmentMs, extrusionMs }))
