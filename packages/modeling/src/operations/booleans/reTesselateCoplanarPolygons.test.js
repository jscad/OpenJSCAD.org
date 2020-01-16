const test = require('ava')

const { degToRad } = require('../../math/utils')

const { mat4 } = require('../../math')

const { geom3, poly3 } = require('../../geometry')

const reTesselateCoplanarPolygons = require('./reTesselateCoplanarPolygons')

const translatePoly3 = (offsets, polygon) => {
  const matrix = mat4.fromTranslation(offsets)
  return poly3.transform(matrix, polygon)
}

const rotatePoly3 = (angles, polygon) => {
  const matrix = mat4.fromTaitBryanRotation(degToRad(angles[0]), degToRad(angles[1]), degToRad(angles[2]))
  return poly3.transform(matrix, polygon)
}

test('retessellateCoplanarPolygons: should not merge independent polygons', (t) => {
  const polyA = poly3.fromPoints([[0, 2, 0], [-2, 0, 0], [2, 0, 0]])
  const polyB = poly3.fromPoints([[0, -2, 1], [2, 0, 1], [-2, 0, 1]])

  let obs = reTesselateCoplanarPolygons([polyA, polyB])
  t.is(obs.length, 2)

  const polyC = poly3.fromPoints([[0, -3, 0], [2, -1, 0], [-2, -1, 0]])

  obs = reTesselateCoplanarPolygons([polyA, polyC])
  t.is(obs.length, 2)

  const polyD = poly3.fromPoints([[0, 2, 0], [4, -2, 0], [4, 2, 0]])

  obs = reTesselateCoplanarPolygons([polyA, polyD])
  t.is(obs.length, 2)
})

test('retessellateCoplanarPolygons: should merge coplanar polygons', (t) => {
  const polyA = poly3.fromPoints([[-5, -5, 0], [5, -5, 0], [5, 5, 0], [-5, 5, 0]])
  const polyB = poly3.fromPoints([[5, -5, 0], [8, 0, 0], [5, 5, 0]])
  const polyC = poly3.fromPoints([[-5, 5, 0], [-8, 0, 0], [-5, -5, 0]])
  const polyD = poly3.fromPoints([[-5, 5, 0], [5, 5, 0], [0, 8, 0]])
  const polyE = poly3.fromPoints([[5, -5, 0], [-5, -5, 0], [0, -8, 0]])

  // combine polygons in each direction
  let obs = reTesselateCoplanarPolygons([polyA, polyB])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyA, polyC])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyA, polyD])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyA, polyE])
  t.is(obs.length, 1)

  // combine several polygons in each direction
  obs = reTesselateCoplanarPolygons([polyB, polyA, polyC])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyC, polyA, polyB])
  t.is(obs.length, 1)

  obs = reTesselateCoplanarPolygons([polyD, polyA, polyE])
  t.is(obs.length, 1)
  obs = reTesselateCoplanarPolygons([polyE, polyA, polyD])
  t.is(obs.length, 1)

  // combine all polygons
  obs = reTesselateCoplanarPolygons([polyA, polyB, polyC, polyD, polyE])
  t.is(obs.length, 1)

  // now rotate everything and do again
  let polyH = rotatePoly3([-45, -45, -45], polyA)
  let polyI = rotatePoly3([-45, -45, -45], polyB)
  let polyJ = rotatePoly3([-45, -45, -45], polyC)
  let polyK = rotatePoly3([-45, -45, -45], polyD)
  let polyL = rotatePoly3([-45, -45, -45], polyE)

  obs = reTesselateCoplanarPolygons([polyH, polyI, polyJ, polyK, polyL])
  t.is(obs.length, 1)

  // now translate everything and do again
  polyH = translatePoly3([-15, -15, -15], polyA)
  polyI = translatePoly3([-15, -15, -15], polyB)
  polyJ = translatePoly3([-15, -15, -15], polyC)
  polyK = translatePoly3([-15, -15, -15], polyD)
  polyL = translatePoly3([-15, -15, -15], polyE)

  obs = reTesselateCoplanarPolygons([polyH, polyI, polyJ, polyK, polyL])
  t.is(obs.length, 1)
})

