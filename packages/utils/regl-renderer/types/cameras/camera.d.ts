export function toPerspectiveView({ camera }: {
    camera: any;
}): {
    view: any;
    position: any[];
};
/**
 * Calculate the camera view and position for acheiving the given preset view.
 */
export function toPresetView(viewName: any, { camera }: {
    camera: any;
}): {
    view: any;
    position: any;
};
export function fromOrthographicToPerspective(orthographicCamera: any): any;
export function fromPerspectiveToOrthographic(perspectiveCamera: any): any;
