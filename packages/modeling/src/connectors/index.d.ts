export const create: () => {
    point: any[];
    axis: any;
    normal: any;
};
export const fromPointAxisNormal: (point: any, axis: any, normal: any) => {
    point: any[];
    axis: any;
    normal: any;
};
export const toString: (connector: any) => string;
export const transform: (matrix: any, connector: any) => any;
export const transformationBetween: (options: {
    mirror?: boolean;
    normalRotation?: number;
}, from: any, to: any) => any;
