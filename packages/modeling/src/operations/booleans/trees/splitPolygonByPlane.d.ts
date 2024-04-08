import { Poly3 } from '../../../geometries/types';
import { Plane } from '../../../maths/types';

enum ResType
{
    coplanar_front = 0,
    coplanar_back = 1,
    front = 2,
    back = 3,
    spanning = 4,
}


interface SplitRes
{
    type: ResType,
    front: Poly3,
    back: Poly3;
}

// Returns object:
// .type:
//   0: coplanar-front
//   1: coplanar-back
//   2: front
//   3: back
//   4: spanning
// In case the polygon is spanning, returns:
// .front: a Polygon3 of the front part
// .back: a Polygon3 of the back part
declare function splitPolygonByPlane(plane: Plane, polygon: Poly3): SplitRes;

export default splitPolygonByPlane;
