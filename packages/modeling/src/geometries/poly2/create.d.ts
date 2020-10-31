export = create;
/**
 * Represents a convex 2D polygon consisting of a list of ordered vertices.
 * @typedef {Object} poly2
 * @property {Array} vertices - list of ordered vertices (2D)
 */
/**
 * Creates a new polygon with initial values.
 *
 * @param {Array} [vertices] - list of vertices (2D)
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.create
 *
 * @example
 * let polygon = create()
 */
declare function create(vertices?: any[]): poly2;
declare namespace create {
    export { poly2 };
}
/**
 * Represents a convex 2D polygon consisting of a list of ordered vertices.
 */
type poly2 = {
    /**
     * - list of ordered vertices (2D)
     */
    vertices: any[];
};
