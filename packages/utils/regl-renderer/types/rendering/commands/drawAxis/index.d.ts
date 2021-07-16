import { DefaultContext, DrawCommand, Regl } from 'regl'

export = drawAxis;
declare function drawAxis(regl: Regl, params: any): (props: any) => DrawCommand<DefaultContext, {}>;
