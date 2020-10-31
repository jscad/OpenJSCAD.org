export = create;
/**
 * Represents a unbounded line in 3D space, positioned at a point of origin.
 * A line is parametrized by a point of origin and a directional vector.
 * The array contents are two 3D vectors; origin and directional vector.
 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
 * @typedef {Array} line3
 */
/**
 * Create an unbounded 3D line, positioned at 0,0,0 and lying on the X axis.
 *
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.create
 */
declare function create(): any[];
declare namespace create {
    export { line3 };
}
/**
 * Represents a unbounded line in 3D space, positioned at a point of origin.
 * A line is parametrized by a point of origin and a directional vector.
 * The array contents are two 3D vectors; origin and directional vector.
 */
type line3 = any[];
