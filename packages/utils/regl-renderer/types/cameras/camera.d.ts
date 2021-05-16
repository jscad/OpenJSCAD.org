export function toPerspectiveView({ camera }: {
    camera: typeof import("./perspectiveCamera").cameraState;
}): {
    view: any;
    position: number[];
};
/**
 * Calculate the camera view and position for acheiving the given preset view.
 */
export function toPresetView(viewName: string, { camera }: {
    camera: typeof import("./orthographicCamera").cameraState | typeof import("./perspectiveCamera").cameraState;
}): {
    view: string;
    position: number[];
};
export function fromOrthographicToPerspective(orthographicCamera: typeof import("./orthographicCamera").cameraState): typeof import("./perspectiveCamera").cameraState;
export function fromPerspectiveToOrthographic(perspectiveCamera: typeof import("./perspectiveCamera").cameraState): typeof import("./orthographicCamera").cameraState;
