/**
 * Insert the given element into the give array using the compareFunction.
 * @param {Array} array - array in which to insert
 * @param {*} element - element to insert into the array
 * @param {Function} compareFunction - a function that defines the sort order of elements
 * @alias module:array-utils.insertSorted
 * @example
 * const numbers = [1, 5]
 * const result = insertSorted(numbers, 3, fnNumberSort)
 */
const insertSorted = (array, element, compareFunction) => {
  let leftbound = 0
  let rightbound = array.length
  while (rightbound > leftbound) {
    const testindex = Math.floor((leftbound + rightbound) / 2)
    const testelement = array[testindex]
    const compareresult = compareFunction(element, testelement)
    if (compareresult > 0) { // element > testelement
      leftbound = testindex + 1
    } else {
      rightbound = testindex
    }
  }
  array.splice(leftbound, 0, element)
  return array
}

module.exports = insertSorted
