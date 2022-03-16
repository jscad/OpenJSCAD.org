/**
 * Insert the given element into the give array using the compareFunction.
 * @alias module:modeling/utils.insertSorted
 */
const insertSorted = (array, element, comparefunc) => {
  let leftbound = 0
  let rightbound = array.length
  while (rightbound > leftbound) {
    const testindex = Math.floor((leftbound + rightbound) / 2)
    const testelement = array[testindex]
    const compareresult = comparefunc(element, testelement)
    if (compareresult > 0) { // element > testelement
      leftbound = testindex + 1
    } else {
      rightbound = testindex
    }
  }
  array.splice(leftbound, 0, element)
}

module.exports = insertSorted
