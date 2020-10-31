export = vectorText;
/** Represents a character as segments
* @typedef {Object} VectorCharObject
* @property {Float} width - character width
* @property {Float} height - character height (uppercase)
* @property {Array} segments - character segments [[[x, y], ...], ...]
*/
/** Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
* if one character is not supported it is replaced by a question mark.
* @param {Object|String} [options] - options for construction or ascii string
* @param {Float} [options.xOffset=0] - x offset
* @param {Float} [options.yOffset=0] - y offset
* @param {Float} [options.height=21] - font size (uppercase height)
* @param {Float} [options.lineSpacing=1.4] - line spacing expressed as a percentage of font size
* @param {Float} [options.letterSpacing=1] - extra letter spacing expressed as a percentage of font size
* @param {String} [options.align='left'] - multi-line text alignement: left, center or right
* @param {Float} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
* @param {String} [options.input='?'] - ascii string (ignored/overwrited if provided as seconds parameter)
* @param {String} [text='?'] - ascii string
* @returns {Array} characters segments [[[x, y], ...], ...]
* @alias module:modeling/text.vectorText
*
* @example
* let textSegments = vectorText()
* or
* let textSegments = vectorText('OpenJSCAD')
* or
* let textSegments = vectorText({ yOffset: -50 }, 'OpenJSCAD')
* or
* let textSegments = vectorText({ yOffset: -80, input: 'OpenJSCAD' })
*/
declare function vectorText(options?: any | string, text?: string): any[];
declare namespace vectorText {
    export { VectorCharObject };
}
/**
 * Represents a character as segments
 */
type VectorCharObject = {
    /**
     * - character width
     */
    width: any;
    /**
     * - character height (uppercase)
     */
    height: any;
    /**
     * - character segments [[[x, y], ...], ...]
     */
    segments: any[];
};
