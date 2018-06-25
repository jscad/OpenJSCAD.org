// experimenting with models definition

const myModel = {
  name: 'foo',
  type: 'model',
  geometry: shape3.create(),
  transforms: {
    position: [10, 0, -1.2],
    rotation: [0, 0, 0],
    scale: [1, 1, 1]
  }
}

const shape2 = {
  type: 'shape2',
  geometry: {
    sides: [],
    isCanonicalized: false
  },
  properties: {},
  transforms: {
    position: [10, 0, -1.2],
    rotation: [0, 0, 0],
    scale: [1, 1, 1]
  }
}

const shape3 = {
  type: 'shape3',
  geometry: {
    polygons: [],
    isCanonicalized: true,
    isRetesselated: true
  },
  properties: {},
  transforms: {
    position: [10, 0, -1.2],
    rotation: [0, 0, 0],
    scale: [1, 1, 1]
  }
}
