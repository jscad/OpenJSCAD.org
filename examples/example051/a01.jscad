include("a02.jscad");

n = 10;

a01 = function() { 
   return a02.b();
};

a01.b = function(n) {     
   return n*2;
}

