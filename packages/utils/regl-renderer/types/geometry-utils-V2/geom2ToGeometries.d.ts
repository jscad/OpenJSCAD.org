export = geom2ToGeometries;
declare function geom2ToGeometries(options: any, solid: any): {
    positions: any[];
    normals: number[][];
    transforms: any;
    color: any;
    indices: number[];
    isTransparent: boolean;
}[];
