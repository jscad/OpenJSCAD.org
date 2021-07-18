import { DefaultContext, DrawCommand, Regl } from 'regl'

export = drawMesh;
declare function drawMesh(regl: Regl, params?: { extras: {} }): DrawCommand<DefaultContext, {}>;
