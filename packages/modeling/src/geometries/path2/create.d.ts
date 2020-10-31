export = create;
/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @typedef {Object} path2
 * @property {Array} points - list of ordered points
 * @property {Boolean} isClosed - true if the path is closed where start and end points are the same
 * @property {mat4} transforms - transforms to apply to the points, see transform()
 */
/**
 * Create an empty, open path.
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.create
 *
 * @example
 * let newpath = create()
 */
declare function create(points: any): path2;
declare namespace create {
    export { path2 };
}
/**
 * Represents a 2D geometry consisting of a list of ordered points.
 */
type path2 = {
    /**
     * - list of ordered points
     */
    points: any[];
    /**
     * - true if the path is closed where start and end points are the same
     */
    isClosed: boolean;
    /**
     * - transforms to apply to the points, see transform()
     */
    transforms: any;
};
