export = path2ToGeometries;
declare function path2ToGeometries(options: any, solid: any): {
    positions: any[][];
    normals: number[][];
    transforms: any;
    color: any;
    indices: number[];
    isTransparent: boolean;
}[];
