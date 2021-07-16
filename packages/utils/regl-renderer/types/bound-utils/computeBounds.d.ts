import { Geometry } from '@jscad/modeling/src/geometries/types'

export = computeBounds;
declare function computeBounds(...geometries: Geometry[]): {
  dia: number;
  center: number[];
  min: number[];
  max: number[];
  size: number[];
};