test('retessellateCoplanarPolygons: should merge paralell edges of coplanar polygons', (t) => {
  const polyA = poly3.fromPoints([[0, 0, 0], [0, 4, 0], [-4, 0, 0]])
  const polyB = poly3.fromPoints([[0, 0, 0], [-4, 0, 0], [0, -4, 0]])

  let obs = reTesselateCoplanarPolygons([polyA, polyB])
  t.is(obs.length, 1)
  t.is(obs[0].vertices.length, 3) // 3 + 3 - 2 (merged poly) - 1 (merged edge)

  const polyC = poly3.fromPoints([[0, 0, 0], [4, 0, 0], [0, 4, 0]])
  const polyD = poly3.fromPoints([[0, 0, 0], [0, -4, 0], [4, 0, 0]])

  obs = reTesselateCoplanarPolygons([polyC, polyD])
  t.is(obs.length, 1)
  t.is(obs[0].vertices.length, 3) // 3 + 3 - 2 (merged poly) - 1 (merged edge)

  const polyE = poly3.fromPoints([[-4, 0, 0], [4, 0, 0], [4, 4, 0], [-4, 4, 0]])
  const polyF = poly3.fromPoints([[4, 0, 0], [-4, 0, 0], [-4, -4, 0], [4, -4, 0]])

  obs = reTesselateCoplanarPolygons([polyE, polyF])
  t.is(obs.length, 1)
  t.is(obs[0].vertices.length, 4) // 4 + 4 - 2 (merged poly) - 2 (merged edges)
})

