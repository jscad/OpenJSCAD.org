 // All the toXXX functions
 function toString (shape2) {
   let result = 'CAG (' + shape2.sides.length + ' sides):\n'
   shape2.sides.map(function (side) {
     result += '  ' + side.toString() + '\n'
   })
   return result
 }
module.exports = toString