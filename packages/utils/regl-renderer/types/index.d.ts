export const prepareRender: typeof import('./rendering/render')
export namespace drawCommands {
  const drawGrid: typeof import('./rendering/commands/drawGrid')
  const drawAxis: typeof import('./rendering/commands/drawAxis')
  const drawMesh: typeof import('./rendering/commands/drawMesh')
  const drawLines: typeof import('./rendering/commands/drawLines')
}
export namespace cameras {
  const camera: typeof import('./cameras/camera')
  const orthographic: typeof import('./cameras/orthographicCamera')
  const perspective: typeof import('./cameras/perspectiveCamera')
}
export namespace controls {
  const orbit: typeof import('./controls/orbitControls')
}
export const entitiesFromSolids: typeof import('./geometry-utils-V2/entitiesFromSolids')
