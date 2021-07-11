import { InitializationOptions } from 'regl'

export = prepareRender;
declare function prepareRender(params: {  glOptions: InitializationOptions}): (data: any) => void;
