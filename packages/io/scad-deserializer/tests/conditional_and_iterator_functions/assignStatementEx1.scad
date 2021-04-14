for (i = [10:50])
{
    assign (angle = i*360/20, distance = i*10, r = i*2)
    {
        rotate(angle, [1, 0, 0])
        translate([0, distance, 0])
        sphere(r = r);
    }
}