// very nice color for the cuts [0, 0.6, 1] to go with the orange
const viewer = {
  background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
  meshColor: [0.4, 0.6, 0.5, 1], // nice orange : [1, 0.4, 0, 1]
  grid: {
    show: true,
    color: [1, 1, 1, 0.1]
  },
  axes: {
    show: true
  },
  lighting: {
    smooth: true
  }
}

const themes = {
  light: {
    background: [1, 1, 1, 1],
    meshColor: [0, 0.6, 1, 1],
    grid: {
      color: [0.1, 0.1, 0.1, 0.5]
    }
  },
  dark: {
    background: [0.211, 0.2, 0.207, 1], // [1, 1, 1, 1],//54, 51, 53
    meshColor: [0.4, 0.6, 0.5, 1],
    grid: {
      color: [1, 1, 1, 0.5]
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
  params: {}
}

module.exports = settings
