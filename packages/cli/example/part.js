import { ellipsoid } from '@jscad/modeling'

export const createPart = (segments) => {
  const center = [10, 10, 10]

  return ellipsoid({ segments, center })
}
