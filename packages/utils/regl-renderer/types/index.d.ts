import { DefaultContext, DrawCommand, InitializationOptions, Regl } from 'regl'
import { Geom2, Geom3, Geometry } from '@jscad/modeling/src/geometries/types'

export const prepareRender: (params: {  glOptions: InitializationOptions}) => (data: any) => void;
export namespace drawCommands {
    const drawGrid: (regl: Regl, params: any) => (props: any) => DrawCommand<DefaultContext, {}>;
    const drawAxis: (regl: Regl, params: any) => (props: any) => DrawCommand<DefaultContext, {}>;
    const drawMesh: (regl: Regl, params?: { extras: any }) => DrawCommand<DefaultContext, {}>;
}
export namespace cameras {
    const camera: typeof import("./cameras/camera");
    const orthographic: typeof import("./cameras/orthographicCamera");
    const perspective: typeof import("./cameras/perspectiveCamera");
}
export namespace controls {
    const orbit: typeof import("./controls/orbitControls");
}
export const entitiesFromSolids: (params: { color?: number[]; smoothNormals?: boolean }, solids: Geom2[] | Geom3[]) => Geometry[];
