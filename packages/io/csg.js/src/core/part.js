const vec3 = require('./math/vec3')
const mat4 = require('./math/mat4')
const { degToRad } = require('./math/utils')

// EXPERIMENTING
const makeShape = () => {
  return {
    geometry: {
      // sides: [],
      isCanonicalized: false
    },
    properties: {},
    // matrix variant, a tad less readable, but way more practical
    transforms: [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]
    /* {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1]
    } */
  }
}

const translate = (vector, shape) => {
  // const position = vec3.add(vector, shape.transforms.position)
  // const transforms = Object.assign({}, shape.transforms, {position})
  const transforms = mat4.translate(vector, shape.transforms)
  return Object.assign({}, shape, { transforms })
}

const rotate = (vector, shape) => {
  // const rotation = vec3.rotate(vector, shape.transforms.rotation)
  // const transforms = Object.assign({}, shape.transforms, {rotation})
  // TODO: always use 3 component vector: ie pad 2d vector if needed
  const vectorRads = vector.map(degToRad)
  const transforms = mat4.rotateZ(
    vectorRads[2],
    mat4.rotateY(
      vectorRads[1],
      mat4.rotateX(
        vectorRads[0],
        shape.transforms
      )
    )
  )
  return Object.assign({}, shape, { transforms })
}

const scale = (vector, shape) => {
  // const scale = vec3.multiply(vector, shape.transforms.scale)
  // const transforms = Object.assign({}, shape.transforms, {scale})
  const transforms = mat4.scale(vector, shape.transforms)
  return Object.assign({}, shape, { transforms })
}

const transform = (matrix, shape) => {
  const transforms = mat4.multiply(matrix, shape.transforms)
  return Object.assign({}, shape, { transforms })
}

/// /
const originalShape = makeShape()

const moved = translate([0, 2, 1], originalShape)

console.log('original', originalShape)
console.log('moved by', [0, 2, 1], moved)

const rotated = rotate([0, 90, 0], moved)
console.log('rotated by', [0, 90, 0], rotated)

const scaled = scale([0.5, 2, 1], rotated)
console.log('scaled by', [0.5, 2, 1], scaled)
