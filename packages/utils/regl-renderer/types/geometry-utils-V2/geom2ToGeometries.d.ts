export = geom2ToGeometries;
declare function geom2ToGeometries(options: any, solid: any): {
    type: string;
    positions: any[][];
    normals: number[][];
    indices: number[];
    transforms: any;
    color: any;
    isTransparent: boolean;
}[];