test('retessellateCoplanarPolygons: should correctly merge polygons', (t) => {
  // 34 polygons, all lying flat on Z plane
  let shape1 = geom3.fromPoints([
    [ [585.9650675011303, 654.0333333399891, 0], [585.9650675011303, 0, 0], [1287.9139404296875, 0, 0], ], 
    [ [585.9650675011303, 654.0333333399891, 0], [1287.9139404296875, 0, 0], [1287.9139404296875, 1200, 0], [585.9650675011303, 1200, 0], ], 
    [ [585.9650675011303, 487.06177308554817, 0], [0, 487.06177308554817, 0], [0, 0, 0], [585.9650675011303, 0, 0], ], 
    [ [585.9650675011303, 953.0992486712241, 0], [585.9650675011303, 1200, 0], [569.7829030842556, 1200, 0], ], 
    [ [41.815788313545774, 1161.038587749494, 0], [0, 1200, 0], [0, 1163.7793495535184, 0], ], 
    [ [580.192984433049, 1041.1672975136432, 0], [569.7829030842556, 1200, 0], [399.0792683898784, 1200, 0], ], 
    [ [89.10858823427716, 1116.974028679698, 0], [41.815788313545774, 1161.038587749494, 0], [0, 1163.7793495535184, 0], [0, 1111.133491795949, 0], ], 
    [ [513.8373819542935, 1099.3596856831782, 0], [399.0792683898784, 1200, 0], [363.21825136572335, 1200, 0], ], 
    [ [212.83043043921808, 1001.6975292294348, 0], [89.10858823427716, 1116.974028679698, 0], [0, 1111.133491795949, 0], [0, 683.1732572016322, 0], ], 
    [ [581.0924424726376, 1027.443739895384, 0], [580.192984433049, 1041.1672975136432, 0], [531.96799718878, 1083.4595391987045, 0], ], 
    [ [218.0567931242633, 996.827921854922, 0], [212.83043043921808, 1001.6975292294348, 0], [0, 683.1732572016322, 0], [0, 554.6549147914332, 0], ], 
    [ [493.78635656364474, 1112.7573297261627, 0], [363.21825136572335, 1200, 0], [316.8756808655663, 1200, 0], ], 
    [ [49.1383416291427, 487.06177308554817, 0], [221.18866516331374, 993.9098336745839, 0], [218.0567931242633, 996.827921854922, 0], [0, 554.6549147914332, 0], [0, 487.06177308554817, 0], ], 
    [ [581.9527194048013, 1014.3179913595105, 0], [581.0924424726376, 1027.443739895384, 0], [547.8681436727304, 1065.3288629296528, 0], ], 
    [ [49.1383416291427, 487.06177308554817, 0], [121.3387404549834, 487.06177308554817, 0], [222.00728710207946, 993.1470914635701, 0], [221.18866516331374, 993.9098336745839, 0] ], 
    [ [472.1581827354736, 1123.4231622457141, 0], [316.8756808655663, 1200, 0], [246.57062466362078, 1200, 0], ], 
    [ [218.827738399571, 977.1627252339831, 0], [121.3387404549834, 487.06177308554817, 0], [186.70594798035887, 487.06177308554817, 0], ], 
    [ [582.7833584469377, 1001.6444454540801, 0], [581.9527194048013, 1014.3179913595105, 0], [561.265848751198, 1045.2778985736759, 0], ], 
    [ [217.2505899620678, 953.0992486714372, 0], [186.70594798035887, 487.06177308554817, 0], [217.2505899620678, 487.06177308554817, 0], ], 
    [ [449.3229776573378, 1131.174688124625, 0], [246.57062466362078, 1200, 0], [103.31238340676235, 1200, 0], ], 
    [ [583.5925177127425, 989.2986290648014, 0], [582.7833584469377, 1001.6444454540801, 0], [571.9316202354629, 1023.6497247457753, 0], ], 
    [ [41.815788313545795, 1161.038587749494, 0], [425.6712442587688, 1135.8792779683997, 0], [103.31238340676235, 1200, 0], [0, 1200, 0], ], 
    [ [584.3879190636148, 977.1627252339455, 0], [583.5925177127425, 989.2986290648014, 0], [579.6833292198446, 1000.8144586324776, 0], ], 
    [ [401.6077676964492, 1137.45648744104, 0], [41.815788313545795, 1161.038587749494, 0], [89.1085882342773, 1116.9740286796978, 0], ], 
    [ [299.0498522338729, 1130.7344273136287, 0], [89.1085882342773, 1116.9740286796978, 0], [212.8304304392181, 1001.6975292294347, 0], ], 
    [ [313.539283885475, 1131.6841232033587, 0], [299.0498522338729, 1130.7344273136287, 0], [255.34739172003987, 1065.3288629295075, 0], ], 
    [ [241.94980871197896, 1045.2778985736684, 0], [212.8304304392181, 1001.6975292294347, 0], [218.05679312426327, 996.827921854922, 0], ], 
    [ [327.26313294742744, 1132.5836397171047, 0], [313.539283885475, 1131.6841232033587, 0], [271.2475382041619, 1083.4595391987518, 0], ], 
    [ [231.28391515742027, 1023.6497247458037, 0], [218.05679312426327, 996.827921854922, 0], [221.18866516331377, 993.9098336745839, 0], ], 
    [ [340.3887518543665, 1133.4439458095596, 0], [327.26313294742744, 1132.5836397171047, 0], [289.3782755088521, 1099.3596856831293, 0], ], 
    [ [223.53245031363113, 1000.814458632408, 0], [221.18866516331377, 993.9098336745839, 0], [222.00728710207954, 993.14709146357, 0], ], 
    [ [353.06188489489995, 1134.2745941502255, 0], [340.3887518543665, 1133.4439458095596, 0], [309.429178829119, 1112.7573297260667, 0], ], 
    [ [365.40875752726663, 1135.0838580656036, 0], [353.06188489489995, 1134.2745941502255, 0], [331.0573526576802, 1123.4231622458103, 0], ], 
    [ [377.54441320450195, 1135.879277968397, 0], [365.40875752726663, 1135.0838580656036, 0], [353.89267980570315, 1131.1746881245763, 0], ]
  ])

  let obs = reTesselateCoplanarPolygons(geom3.toPolygons(shape1))
//  obs.forEach((p) => console.log(p.vertices))
  t.is(obs.length, 30)
})
