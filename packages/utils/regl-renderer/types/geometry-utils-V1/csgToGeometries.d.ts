export = csgToGeometries;
/**
 * convert a CSG from csg.js to an array of geometries with positions, normals, colors & indices
 * typically used for example to display the csg data in a webgl wiever
 * @param {Array} csgs single or an array of CSG object
 * @param {Object} options options hash
 * @param {Boolean} options.smoothLighting=false set to true if we want to use interpolated vertex normals
 * this creates nice round spheres but does not represent the shape of the actual model
 * @param {Float} options.normalThreshold=0.349066 threshold beyond which to split normals // 20 deg
 * @param {String} options.faceColor='#FF000' hex color
 * @returns {Object} {indices, positions, normals, colors}
 */
declare function csgToGeometries(csgs: any[], options: {
    smoothLighting: boolean;
    normalThreshold: any;
    faceColor: string;
}): any;
