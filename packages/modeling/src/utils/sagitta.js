/**
 * Calculate the geometric sagitta (deviation depth of a faceted circle).
 *
 * Used to determine the exact structural padding required to avoid mesh artifacts.
 *
 * @param {number} radius - the target radius of the circle or cylinder
 * @param {number} segments - number of segments per full turn
 * @returns {number} the maximum distance from the true circle to the flat facet chord
 */
export const sagitta = (radius, segments) => {
  if (segments <= 0) return 0;
  return radius * (1 - Math.cos(Math.PI / segments));
}
