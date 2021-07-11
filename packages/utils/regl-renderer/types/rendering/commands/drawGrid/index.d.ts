import { DefaultContext, DrawCommand, Regl } from 'regl'

export = makeDrawGrid;
declare function makeDrawGrid(regl: Regl, params?: {}): DrawCommand<DefaultContext, {}>;
