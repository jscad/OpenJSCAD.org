import * as geom2 from '../../../geometries/geom2/index.js'
import boolean from './martinez.js'
import {
  INTERSECTION,
  DIFFERENCE,
  UNION
} from './operation.js'

const toMartinez = (geometry) => {
  const outlines = geom2.toOutlines(geometry)
  outlines.forEach((outline) => {
    // Martinez expects first point == last point
    outline.push(outline[0])
  })
  return outlines
}

const fromMartinez = (outlines) => {
  if (outlines) {
    return geom2.fromOutlines(outlines.flat())
  } else {
    return geom2.create()
  }
}

export const union = (subject, clipping) => {
  const g1 = toMartinez(subject)
  const g2 = toMartinez(clipping)
  const out = boolean(g1, g2, UNION)
  return fromMartinez(out)
}

export const diff = (subject, clipping) => {
  const g1 = toMartinez(subject)
  const g2 = toMartinez(clipping)
  const out = boolean(g1, g2, DIFFERENCE)
  return fromMartinez(out)
}

export const intersection = (subject, clipping) => {
  const g1 = toMartinez(subject)
  const g2 = toMartinez(clipping)
  const out = boolean(g1, g2, INTERSECTION)
  return fromMartinez(out)
}
