/*
 * check if a point lies within a convex triangle
 */
export const pointInTriangle = (ax, ay, bx, by, cx, cy, px, py) => (
  (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
      (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
      (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0
)

/*
 * signed area of a triangle
 */
export const area = (p, q, r) => (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y)
