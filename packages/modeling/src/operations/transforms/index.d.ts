export const align: (options: {
    modes?: any[];
    alignTo?: any[];
    grouped?: any[];
}, ...geometries: any[]) => any;
export const center: (options: {
    axes?: any[];
    center?: any[];
}, ...geometries: any[]) => any;
export const centerX: (...objects: any[]) => any;
export const centerY: (...objects: any[]) => any;
export const centerZ: (...objects: any[]) => any;
export const mirror: (options: {
    origin?: any[];
    normal?: any[];
}, ...objects: any[]) => any;
export const mirrorX: (...objects: any[]) => any;
export const mirrorY: (...objects: any[]) => any;
export const mirrorZ: (...objects: any[]) => any;
export const rotate: (angles: any[], ...objects: any[]) => any;
export const rotateX: (angle: number, ...objects: any[]) => any;
export const rotateY: (angle: number, ...objects: any[]) => any;
export const rotateZ: (angle: number, ...objects: any[]) => any;
export const scale: (factors: any[], ...objects: any[]) => any;
export const scaleX: (offset: any, ...objects: any[]) => any;
export const scaleY: (offset: any, ...objects: any[]) => any;
export const scaleZ: (offset: any, ...objects: any[]) => any;
export const transform: (matrix: any, ...objects: any[]) => any;
export const translate: (offset: any[], ...objects: any[]) => any;
export const translateX: (offset: number, ...objects: any[]) => any;
export const translateY: (offset: number, ...objects: any[]) => any;
export const translateZ: (offset: number, ...objects: any[]) => any;
