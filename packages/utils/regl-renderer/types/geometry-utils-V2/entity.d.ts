import { Geometry } from '@jscad/modeling/src/geometries/types'

export type Entity = { 
  geometry: Geometry; 
  visuals: { 
    drawCmd: string; 
    show: boolean; 
    transparent: boolean; 
    useVertexColors: boolean 
  } 
};