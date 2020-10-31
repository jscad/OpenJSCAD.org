export const arc: (options?: {
    center?: any[];
    radius?: number;
    startAngle?: number;
    endAngle?: number;
    segments?: number;
    makeTangent?: boolean;
}) => any;
export const circle: (options?: {
    center?: any[];
    radius?: number;
    startAngle?: number;
    endAngle?: number;
    segments?: number;
}) => any;
export const cube: (options?: {
    center?: any[];
    size?: number;
}) => any;
export const cuboid: (options?: {
    center?: any[];
    size?: any[];
}) => any;
export const cylinder: (options?: {
    center?: any[];
    height?: any[];
    radius?: number;
    segments?: number;
}) => any;
export const cylinderElliptic: (options?: {
    center?: any[];
    height?: any;
    startRadius?: any;
    startAngle?: number;
    endRadius?: any;
    endAngle?: number;
    segments?: number;
}) => any;
export const ellipse: (options?: {
    center?: any[];
    radius?: any[];
    startAngle?: number;
    endAngle?: number;
    segments?: number;
}) => any;
export const ellipsoid: (options?: {
    center?: any[];
    radius?: any[];
    segments?: number;
    axes?: any[];
}) => any;
export const geodesicSphere: (options?: {
    radius?: number;
    frequency?: number;
}) => any;
export const line: (points: any[]) => any;
export const polygon: (options: {
    points: any[];
    paths?: any[];
}) => any;
export const polyhedron: (options: {
    points: any[];
    faces: any[];
    colors?: any[];
    orientation?: any[];
}) => any;
export const rectangle: (options?: {
    center?: any[];
    size?: any[];
}) => any;
export const roundedCuboid: (options?: {
    center?: any[];
    size?: any[];
    roundRadius?: number;
    segments?: number;
}) => any;
export const roundedCylinder: (options?: {
    center?: any[];
    height?: any[];
    radius?: number;
    roundRadius?: number;
    segments?: number;
}) => any;
export const roundedRectangle: (options?: {
    center?: any[];
    size?: any[];
    roundRadius?: number;
    segments?: number;
}) => any;
export const sphere: (options?: {
    center?: any[];
    radius?: number;
    segments?: number;
    axes?: any[];
}) => any;
export const square: (options?: {
    center?: any[];
    size?: number;
}) => any;
export const star: (options?: {
    center?: any[];
    vertices?: number;
    density?: number;
    outerRadius?: number;
    innerRadius?: number;
    startAngle?: number;
}) => any;
export const torus: (options?: {
    innerRadius?: number;
    outerRadius?: number;
    innerSegments?: any;
    outerSegments?: any;
    innerRotation?: any;
    outerRotation?: number;
    startAngle?: number;
}) => any;
