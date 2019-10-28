// flatten the given argument into a single flat array
// the argument can be composed of multiple depths of values and arrays

const flatten = (arr) => {
   return arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}

module.exports = flatten
