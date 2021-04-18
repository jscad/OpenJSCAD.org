import { DrawConfig, InitializationOptions } from 'regl'

export const prepareRender: (params: {  glOptions: InitializationOptions}) => (data: any) => void;
export namespace drawCommands {
    const drawGrid: (regl: DrawConfig, params: any) => (props: any) => void;
    const drawAxis: (regl: DrawConfig, params: any) => (props: any) => any;
    const drawMesh: (regl: DrawConfig, params?: {
        extras: {};
    }) => any;
}
export namespace cameras {
    const camera: typeof import("./cameras/camera");
    const orthographic: typeof import("./cameras/orthographicCamera");
    const perspective: typeof import("./cameras/perspectiveCamera");
}
export namespace controls {
    const orbit: typeof import("./controls/orbitControls");
}
export const entitiesFromSolids: (params: any, solids: any) => any;
