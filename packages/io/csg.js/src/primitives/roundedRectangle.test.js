const test = require('ava')

const {roundedRectangle} = require('./index')

const geom2 = require('../geometry/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

test('roundedRectangle (defaults)', t => {
  const exp = [
    new Float32Array([ 1, 0.800000011920929 ]),
    new Float32Array([ 0.9847759008407593, 0.8765367269515991 ]),
    new Float32Array([ 0.941421389579773, 0.941421389579773 ]),
    new Float32Array([ 0.8765367269515991, 0.9847759008407593 ]),
    new Float32Array([ 0.800000011920929, 1 ]),
    new Float32Array([ -0.800000011920929, 1 ]),
    new Float32Array([ -0.8765367269515991, 0.9847759008407593 ]),
    new Float32Array([ -0.941421389579773, 0.941421389579773 ]),
    new Float32Array([ -0.9847759008407593, 0.8765367269515991 ]),
    new Float32Array([ -1, 0.800000011920929 ]),
    new Float32Array([ -1, -0.800000011920929 ]),
    new Float32Array([ -0.9847759008407593, -0.8765367269515991 ]),
    new Float32Array([ -0.941421389579773, -0.941421389579773 ]),
    new Float32Array([ -0.8765367269515991, -0.9847759008407593 ]),
    new Float32Array([ -0.800000011920929, -1 ]),
    new Float32Array([ 0.800000011920929, -1 ]),
    new Float32Array([ 0.8765367269515991, -0.9847759008407593 ]),
    new Float32Array([ 0.941421389579773, -0.941421389579773 ]),
    new Float32Array([ 0.9847759008407593, -0.8765367269515991 ]),
    new Float32Array([ 1, -0.800000011920929 ])
  ]
  const geometry = roundedRectangle()
  const obs = geom2.toPoints(geometry)

  t.deepEqual(obs.length, 20)
  t.true(comparePoints(obs, exp))
})

test('roundedRectangle (options)', t => {
  // test center
  let geometry = roundedRectangle({center: [4,5]})
  let obs = geom2.toPoints(geometry)
  let exp = [
    new Float32Array([ 5, 5.800000190734863 ]),
    new Float32Array([ 4.984776020050049, 5.876536846160889 ]),
    new Float32Array([ 4.9414215087890625, 5.9414215087890625 ]),
    new Float32Array([ 4.876536846160889, 5.984776020050049 ]),
    new Float32Array([ 4.800000190734863, 6 ]),
    new Float32Array([ 3.200000047683716, 6 ]),
    new Float32Array([ 3.1234633922576904, 5.984776020050049 ]),
    new Float32Array([ 3.0585787296295166, 5.9414215087890625 ]),
    new Float32Array([ 3.0152242183685303, 5.876536846160889 ]),
    new Float32Array([ 3, 5.800000190734863 ]),
    new Float32Array([ 3, 4.199999809265137 ]),
    new Float32Array([ 3.0152242183685303, 4.123463153839111 ]),
    new Float32Array([ 3.0585787296295166, 4.0585784912109375 ]),
    new Float32Array([ 3.1234633922576904, 4.015223979949951 ]),
    new Float32Array([ 3.200000047683716, 3.999999761581421 ]),
    new Float32Array([ 4.800000190734863, 3.999999761581421 ]),
    new Float32Array([ 4.876536846160889, 4.015223979949951 ]),
    new Float32Array([ 4.9414215087890625, 4.0585784912109375 ]),
    new Float32Array([ 4.984776020050049, 4.123463153839111 ]),
    new Float32Array([ 5, 4.199999809265137 ])
  ]
  t.deepEqual(obs.length, 20)
  t.true(comparePoints(obs, exp))

  // test size
  geometry = roundedRectangle({size: [5, 3]})
  obs = geom2.toPoints(geometry)
  exp = [
    new Float32Array([ 5, 2.799999952316284 ]),
    new Float32Array([ 4.984776020050049, 2.8765366077423096 ]),
    new Float32Array([ 4.9414215087890625, 2.9414212703704834 ]),
    new Float32Array([ 4.876536846160889, 2.9847757816314697 ]),
    new Float32Array([ 4.800000190734863, 3 ]),
    new Float32Array([ -4.800000190734863, 3 ]),
    new Float32Array([ -4.876536846160889, 2.9847757816314697 ]),
    new Float32Array([ -4.9414215087890625, 2.9414212703704834 ]),
    new Float32Array([ -4.984776020050049, 2.8765366077423096 ]),
    new Float32Array([ -5, 2.799999952316284 ]),
    new Float32Array([ -5, -2.799999952316284 ]),
    new Float32Array([ -4.984776020050049, -2.8765366077423096 ]),
    new Float32Array([ -4.9414215087890625, -2.9414212703704834 ]),
    new Float32Array([ -4.876536846160889, -2.9847757816314697 ]),
    new Float32Array([ -4.800000190734863, -3 ]),
    new Float32Array([ 4.800000190734863, -3 ]),
    new Float32Array([ 4.876536846160889, -2.9847757816314697 ]),
    new Float32Array([ 4.9414215087890625, -2.9414212703704834 ]),
    new Float32Array([ 4.984776020050049, -2.8765366077423096 ]),
    new Float32Array([ 5, -2.799999952316284 ])
  ]
  t.deepEqual(obs.length, 20)
  t.true(comparePoints(obs, exp))

  // test roundRadius
  geometry = roundedRectangle({size: [5, 3], roundRadius: 2})
  obs = geom2.toPoints(geometry)
  exp = [
    new Float32Array([ 5, 1 ]),
    new Float32Array([ 4.847759246826172, 1.765366792678833 ]),
    new Float32Array([ 4.41421365737915, 2.4142136573791504 ]),
    new Float32Array([ 3.765366792678833, 2.8477590084075928 ]),
    new Float32Array([ 3, 3 ]),
    new Float32Array([ -3, 3 ]),
    new Float32Array([ -3.765366792678833, 2.8477590084075928 ]),
    new Float32Array([ -4.41421365737915, 2.4142136573791504 ]),
    new Float32Array([ -4.847759246826172, 1.765366792678833 ]),
    new Float32Array([ -5, 1 ]),
    new Float32Array([ -5, -1 ]),
    new Float32Array([ -4.847759246826172, -1.765366792678833 ]),
    new Float32Array([ -4.41421365737915, -2.4142136573791504 ]),
    new Float32Array([ -3.765366792678833, -2.8477590084075928 ]),
    new Float32Array([ -3, -3 ]),
    new Float32Array([ 3, -3 ]),
    new Float32Array([ 3.765366792678833, -2.8477590084075928 ]),
    new Float32Array([ 4.41421365737915, -2.4142136573791504 ]),
    new Float32Array([ 4.847759246826172, -1.765366792678833 ]),
    new Float32Array([ 5, -1 ])
  ]
  t.deepEqual(obs.length, 20)
  t.true(comparePoints(obs, exp))

  // test segments
  geometry = roundedRectangle({size: [5, 3], roundRadius: 2, segments: 64})
  obs = geom2.toPoints(geometry)
  t.deepEqual(obs.length, 68)
})
