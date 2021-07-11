export = geom3ToGeometries;
declare function geom3ToGeometries(options: any, solid: any): {
    type: string;
    positions: any[][];
    normals: any[];
    indices: number[][];
    colors: any[][];
    transforms: any;
    isTransparent: boolean;
}[];
