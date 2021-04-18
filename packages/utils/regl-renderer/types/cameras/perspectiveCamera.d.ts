export namespace cameraState {
    const view: any;
    const projection: any;
    const matrix: any;
    const near: number;
    const far: number;
    const up: number[];
    const eye: Float32Array;
    const position: number[];
    const target: number[];
    const fov: number;
    const aspect: number;
    const viewport: number[];
    const projectionType: string;
}
export const cameraProps: {};
export const defaults: any;
export function setProjection(output: any, camera: any, input: any): any;
export function update(output: any, camera: any): any;
