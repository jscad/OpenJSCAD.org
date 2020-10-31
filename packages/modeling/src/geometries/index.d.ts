export const geom2: {
    clone: (geometry: any) => any;
    create: (sides?: any[]) => import("./geom2/create").geom2;
    fromPoints: (points: any[]) => any;
    fromCompactBinary: (data: any[]) => any;
    isA: (object: any) => boolean;
    reverse: (geometry: any) => any;
    toOutlines: (geometry: any) => any[];
    toPoints: (geometry: any) => any[];
    toSides: (geometry: any) => any[];
    toString: (geometry: any) => string;
    toCompactBinary: (geom: any) => any;
    transform: (matrix: any, geometry: any) => any;
};
export const geom3: {
    clone: (geometry: any) => any;
    create: (polygons: any) => import("./geom3/create").geom3;
    fromPoints: (listofpoints: any[]) => any;
    fromCompactBinary: (data: any) => any;
    invert: (geometry: any) => any;
    isA: (object: any) => boolean;
    toPoints: (geometry: any) => any[];
    toPolygons: (geometry: any) => any[];
    toString: (geometry: any) => string;
    toCompactBinary: (geom: any) => any;
    transform: (matrix: any, geometry: any) => any;
};
export const path2: {
    appendArc: (options: {
        endpoint: any;
        radius?: any;
        xaxisrotation?: number;
        clockwise?: boolean;
        large?: boolean;
        segments?: number;
    }, geometry: any) => any;
    appendBezier: (options: {
        controlPoints: any[];
        segment?: number;
    }, geometry: any) => any;
    appendPoints: (points: any[], geometry: any) => any;
    clone: (geometry: any) => any;
    close: (geometry: any) => any;
    concat: (...paths: any[]) => any;
    create: (points: any) => import("./path2/create").path2;
    eachPoint: (options: any, thunk: Function, path: any) => void;
    equals: (a: any, b: any) => boolean;
    fromPoints: (options: {
        closed?: boolean;
    }, points: any[]) => any;
    fromCompactBinary: (data: any) => any;
    isA: (object: any) => boolean;
    reverse: (path: any) => any;
    toPoints: (geometry: any) => any[];
    toString: (geometry: any) => string;
    toCompactBinary: (geom: any) => any;
    transform: (matrix: any, geometry: any) => any;
};
export const poly2: {
    arePointsInside: (points: any[], polygon: any) => any;
    create: (vertices?: any[]) => import("./poly2/create").poly2;
    flip: (polygon: any) => any;
    measureArea: (polygon: any) => number;
};
export const poly3: {
    clone: (...params: any[]) => any;
    create: (vertices?: any[]) => import("./poly3/create").poly3;
    fromPoints: (points: any[]) => any;
    fromPointsAndPlane: (vertices: any[], plane: any) => any;
    invert: (polygon: any) => any;
    isA: (object: any) => boolean;
    isConvex: (poly3: any) => boolean;
    measureArea: (poly3: any) => number;
    measureBoundingBox: (poly3: any) => any[];
    measureBoundingSphere: (poly3: any) => any[];
    measureSignedVolume: (poly3: any) => number;
    plane: (polygon: any) => any;
    toPoints: (geometry: any) => any[];
    toString: (poly3: any) => string;
    transform: (matrix: any, poly3: any) => any;
};
