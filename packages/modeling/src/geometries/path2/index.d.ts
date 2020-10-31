export const appendArc: (options: {
    endpoint: any;
    radius?: any;
    xaxisrotation?: number;
    clockwise?: boolean;
    large?: boolean;
    segments?: number;
}, geometry: any) => any;
export const appendBezier: (options: {
    controlPoints: any[];
    segment?: number;
}, geometry: any) => any;
export const appendPoints: (points: any[], geometry: any) => any;
export const clone: (geometry: any) => any;
export const close: (geometry: any) => any;
export const concat: (...paths: any[]) => any;
export const create: (points: any) => import("./create").path2;
export const eachPoint: (options: any, thunk: Function, path: any) => void;
export const equals: (a: any, b: any) => boolean;
export const fromPoints: (options: {
    closed?: boolean;
}, points: any[]) => any;
export const fromCompactBinary: (data: any) => any;
export const isA: (object: any) => boolean;
export const reverse: (path: any) => any;
export const toPoints: (geometry: any) => any[];
export const toString: (geometry: any) => string;
export const toCompactBinary: (geom: any) => any;
export const transform: (matrix: any, geometry: any) => any;
