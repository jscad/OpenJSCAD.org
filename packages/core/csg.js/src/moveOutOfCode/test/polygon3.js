import test from 'ava'
import {CSG} from '../csg'
import {CAG} from '../csg'

function planeEquals (t, observed, expected) {
  t.is(observed.w,expected.w)
  return t.deepEqual(observed.normal, expected.normal)
}

function vertexEquals (t, observed, expected) {
  const obs = [observed.pos._x, observed.pos._y, observed.pos._z]
  return t.deepEqual(obs, expected)
}

function vector3Equals (t, observed, expected) {
  const obs = [observed._x, observed._y, observed._z]
  return t.deepEqual(obs, expected)
}

test('CSG.Polygon3 constructor creates a 3D polygon', t => {
  const Vertex3 = CSG.Vertex
  const Vector3 = CSG.Vector3D
  const Polygon = CSG.Polygon

  const vertices = [
    new Vertex3(new Vector3([0, 0, 0])), // you gotta be kidding me ...WAY too complex for what it is
    new Vertex3(new Vector3([0, 10, 0])),
    new Vertex3(new Vector3([0, 10, 10]))
  ]
  let observed = new Polygon(vertices)

  t.deepEqual(observed.vertices.length, 3)
  vertexEquals(t, observed.vertices[0], [0, 0, 0])
  vertexEquals(t, observed.vertices[1], [0, 10, 0])
  vertexEquals(t, observed.vertices[2], [0, 10, 10])
  vector3Equals(t, observed.plane.normal, [1, 0, 0])

  const shared = CSG.Polygon.defaultShared
  const plane = CSG.Plane.fromVector3Ds(vertices[0].pos,vertices[1].pos,vertices[2].pos)

  observed = new Polygon(vertices,shared,plane)

  t.deepEqual(observed.vertices.length, 3)
  vertexEquals(t, observed.vertices[0], [0, 0, 0])
  vertexEquals(t, observed.vertices[1], [0, 10, 0])
  vertexEquals(t, observed.vertices[2], [0, 10, 10])
  vector3Equals(t, observed.plane.normal, [1, 0, 0])
  t.is(observed.checkIfConvex(),true)

  //let astr = observed.toString()

// check that generic objects are possible via JSON
  let oo = JSON.parse(JSON.stringify(observed))
  let op = Polygon.fromObject(oo)

  t.deepEqual(oo,JSON.parse(JSON.stringify(op)))
})

test('CSG.Polygon3 createsFromPoints a 3D polygon', t => {
  const Vertex3 = CSG.Vertex
  const Vector3 = CSG.Vector3D
  const Polygon = CSG.Polygon

  const points = [
    [0,  0, 0],
    [0, 10, 0],
    [0, 10, 10]
  ]
  const vectors = [
    new Vector3([0,  0, 0]),
    new Vector3([0, 10, 0]),
    new Vector3([0, 10, 10])
  ]

  let observed = Polygon.createFromPoints(points)

  t.deepEqual(observed.vertices.length, 3)
  vertexEquals(t, observed.vertices[0], [0, 0, 0])
  vertexEquals(t, observed.vertices[1], [0, 10, 0])
  vertexEquals(t, observed.vertices[2], [0, 10, 10])

  const shared = CSG.Polygon.defaultShared
  const plane = CSG.Plane.fromVector3Ds(vectors[0],vectors[1],vectors[2])

  observed = Polygon.createFromPoints(points,shared,plane)

  t.deepEqual(observed.vertices.length, 3)
  vertexEquals(t, observed.vertices[0], [0, 0, 0])
  vertexEquals(t, observed.vertices[1], [0, 10, 0])
  vertexEquals(t, observed.vertices[2], [0, 10, 10])
  t.is(observed.checkIfConvex(),true)

// and excercise features
  const volume   = observed.getSignedVolume()
  const area     = observed.getArea()
  const features = observed.getTetraFeatures(['volume','area','junk'])
  const bsphere  = observed.boundingSphere()
  const bbox     = observed.boundingBox()

  t.is(volume,0)
  t.is(area,50)
  t.deepEqual(features,[0,50])
  t.deepEqual(bsphere,[new Vector3([0,5,5]),7.0710678118654755])
  t.deepEqual(bbox,[new Vector3([0,0,0]),new Vector3([0,10,10])])

// create a non-convex polygon and test
// Note: points are created CCW about the Z (normal)
  const points2ccw = [
    [  0,  0,  3],
    [ 10, 10,  3],
    [  0,  5,  3],
    [-10, 10,  3],
  ]
  const points2cw = [
    [  0,  0,  3],
    [-10, 10,  3],
    [  0,  5,  3],
    [ 10, 10,  3],
  ]
  observed = Polygon.createFromPoints(points2ccw)

  t.deepEqual(observed.vertices.length, 4)
  t.is(observed.checkIfConvex(),false)

  let p = observed.vertices[1].pos
  let c = observed.vertices[2].pos
  let n = observed.vertices[3].pos
  let m = observed.plane.normal
  t.is(Polygon.isConvexPoint(p,c,n,m),false)
  t.is(Polygon.isStrictlyConvexPoint(p,c,n,m),false)
})

