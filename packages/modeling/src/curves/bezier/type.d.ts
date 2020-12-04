export default Bezier

declare interface Bezier {
  points: Array<number> | Array<Array<number>>
  pointType: string
  dimensions: number
  permutations: Array<number>
  tangentPermutations: Array<number>
}
