export interface RecursiveArray<T> extends Array<T | RecursiveArray<T>> {}
