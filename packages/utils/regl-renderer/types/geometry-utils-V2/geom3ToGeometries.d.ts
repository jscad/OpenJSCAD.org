export = geom3ToGeometries;
declare function geom3ToGeometries(options: any, solid: any): ({
    indices: any[][];
    positions: any[][];
    transforms: any;
    normals: boolean[];
    color: any;
    isTransparent: boolean;
    colors?: undefined;
} | {
    indices: any[][];
    positions: any[][];
    transforms: any;
    normals: boolean[];
    colors: any[][];
    isTransparent: boolean;
    color?: undefined;
})[];