test('CSG.Polygon3 transformations', t => {
  const Vertex3 = CSG.Vertex
  const Vector3 = CSG.Vector3D
  const Polygon = CSG.Polygon

  const points = [
    [0,  0, 0],
    [0, 10, 0],
    [0, 10, 10]
  ]
  let original = Polygon.createFromPoints(points)

  t.deepEqual(original.vertices.length, 3)
  vertexEquals(t, original.vertices[0], [0, 0, 0])
  vertexEquals(t, original.vertices[1], [0, 10, 0])
  vertexEquals(t, original.vertices[2], [0, 10, 10])

  let flipped = original.flipped()
  let fplane  = original.plane.flipped()

  t.deepEqual(flipped.vertices.length, 3)
  vertexEquals(t, flipped.vertices[0], [0, 10, 10])
  vertexEquals(t, flipped.vertices[1], [0, 10, 0])
  vertexEquals(t, flipped.vertices[2], [0, 0, 0])
  planeEquals(t, flipped.plane, fplane)

  let tpolygon = original.translate([10,10,10])

  t.deepEqual(tpolygon.vertices.length, 3)
  vertexEquals(t, tpolygon.vertices[0], [10, 10, 10])
  vertexEquals(t, tpolygon.vertices[1], [10, 20, 10])
  vertexEquals(t, tpolygon.vertices[2], [10, 20, 20])

  let matrix = CSG.Matrix4x4.rotationX(90)
  matrix = matrix.multiply(CSG.Matrix4x4.translation([-10,0,-10]))

  tpolygon = original.transform(matrix)

  t.deepEqual(tpolygon.vertices.length, 3)
  vertexEquals(t, tpolygon.vertices[0], [-10,   0, -10])
  // hard to test near zero vertexEquals(t, tpolygon.vertices[1], [-10,   0,   0])
  vertexEquals(t, tpolygon.vertices[2], [-10, -10,   0])
})

test('CSG.Polygon3 conversions to CAG CSG', t => {
  const Vertex3 = CSG.Vertex
  const Vector3 = CSG.Vector3D
  const Polygon = CSG.Polygon

  const points = [
    [ 0,  0, 0],
    [ 0, 10, 0],
    [10, 10, 10]
  ]
  let original = Polygon.createFromPoints(points)

  t.deepEqual(original.vertices.length, 3)
  vertexEquals(t, original.vertices[0], [ 0,  0,  0])
  vertexEquals(t, original.vertices[1], [ 0, 10,  0])
  vertexEquals(t, original.vertices[2], [10, 10, 10])

  let plane = new CSG.Plane(new Vector3(0, 0, 1), 0)
  let onb = new CSG.OrthoNormalBasis(plane)

  let acag = original.projectToOrthoNormalBasis(onb)

  t.deepEqual(acag,CAG.fromPointsNoCheck([[0,10],[0,0],[10,10]]))

  let acsg = original.extrude(new Vector3(0,0,20))

  t.is(acsg.polygons.length,5)
  t.deepEqual(acsg.polygons[0],original)

  let tpoly = acsg.polygons[4]

  t.is(tpoly.vertices.length, 3)
  vertexEquals(t, tpoly.vertices[0], [10,10,30])
  vertexEquals(t, tpoly.vertices[1], [ 0,10,20])
  vertexEquals(t, tpoly.vertices[2], [ 0, 0,20])
})

// FIXME how to test this? CSG = solidFromSlices(options)

test('CSG.Polygon.Shared construction', t => {
  let s1 = new CSG.Polygon.Shared( [1,2,3,4] )

  t.deepEqual(s1.color,[1,2,3,4])

  let o2 = {color: [4,3,2,1] }
  let s2 = CSG.Polygon.Shared.fromObject(o2)

  t.deepEqual(s2.color,[4,3,2,1])

  let s3 = CSG.Polygon.Shared.fromColor(9,8,7,6)

  t.deepEqual(s3.color,[9,8,7,6])

  let s4 = CSG.Polygon.Shared.fromColor([6,7,8,9])

  t.deepEqual(s4.color,[6,7,8,9])

// check that generic objects are possible via JSON
  let o5 = JSON.parse(JSON.stringify(s4))
  let s5 = CSG.Polygon.Shared.fromObject(o5)

  t.deepEqual(o5,JSON.parse(JSON.stringify(s5)))

  let s6 = CSG.Polygon.Shared.fromColor([4,3,2])

  t.deepEqual(s6.color,[4,3,2,1])

// check that fromObject works without a color
  let o7 = new CSG.Polygon.Shared()
  let s7 = CSG.Polygon.Shared.fromObject(o7)

  t.deepEqual(o7, s7)

// check member functions
  let h1 = s1.getHash()
  let h2 = s2.getHash()
  let h3 = s3.getHash()
  let h4 = s4.getHash()

  t.is(h1,'1/2/3/4')
  t.is(h2,'4/3/2/1')
  t.is(h3,'9/8/7/6')
  t.is(h4,'6/7/8/9')

  let t1 = s1.getTag()
  let t2 = s2.getTag()
  let t3 = s3.getTag()
  let t4 = s4.getTag()

  t.is(t1,1)
  t.is(s1.tag,1)
  t.is(s1.getTag(),1)

  t.is(t4,4)
  t.is(s4.tag,4)
  t.is(s4.getTag(),4)

})

