export = HalfEdge;
declare class HalfEdge {
    constructor(vertex: any, face: any);
    vertex: any;
    face: any;
    next: any;
    prev: any;
    opposite: any;
    head(): any;
    tail(): any;
    length(): number;
    lengthSquared(): number;
    setOpposite(edge: any): void;
}
