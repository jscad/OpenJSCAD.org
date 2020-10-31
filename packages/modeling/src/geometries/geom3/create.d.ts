export = create;
/**
 * Represents a 3D geometry consisting of a list of polygons.
 * @typedef {Object} geom3
 * @property {Array} polygons - list of polygons, each polygon containing three or more points
 * @property {Boolean} isRetesselated - true if retesselation has been performed
 * @property {mat4} transforms - transforms to apply to the sides, see transform()
 */
/**
 * Create a new 3D geometry composed of polygons.
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.create
 */
declare function create(polygons: any): geom3;
declare namespace create {
    export { geom3 };
}
/**
 * Represents a 3D geometry consisting of a list of polygons.
 */
type geom3 = {
    /**
     * - list of polygons, each polygon containing three or more points
     */
    polygons: any[];
    /**
     * - true if retesselation has been performed
     */
    isRetesselated: boolean;
    /**
     * - transforms to apply to the sides, see transform()
     */
    transforms: any;
};
