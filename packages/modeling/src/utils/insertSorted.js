/**
 * Insert the given element into the given array using the compareFunction.
 * @alias module:modeling/utils.insertSorted
 */
export const insertSorted = (array, element, compareFunc) => {
  let leftBound = 0
  let rightBound = array.length
  while (rightBound > leftBound) {
    const testIndex = Math.floor((leftBound + rightBound) / 2)
    const testElement = array[testIndex]
    const compareResult = compareFunc(element, testElement)
    if (compareResult > 0) { // element > testElement
      leftBound = testIndex + 1
    } else {
      rightBound = testIndex
    }
  }
  array.splice(leftBound, 0, element)
}
