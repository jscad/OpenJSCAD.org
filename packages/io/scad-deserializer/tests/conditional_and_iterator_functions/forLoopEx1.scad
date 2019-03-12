for (z = [-1, 1]) // two iterations, z = -1, z = 1
{
    translate([0, 0, z])
    cube(size = 1, center = false);
}