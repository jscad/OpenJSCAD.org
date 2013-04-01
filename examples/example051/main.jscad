// Example 052: recursive includes

n = 1;
// -- this is needed when file is dragged'n'dropped so it knows where the rest is
includePath("examples/example051/");   

include("a01.jscad");

function main() {
   echo("n="+n);
	return a().scale(5);
}
