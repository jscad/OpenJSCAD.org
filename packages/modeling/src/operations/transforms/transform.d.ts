export = transform;
/**
 * Transform the given geometries using the given matrix.
 * @param {mat4} matrix - a transformation matrix
 * @param {...Object} geometries - the geometries to transform
 * @return {Object|Array} the transformed geometry, or a list of transformed geometries
 * @alias module:modeling/transforms.transform
 *
 * @example
 * const newsphere = transform(mat4.rotateX(Math.PI/4), sphere())
 */
declare function transform(matrix: any, ...objects: any[]): any | any[];
