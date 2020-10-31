export = create;
/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * See fromValues().
 * @typedef {Array} mat4
 */
/**
 * Creates a new identity matrix
 *
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.create
 */
declare function create(): any[];
declare namespace create {
    export { mat4 };
}
/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * See fromValues().
 */
type mat4 = any[];
