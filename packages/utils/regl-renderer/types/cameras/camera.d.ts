export function toPerspectiveView({ camera }: { camera: typeof import('./perspectiveCamera').cameraState }): { view: Float32Array; position: Float32Array };
export function toPresetView(viewName: string, { camera }: { camera: typeof import('./orthographicCamera').cameraState | typeof import('./perspectiveCamera').cameraState }): { view: Float32Array; position: Float32Array };
export function fromOrthographicToPerspective(orthographicCamera: typeof import('./orthographicCamera').cameraState): typeof import('./perspectiveCamera').cameraState;
export function fromPerspectiveToOrthographic(perspectiveCamera: typeof import('./perspectiveCamera').cameraState): typeof import('./orthographicCamera').cameraState;
