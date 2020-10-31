export = create;
/**
 * Represents a 3D geometry consisting of a list of edges.
 * @typedef {Object} slice
 * @property {Array} edges - list of edges, each edge containing two points (3D)
 */
/**
 * Creates a new empty slice.
 *
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.create
 */
declare function create(edges: any): slice;
declare namespace create {
    export { slice };
}
/**
 * Represents a 3D geometry consisting of a list of edges.
 */
type slice = {
    /**
     * - list of edges, each edge containing two points (3D)
     */
    edges: any[];
};
