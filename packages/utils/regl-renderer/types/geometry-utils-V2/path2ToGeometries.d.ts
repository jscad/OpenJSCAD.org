export = path2ToGeometries;
declare function path2ToGeometries(options: any, solid: any): {
    type: string;
    positions: any[][];
    normals: number[][];
    indices: number[];
    transforms: any;
    color: any;
    isTransparent: boolean;
}[];
