export const VISIBLE: 0;
export const NON_CONVEX: 1;
export const DELETED: 2;
export class Face {
    static createTriangle(v0: any, v1: any, v2: any, minArea?: number): Face;
    normal: any[];
    centroid: any[];
    offset: number;
    outside: any;
    mark: number;
    edge: any;
    nVertices: number;
    getEdge(i: any): any;
    computeNormal(): void;
    area: number;
    computeNormalMinArea(minArea: any): void;
    computeCentroid(): void;
    computeNormalAndCentroid(minArea: any): void;
    distanceToPlane(point: any): number;
    /**
     * @private
     *
     * Connects two edges assuming that prev.head().point === next.tail().point
     *
     * @param {HalfEdge} prev
     * @param {HalfEdge} next
     */
    private connectHalfEdges;
    mergeAdjacentFaces(adjacentEdge: any, discardedFaces: any): any;
    collectIndices(): any[];
}
