export default insertSorted

declare function insertSorted<T>(array: Array<T>, element: T, comparefunc: (a: T, b: T) => number): void
