// verify that the array has the given dimension, and contains Number values
export const isNumberArray = (array, dimension) => {
  if (Array.isArray(array) && array.length >= dimension) {
    return array.every((n) => Number.isFinite(n))
  }
  return false
}

// verify that the value is a Number greater than the constant
export const isGT = (value, constant) => (Number.isFinite(value) && value > constant)

// verify that the value is a Number greater than or equal to the constant
export const isGTE = (value, constant) => (Number.isFinite(value) && value >= constant)
