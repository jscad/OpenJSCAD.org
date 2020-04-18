echo("*", 3*undef);
echo("!", !undef);
echo("/", 3/undef);
echo("+", 3+undef);
echo("-", 3-undef);
echo("&&", undef&&3);
echo("&&", 3&&undef);
echo("||", undef||3);
echo("||", 3||undef);
echo("%", 3%undef);
echo("<", 3<undef);
echo("<=", 3<=undef);
echo("<=", undef<=3);
echo(">", 3>undef);
echo(">=", 3>=undef);
echo("==", 3==undef);
echo("!=", 3==undef);

echo( "abs: ",abs(undef));
echo( "sign: ",sign(undef));
echo( "cos: ",cos(undef));
echo( "sin: ",sin(undef));
echo( "tan: ",tan(undef));
echo( "acos: ",acos(undef));
echo( "asin: ",asin(undef));
echo( "atan: ",atan(undef));
echo( "atan2: ",atan2(1,undef));
echo( "atan2: ",atan2(undef,2));

echo( "min: ",min(undef,2));
echo( "max: ",max(undef,2));
echo( "max: ",max(undef,undef));
echo( "pow: ",pow(undef,2));
echo( "sqrt: ",sqrt(undef));
echo( "ln: ",ln(undef));

echo( "ceil: ",ceil(undef));
echo( "floor: ",floor(undef));
echo( "log: ",log(undef));
echo( "log: ",log(undef,2));
echo( "log: ",log(10,undef));
echo( "exp: ",exp(undef));

echo("sign", sign(undef));
echo("round", round(undef));


echo("str", str(undef));
echo("len", len(undef));


sphere();
