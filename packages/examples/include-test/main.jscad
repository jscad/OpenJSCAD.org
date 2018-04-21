// Example 052: recursive includes

n = 1; // --- ... 

include("a01.jscad");

function main() {
   echo("n="+n);
	return a01().scale(3);
}
