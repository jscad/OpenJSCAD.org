import geom2 from '../../../geometries/geom2/index.js'
import boolean from './martinez.js'
import {
  INTERSECTION,
  DIFFERENCE,
  UNION
} from './operation.js'

export const union = (subject, clipping) => {
  const g1 = geom2.toOutlines(subject)
  const g2 = geom2.toOutlines(clipping)
  const out = boolean(g1, g2, UNION)
  return geom2.fromOutlines(out[0])
}

export const diff = (subject, clipping) => {
  const g1 = geom2.toOutlines(subject)
  const g2 = geom2.toOutlines(clipping)
  const out = boolean(g1, g2, DIFFERENCE)
  return geom2.fromOutlines(out[0])
}

export const intersection = (subject, clipping) => {
  const g1 = geom2.toOutlines(subject)
  const g2 = geom2.toOutlines(clipping)
  const out = boolean(g1, g2, INTERSECTION)
  return geom2.fromOutlines(out[0])
}
