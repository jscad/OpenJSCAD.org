const transform = require('./transform')
const fromTranslation = require('../../math/mat4/fromTranslation')

/** translate/move the given shape by the given vector, x axis then y axis
 * this function does NOT mutate the input data
 * @param  {Vec} vector a vector of at least 2 components, any components > 2 are disregarded
 * @param  {Shape2} shape the shape to translate
 * @returns {Shape2} a new shape, with the same geometry, but new transforms
 */
const translate = (vector, shape2) => transform(fromTranslation(vector), shape2)

module.exports = translate
