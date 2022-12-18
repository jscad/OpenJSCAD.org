export default class Contour {

  /**
   * Contour
   *
   * @class {Contour}
   */
  constructor() {
    this.points = [];
    this.holeIds = [];
    this.holeOf = null;
    this.depth = null;
  }

  isExterior() {
    return this.holeOf == null;
  }

}
