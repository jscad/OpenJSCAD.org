export const extrudeFromSlices: (options: {
    numberOfSlices?: any;
    isCapped?: boolean;
    callback?: Function;
}, base: any) => any;
export const extrudeLinear: (options: {
    height?: any[];
    twistAngle?: number;
    twistSteps?: any;
}, ...objects: any[]) => any;
export const extrudeRectangular: (options: {
    size?: number;
    height?: number;
}, ...objects: any[]) => any;
export const extrudeRotate: (options: {
    angle?: number;
    startAngle?: number;
    overflow?: string;
    segments?: number;
}, geometry: any) => any;
export const slice: {
    calculatePlane: (slice: any) => any;
    clone: (...params: any[]) => any;
    create: (edges: any) => import("./slice/create").slice;
    equals: (a: any, b: any) => boolean;
    fromPoints: (points: any[]) => any;
    fromSides: (sides: any[]) => any;
    isA: (object: any) => boolean;
    reverse: (...params: any[]) => any;
    toEdges: (slice: any) => any[];
    toPolygons: (slice: any) => any[];
    toString: (slice: any) => string;
    transform: (matrix: any, slice: any) => any;
};
