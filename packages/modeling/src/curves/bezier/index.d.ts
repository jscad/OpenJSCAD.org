export const create: (points: any[]) => import("./create").bezier;
export const valueAt: (t: number, bezier: any) => number | any[];
export const tangentAt: (t: number, bezier: any) => number | any[];
