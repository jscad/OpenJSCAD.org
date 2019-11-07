/** helper function to remove the very variable 'tags' fields from a CAG object
 * @param  {CAG} input CAG 
 * @returns {CAG} the MUTATED CAG
 **/
const clearTags = inputCAG => {
  inputCAG.sides = inputCAG.sides.map(function (side) {
    delete side.vertex0.tag
    delete side.vertex1.tag
    return side
  })
  return inputCAG
}
module.exports = clearTags
