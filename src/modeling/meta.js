function version() {
  return [0,5,2];
}

function JStoMeta(src) {
   var l = src.split(/\n/);
   var n = 0;
   var m = [];
   for(var i=0; ; i++) {
      if(l[i].match(/^\/\/\s*(\S[^:]+):\s*(\S.*)/)) {
         var k = RegExp.$1;
         var v = RegExp.$2;
         m[k] = v;
         n++;
      } else {
         if(i>5&&n==0)
            break;
         else if(n>0)
            break;
      }
   }
   return m;
}

function MetaToJS(m) {
   var s = "";
   for(var k in m) {
      s += "// "+k+": "+m[k]+"\n";
   }
   return s;
}
