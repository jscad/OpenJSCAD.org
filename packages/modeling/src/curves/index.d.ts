export const bezier: {
    create: (points: any[]) => import("./bezier/create").bezier;
    valueAt: (t: number, bezier: any) => number | any[];
    tangentAt: (t: number, bezier: any) => number | any[];
};
