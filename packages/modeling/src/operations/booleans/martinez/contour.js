export class Contour {
  constructor () {
    this.points = []
    this.holeIds = []
    this.holeOf = null
    this.depth = 0
  }

  isExterior () {
    return this.holeOf == null
  }
}
