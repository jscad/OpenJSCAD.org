
matrix_3x3 = [[10,20,30],[10,20,30],[10,20,30]];
vector = [2,0,0];
matrix_3x2 = [[1,0,0],[1,0,0]];

group0 = ["3x3matrix","vector","number","3x2matrix"];
group1 = [	matrix_3x3, vector, 2, matrix_3x2];

function multiply(a,b) = a * b;
function divide(a,b) = a / b;
function add(a,b) = a + b;
function minus(a,b) = a - b;
function modulus(a,b) = a % b;

function lt(a,b) = a < b;
function lte(a,b) = a <= b;
function eq(a,b) = a == b;
function neq(a,b) = a != b;
function gt(a,b) = a > b;
function gte(a,b) = a >= b;

group1_len = len(group1);
for (i = [0:group1_len-1]){
	for (j = [0:group1_len-1]){
		echo(str(group0[i]," * ",group0[j], " = "),multiply(group1[i],group1[j]));
		echo(str(group0[i]," / ",group0[j], " = "),divide(group1[i],group1[j]));
		echo(str(group0[i]," + ",group0[j], " = "),add(group1[i],group1[j]));
		echo(str(group0[i]," - ",group0[j], " = "),minus(group1[i],group1[j]));
		echo(str(group0[i]," % ",group0[j], " = "),modulus(group1[i],group1[j]));
		echo(str(group0[i]," < ",group0[j], " = "),lt(group1[i],group1[j]));
		echo(str(group0[i]," <= ",group0[j], " = "),lte(group1[i],group1[j]));
		echo(str(group0[i]," == ",group0[j], " = "),eq(group1[i],group1[j]));
		echo(str(group0[i]," != ",group0[j], " = "),neq(group1[i],group1[j]));
		echo(str(group0[i]," > ",group0[j], " = "),gt(group1[i],group1[j]));
		echo(str(group0[i]," >= ",group0[j], " = "),gte(group1[i],group1[j]));
	}
}
echo("----");
echo("!");
echo("! matrix ", !matrix_3x3);
echo("! vector ", !vector);
echo("----");

echo("?:");
echo("?: matrix ", matrix_3x3?true:false);
echo("?: vextor ", vector?true:false);
echo("----");

cube();