export default RecursiveArray

declare interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}
