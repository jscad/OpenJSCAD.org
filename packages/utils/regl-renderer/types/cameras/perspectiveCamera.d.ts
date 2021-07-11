export namespace cameraState {
  const view: Float32Array
  const projection: Float32Array
  const matrix: Float32Array
  const near: number
  const far: number
  const up: number[]
  const eye: Float32Array
  const position: number[]
  const target: number[]
  const fov: number
  const aspect: number
  const viewport: number[]
  const projectionType: string
}
export const cameraProps: {};
export const defaults: any;
export function setProjection(output: typeof cameraState | null, camera: typeof cameraState, input: { width: number; height: number }): typeof cameraState;
export function update(output: typeof cameraState, camera?: typeof cameraState): typeof cameraState;
