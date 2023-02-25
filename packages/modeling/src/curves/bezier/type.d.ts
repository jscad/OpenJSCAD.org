export default Bezier

export interface Bezier {
  points: Array<number> | Array<Array<number>>
  pointType: string
  dimensions: number
  permutations: Array<number>
  tangentPermutations: Array<number>
}
