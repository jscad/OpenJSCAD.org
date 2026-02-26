/**
 * Direct benchmark for splitPolygonByPlane - the hot path in boolean operations
 *
 * Run with: node --expose-gc bench/splitPolygon.bench.js
 */

const { sphere, torus } = require('../src/primitives')
const splitPolygonByPlane = require('../src/operations/booleans/trees/splitPolygonByPlane')
const poly3 = require('../src/geometries/poly3')
const plane = require('../src/maths/plane')

// Benchmark helper
const benchmark = (name, setup, fn, iterations = 1000) => {
  const data = setup()

  // Force GC if available
  if (global.gc) global.gc()

  // Warmup
  for (let i = 0; i < 100; i++) fn(data)

  if (global.gc) global.gc()
  const heapBefore = process.memoryUsage().heapUsed

  const start = process.hrtime.bigint()
  for (let i = 0; i < iterations; i++) {
    fn(data)
  }
  const end = process.hrtime.bigint()

  if (global.gc) global.gc()
  const heapAfter = process.memoryUsage().heapUsed

  const totalNs = Number(end - start)
  const avgNs = totalNs / iterations
  const avgUs = avgNs / 1000
  const heapDelta = (heapAfter - heapBefore) / 1024

  console.log(`${name.padEnd(50)} ${avgUs.toFixed(2).padStart(8)} µs/op  heap: ${heapDelta > 0 ? '+' : ''}${heapDelta.toFixed(0)} KB`)
  return avgUs
}

console.log('='.repeat(80))
console.log('splitPolygonByPlane Direct Benchmark')
console.log('='.repeat(80))
console.log()

// Get polygons from a sphere
const testSphere = sphere({ radius: 5, segments: 32 })
const polygons = testSphere.polygons

console.log(`Test geometry: sphere(32) with ${polygons.length} polygons`)
console.log(`Average vertices per polygon: ${(polygons.reduce((sum, p) => sum + p.vertices.length, 0) / polygons.length).toFixed(1)}`)
console.log()

// Test 1: Coplanar case (fast path - type 0 or 1)
console.log('--- Coplanar Cases (fast path) ---')
benchmark('coplanar-front (type 0)', () => {
  const polygon = polygons[0]
  const pplane = poly3.plane(polygon)
  return { polygon, splane: pplane }
}, (data) => splitPolygonByPlane(data.splane, data.polygon), 10000)

// Test 2: Entirely front (type 2)
console.log()
console.log('--- One-side Cases (no split needed) ---')
benchmark('entirely front (type 2)', () => {
  const polygon = polygons[0]
  // Create a plane far behind the polygon
  const splane = [0, 0, 1, -100]
  return { polygon, splane }
}, (data) => splitPolygonByPlane(data.splane, data.polygon), 10000)

benchmark('entirely back (type 3)', () => {
  const polygon = polygons[0]
  // Create a plane far in front of the polygon
  const splane = [0, 0, 1, 100]
  return { polygon, splane }
}, (data) => splitPolygonByPlane(data.splane, data.polygon), 10000)

// Test 3: Spanning case (type 4) - this is where allocations hurt
console.log()
console.log('--- Spanning Cases (allocations happen here) ---')
benchmark('spanning split (type 4) - triangle', () => {
  // A triangle that will be split
  const polygon = poly3.create([[0, 0, 0], [10, 0, 0], [5, 10, 0]])
  const splane = [1, 0, 0, 5] // Split down the middle
  return { polygon, splane }
}, (data) => splitPolygonByPlane(data.splane, data.polygon), 10000)

benchmark('spanning split (type 4) - quad', () => {
  const polygon = poly3.create([[0, 0, 0], [10, 0, 0], [10, 10, 0], [0, 10, 0]])
  const splane = [1, 0, 0, 5]
  return { polygon, splane }
}, (data) => splitPolygonByPlane(data.splane, data.polygon), 10000)

benchmark('spanning split (type 4) - hexagon', () => {
  const polygon = poly3.create([
    [0, 0, 0], [5, 0, 0], [7.5, 4, 0],
    [5, 8, 0], [0, 8, 0], [-2.5, 4, 0]
  ])
  const splane = [1, 0, 0, 2.5]
  return { polygon, splane }
}, (data) => splitPolygonByPlane(data.splane, data.polygon), 10000)

// Test 4: Realistic mix from actual boolean operation
console.log()
console.log('--- Realistic Mix (simulating boolean op) ---')
benchmark('mixed types from sphere polygons', () => {
  // Use multiple polygons with a plane that hits various cases
  const splane = [0.577, 0.577, 0.577, 0] // Diagonal plane through origin
  return { polygons: polygons.slice(0, 50), splane }
}, (data) => {
  let spanning = 0
  for (const polygon of data.polygons) {
    const result = splitPolygonByPlane(data.splane, polygon)
    if (result.type === 4) spanning++
  }
  return spanning
}, 1000)

// Measure allocation overhead specifically
console.log()
console.log('--- Allocation Stress Test ---')
benchmark('10k spanning splits (allocation heavy)', () => {
  const polygon = poly3.create([[0, 0, 0], [10, 0, 0], [10, 10, 0], [0, 10, 0]])
  const splane = [1, 0, 0, 5]
  return { polygon, splane }
}, (data) => {
  for (let i = 0; i < 100; i++) {
    splitPolygonByPlane(data.splane, data.polygon)
  }
}, 100)

console.log()
console.log('='.repeat(80))
console.log('Benchmark complete')
console.log()
console.log('Note: "spanning split" cases allocate the most:')
console.log('  - result object { type, front, back }')
console.log('  - vertexIsBack[] array')
console.log('  - frontvertices[] and backvertices[] arrays')
console.log('  - Two new poly3 objects (front and back)')
