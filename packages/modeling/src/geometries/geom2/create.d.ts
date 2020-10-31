export = create;
/**
 * Represents a 2D geometry consisting of a list of sides.
 * @typedef {Object} geom2
 * @property {Array} sides - list of sides, each side containing two points
 * @property {mat4} transforms - transforms to apply to the sides, see transform()
 */
/**
 * Create a new 2D geometry composed of unordered sides (two connected points).
 * @param {Array} [sides] - list of sides where each side is an array of two points
 * @returns {geom2} a new empty geometry
 * @alias module:modeling/geometries/geom2.create
 */
declare function create(sides?: any[]): geom2;
declare namespace create {
    export { geom2 };
}
/**
 * Represents a 2D geometry consisting of a list of sides.
 */
type geom2 = {
    /**
     * - list of sides, each side containing two points
     */
    sides: any[];
    /**
     * - transforms to apply to the sides, see transform()
     */
    transforms: any;
};
