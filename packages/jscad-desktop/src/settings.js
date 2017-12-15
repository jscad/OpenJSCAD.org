// very nice color for the cuts [0, 0.6, 1] to go with the orange
const viewer = {
  background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
  meshColor: [0.4, 0.6, 0.5, 1],
  grid: {
    show: true,
    color: [1, 1, 1, 0.1]
  },
  singleton: true, // ensures that no matter how many times you call the creator function, you still only get a single instance
  lighting: {
    smooth: true
  },
  camera: {
    position: [450, 550, 700],
    target: [0, 0, 0],
    limits: {
      maxDistance: 16000,
      minDistance: 0.01
    },
    far: 18000
  },
  controls: {
    zoomToFit: {
      targets: 'all'
    }
  }
}

const themes = {
  light: {
    background: [1, 1, 1, 1],
    meshColor: [0, 0.6, 1, 1],
    grid: {
      show: true,
      color: [0.1, 0.1, 0.1, 0.7]
    },
    controls: {
      zoomToFit: {
        targets: 'all'
      }
    }
  },
  dark: {
    background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
    meshColor: [0.4, 0.6, 0.5, 1],
    grid: {
      show: true,
      color: [1, 1, 1, 0.1]
    },
    controls: {
      zoomToFit: {
        targets: 'all'
      }
    }
  }
}

const settings = {
  autoReload: true,
  lastDesign: {
    name: undefined,
    path: undefined
  },
  theme: 'dark',
  themes,
  viewer,
  params : {}
}

module.exports = settings
