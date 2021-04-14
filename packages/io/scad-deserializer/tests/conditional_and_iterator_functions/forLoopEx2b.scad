// Note: The middle parameter in the range designation 
// ('0.2' in this case) is the 'increment-by' value
// Warning: Depending on the 'increment-by' value, the
// real end value will be smaller than the given one.
for ( i = [0 : 0.2 : 5] )
{
    rotate( i * 360 / 6, [1, 0, 0])
    translate([0, 10, 0])
    sphere(r = 1);
}