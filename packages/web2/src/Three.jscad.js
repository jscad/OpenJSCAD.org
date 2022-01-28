var Mn="132dev",zt={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},jt={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Oo=0,yn=1,zo=2,dd=3,pd=0,Pr=1,jo=2,Si=3,Vt=0,Ne=1,Et=2,Vo=1,md=2,Mt=0,bi=1,Sn=2,bn=3,En=4,ko=5,oi=100,Ho=101,Wo=102,Tn=103,wn=104,Xo=200,Yo=201,qo=202,Zo=203,Fr=204,Ir=205,Ko=206,Jo=207,Qo=208,$o=209,ea=210,ta=0,ia=1,ra=2,or=3,na=4,oa=5,aa=6,sa=7,Fi=0,la=1,ca=2,Tt=0,ua=1,ha=2,fa=3,da=4,pa=5,An=300,ai=301,Ei=302,ar=303,sr=304,si=306,lr=307,cr=1e3,Qe=1001,ur=1002,Oe=1003,Ln=1004,gd=1004,Rn=1005,xd=1005,Ke=1006,ma=1007,_d=1007,li=1008,vd=1008,It=1009,ga=1010,xa=1011,hr=1012,_a=1013,Ii=1014,Nt=1015,kt=1016,va=1017,Ma=1018,ya=1019,Ni=1020,Sa=1021,ci=1022,qe=1023,ba=1024,Ea=1025,Ta=qe,fr=1026,dr=1027,wa=1028,Aa=1029,La=1030,Ra=1031,Ca=1032,Da=1033,Cn=33776,Dn=33777,Pn=33778,Fn=33779,In=35840,Nn=35841,Un=35842,Bn=35843,Pa=36196,Gn=37492,On=37496,Fa=37808,Ia=37809,Na=37810,Ua=37811,Ba=37812,Ga=37813,Oa=37814,za=37815,ja=37816,Va=37817,ka=37818,Ha=37819,Wa=37820,Xa=37821,Ya=36492,qa=37840,Za=37841,Ka=37842,Ja=37843,Qa=37844,$a=37845,es=37846,ts=37847,is=37848,rs=37849,ns=37850,os=37851,as=37852,ss=37853,Md=2200,yd=2201,Sd=2202,bd=2300,Ed=2301,Td=2302,wd=2400,Ad=2401,Ld=2402,Rd=2500,Cd=2501,Dd=0,Pd=1,Fd=2,$e=3e3,pr=3001,mr=3007,gr=3002,ls=3003,Nr=3004,Ur=3005,Br=3006,cs=3200,us=3201,Gr=0,hs=1,Id=0,Or=7680,Nd=7681,Ud=7682,Bd=7683,Gd=34055,Od=34056,zd=5386,jd=512,Vd=513,kd=514,Hd=515,Wd=516,Xd=517,Yd=518,fs=519,zn=35044,qd=35048,Zd=35040,Kd=35045,Jd=35049,Qd=35041,$d=35046,ep=35050,tp=35042,ip="100",jn="300 es";var rt=[];for(let r=0;r<256;r++)rt[r]=(r<16?"0":"")+r.toString(16);var Ui=Math.PI/180,Vn=180/Math.PI;function Ht(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(rt[r&255]+rt[r>>8&255]+rt[r>>16&255]+rt[r>>24&255]+"-"+rt[e&255]+rt[e>>8&255]+"-"+rt[e>>16&15|64]+rt[e>>24&255]+"-"+rt[t&63|128]+rt[t>>8&255]+"-"+rt[t>>16&255]+rt[t>>24&255]+rt[i&255]+rt[i>>8&255]+rt[i>>16&255]+rt[i>>24&255]).toUpperCase()}function st(r,e,t){return Math.max(e,Math.min(t,r))}function ds(r,e){return(r%e+e)%e}function zr(r,e,t){return(1-t)*r+t*e}function kn(r){return(r&r-1)==0&&r!==0}function ps(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}var dt=class{constructor(e=0,t=0,i=0,n=1){this._x=e,this._y=t,this._z=i,this._w=n}static slerp(e,t,i,n){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),i.slerpQuaternions(e,t,n)}static slerpFlat(e,t,i,n,o,a,s){let c=i[n+0],l=i[n+1],f=i[n+2],d=i[n+3],h=o[a+0],m=o[a+1],g=o[a+2],x=o[a+3];if(s===0){e[t+0]=c,e[t+1]=l,e[t+2]=f,e[t+3]=d;return}if(s===1){e[t+0]=h,e[t+1]=m,e[t+2]=g,e[t+3]=x;return}if(d!==x||c!==h||l!==m||f!==g){let v=1-s,u=c*h+l*m+f*g+d*x,p=u>=0?1:-1,T=1-u*u;if(T>Number.EPSILON){let S=Math.sqrt(T),C=Math.atan2(S,u*p);v=Math.sin(v*C)/S,s=Math.sin(s*C)/S}let b=s*p;if(c=c*v+h*b,l=l*v+m*b,f=f*v+g*b,d=d*v+x*b,v===1-s){let S=1/Math.sqrt(c*c+l*l+f*f+d*d);c*=S,l*=S,f*=S,d*=S}}e[t]=c,e[t+1]=l,e[t+2]=f,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,n,o,a){let s=i[n],c=i[n+1],l=i[n+2],f=i[n+3],d=o[a],h=o[a+1],m=o[a+2],g=o[a+3];return e[t]=s*g+f*d+c*m-l*h,e[t+1]=c*g+f*h+l*d-s*m,e[t+2]=l*g+f*m+s*h-c*d,e[t+3]=f*g-s*d-c*h-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");let i=e._x,n=e._y,o=e._z,a=e._order,s=Math.cos,c=Math.sin,l=s(i/2),f=s(n/2),d=s(o/2),h=c(i/2),m=c(n/2),g=c(o/2);switch(a){case"XYZ":this._x=h*f*d+l*m*g,this._y=l*m*d-h*f*g,this._z=l*f*g+h*m*d,this._w=l*f*d-h*m*g;break;case"YXZ":this._x=h*f*d+l*m*g,this._y=l*m*d-h*f*g,this._z=l*f*g-h*m*d,this._w=l*f*d+h*m*g;break;case"ZXY":this._x=h*f*d-l*m*g,this._y=l*m*d+h*f*g,this._z=l*f*g+h*m*d,this._w=l*f*d-h*m*g;break;case"ZYX":this._x=h*f*d-l*m*g,this._y=l*m*d+h*f*g,this._z=l*f*g-h*m*d,this._w=l*f*d+h*m*g;break;case"YZX":this._x=h*f*d+l*m*g,this._y=l*m*d+h*f*g,this._z=l*f*g-h*m*d,this._w=l*f*d-h*m*g;break;case"XZY":this._x=h*f*d-l*m*g,this._y=l*m*d-h*f*g,this._z=l*f*g+h*m*d,this._w=l*f*d+h*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],n=t[4],o=t[8],a=t[1],s=t[5],c=t[9],l=t[2],f=t[6],d=t[10],h=i+s+d;if(h>0){let m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(f-c)*m,this._y=(o-l)*m,this._z=(a-n)*m}else if(i>s&&i>d){let m=2*Math.sqrt(1+i-s-d);this._w=(f-c)/m,this._x=.25*m,this._y=(n+a)/m,this._z=(o+l)/m}else if(s>d){let m=2*Math.sqrt(1+s-i-d);this._w=(o-l)/m,this._x=(n+a)/m,this._y=.25*m,this._z=(c+f)/m}else{let m=2*Math.sqrt(1+d-i-s);this._w=(a-n)/m,this._x=(o+l)/m,this._y=(c+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e,t){return t!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,n=e._y,o=e._z,a=e._w,s=t._x,c=t._y,l=t._z,f=t._w;return this._x=i*f+a*s+n*l-o*c,this._y=n*f+a*c+o*s-i*l,this._z=o*f+a*l+i*c-n*s,this._w=a*f-i*s-n*c-o*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,n=this._y,o=this._z,a=this._w,s=a*e._w+i*e._x+n*e._y+o*e._z;if(s<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,s=-s):this.copy(e),s>=1)return this._w=a,this._x=i,this._y=n,this._z=o,this;let c=1-s*s;if(c<=Number.EPSILON){let m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*n+t*this._y,this._z=m*o+t*this._z,this.normalize(),this._onChangeCallback(),this}let l=Math.sqrt(c),f=Math.atan2(l,s),d=Math.sin((1-t)*f)/l,h=Math.sin(t*f)/l;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=n*d+this._y*h,this._z=o*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){this.copy(e).slerp(t,i)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}};dt.prototype.isQuaternion=!0;var A=class{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(ms.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ms.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,o=e.elements;return this.x=o[0]*t+o[3]*i+o[6]*n,this.y=o[1]*t+o[4]*i+o[7]*n,this.z=o[2]*t+o[5]*i+o[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,o=e.elements,a=1/(o[3]*t+o[7]*i+o[11]*n+o[15]);return this.x=(o[0]*t+o[4]*i+o[8]*n+o[12])*a,this.y=(o[1]*t+o[5]*i+o[9]*n+o[13])*a,this.z=(o[2]*t+o[6]*i+o[10]*n+o[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,o=e.x,a=e.y,s=e.z,c=e.w,l=c*t+a*n-s*i,f=c*i+s*t-o*n,d=c*n+o*i-a*t,h=-o*t-a*i-s*n;return this.x=l*c+h*-o+f*-s-d*-a,this.y=f*c+h*-a+d*-o-l*-s,this.z=d*c+h*-s+l*-a-f*-o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,n=this.z,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*n,this.y=o[1]*t+o[5]*i+o[9]*n,this.z=o[2]*t+o[6]*i+o[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e,t){return t!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,n=e.y,o=e.z,a=t.x,s=t.y,c=t.z;return this.x=n*c-o*s,this.y=o*a-i*c,this.z=i*s-n*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Hn.copy(this).projectOnVector(e),this.sub(Hn)}reflect(e){return this.sub(Hn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(st(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t,i){return i!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}};A.prototype.isVector3=!0;var Hn=new A,ms=new dt;var Le=class{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(e,t,i,n,o,a,s,c,l,f,d,h,m,g,x,v){let u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=n,u[1]=o,u[5]=a,u[9]=s,u[13]=c,u[2]=l,u[6]=f,u[10]=d,u[14]=h,u[3]=m,u[7]=g,u[11]=x,u[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,n=1/Bi.setFromMatrixColumn(e,0).length(),o=1/Bi.setFromMatrixColumn(e,1).length(),a=1/Bi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*o,t[5]=i[5]*o,t[6]=i[6]*o,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){e&&e.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");let t=this.elements,i=e.x,n=e.y,o=e.z,a=Math.cos(i),s=Math.sin(i),c=Math.cos(n),l=Math.sin(n),f=Math.cos(o),d=Math.sin(o);if(e.order==="XYZ"){let h=a*f,m=a*d,g=s*f,x=s*d;t[0]=c*f,t[4]=-c*d,t[8]=l,t[1]=m+g*l,t[5]=h-x*l,t[9]=-s*c,t[2]=x-h*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){let h=c*f,m=c*d,g=l*f,x=l*d;t[0]=h+x*s,t[4]=g*s-m,t[8]=a*l,t[1]=a*d,t[5]=a*f,t[9]=-s,t[2]=m*s-g,t[6]=x+h*s,t[10]=a*c}else if(e.order==="ZXY"){let h=c*f,m=c*d,g=l*f,x=l*d;t[0]=h-x*s,t[4]=-a*d,t[8]=g+m*s,t[1]=m+g*s,t[5]=a*f,t[9]=x-h*s,t[2]=-a*l,t[6]=s,t[10]=a*c}else if(e.order==="ZYX"){let h=a*f,m=a*d,g=s*f,x=s*d;t[0]=c*f,t[4]=g*l-m,t[8]=h*l+x,t[1]=c*d,t[5]=x*l+h,t[9]=m*l-g,t[2]=-l,t[6]=s*c,t[10]=a*c}else if(e.order==="YZX"){let h=a*c,m=a*l,g=s*c,x=s*l;t[0]=c*f,t[4]=x-h*d,t[8]=g*d+m,t[1]=d,t[5]=a*f,t[9]=-s*f,t[2]=-l*f,t[6]=m*d+g,t[10]=h-x*d}else if(e.order==="XZY"){let h=a*c,m=a*l,g=s*c,x=s*l;t[0]=c*f,t[4]=-d,t[8]=l*f,t[1]=h*d+x,t[5]=a*f,t[9]=m*d-g,t[2]=g*d-m,t[6]=s*f,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Eh,e,Th)}lookAt(e,t,i){let n=this.elements;return gt.subVectors(e,t),gt.lengthSq()===0&&(gt.z=1),gt.normalize(),ui.crossVectors(i,gt),ui.lengthSq()===0&&(Math.abs(i.z)===1?gt.x+=1e-4:gt.z+=1e-4,gt.normalize(),ui.crossVectors(i,gt)),ui.normalize(),jr.crossVectors(gt,ui),n[0]=ui.x,n[4]=jr.x,n[8]=gt.x,n[1]=ui.y,n[5]=jr.y,n[9]=gt.y,n[2]=ui.z,n[6]=jr.z,n[10]=gt.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t)):this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,o=this.elements,a=i[0],s=i[4],c=i[8],l=i[12],f=i[1],d=i[5],h=i[9],m=i[13],g=i[2],x=i[6],v=i[10],u=i[14],p=i[3],T=i[7],b=i[11],S=i[15],C=n[0],M=n[4],j=n[8],N=n[12],O=n[1],B=n[5],$=n[9],G=n[13],P=n[2],U=n[6],z=n[10],W=n[14],te=n[3],oe=n[7],fe=n[11],ie=n[15];return o[0]=a*C+s*O+c*P+l*te,o[4]=a*M+s*B+c*U+l*oe,o[8]=a*j+s*$+c*z+l*fe,o[12]=a*N+s*G+c*W+l*ie,o[1]=f*C+d*O+h*P+m*te,o[5]=f*M+d*B+h*U+m*oe,o[9]=f*j+d*$+h*z+m*fe,o[13]=f*N+d*G+h*W+m*ie,o[2]=g*C+x*O+v*P+u*te,o[6]=g*M+x*B+v*U+u*oe,o[10]=g*j+x*$+v*z+u*fe,o[14]=g*N+x*G+v*W+u*ie,o[3]=p*C+T*O+b*P+S*te,o[7]=p*M+T*B+b*U+S*oe,o[11]=p*j+T*$+b*z+S*fe,o[15]=p*N+T*G+b*W+S*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],o=e[12],a=e[1],s=e[5],c=e[9],l=e[13],f=e[2],d=e[6],h=e[10],m=e[14],g=e[3],x=e[7],v=e[11],u=e[15];return g*(+o*c*d-n*l*d-o*s*h+i*l*h+n*s*m-i*c*m)+x*(+t*c*m-t*l*h+o*a*h-n*a*m+n*l*f-o*c*f)+v*(+t*l*d-t*s*m-o*a*d+i*a*m+o*s*f-i*l*f)+u*(-n*s*f-t*c*d+t*s*h+n*a*d-i*a*h+i*c*f)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],o=e[3],a=e[4],s=e[5],c=e[6],l=e[7],f=e[8],d=e[9],h=e[10],m=e[11],g=e[12],x=e[13],v=e[14],u=e[15],p=d*v*l-x*h*l+x*c*m-s*v*m-d*c*u+s*h*u,T=g*h*l-f*v*l-g*c*m+a*v*m+f*c*u-a*h*u,b=f*x*l-g*d*l+g*s*m-a*x*m-f*s*u+a*d*u,S=g*d*c-f*x*c-g*s*h+a*x*h+f*s*v-a*d*v,C=t*p+i*T+n*b+o*S;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let M=1/C;return e[0]=p*M,e[1]=(x*h*o-d*v*o-x*n*m+i*v*m+d*n*u-i*h*u)*M,e[2]=(s*v*o-x*c*o+x*n*l-i*v*l-s*n*u+i*c*u)*M,e[3]=(d*c*o-s*h*o-d*n*l+i*h*l+s*n*m-i*c*m)*M,e[4]=T*M,e[5]=(f*v*o-g*h*o+g*n*m-t*v*m-f*n*u+t*h*u)*M,e[6]=(g*c*o-a*v*o-g*n*l+t*v*l+a*n*u-t*c*u)*M,e[7]=(a*h*o-f*c*o+f*n*l-t*h*l-a*n*m+t*c*m)*M,e[8]=b*M,e[9]=(g*d*o-f*x*o-g*i*m+t*x*m+f*i*u-t*d*u)*M,e[10]=(a*x*o-g*s*o+g*i*l-t*x*l-a*i*u+t*s*u)*M,e[11]=(f*s*o-a*d*o-f*i*l+t*d*l+a*i*m-t*s*m)*M,e[12]=S*M,e[13]=(f*x*n-g*d*n+g*i*h-t*x*h-f*i*v+t*d*v)*M,e[14]=(g*s*n-a*x*n-g*i*c+t*x*c+a*i*v-t*s*v)*M,e[15]=(a*d*n-f*s*n+f*i*c-t*d*c-a*i*h+t*s*h)*M,this}scale(e){let t=this.elements,i=e.x,n=e.y,o=e.z;return t[0]*=i,t[4]*=n,t[8]*=o,t[1]*=i,t[5]*=n,t[9]*=o,t[2]*=i,t[6]*=n,t[10]*=o,t[3]*=i,t[7]*=n,t[11]*=o,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),n=Math.sin(t),o=1-i,a=e.x,s=e.y,c=e.z,l=o*a,f=o*s;return this.set(l*a+i,l*s-n*c,l*c+n*s,0,l*s+n*c,f*s+i,f*c-n*a,0,l*c-n*s,f*c+n*a,o*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,o,a){return this.set(1,i,o,0,e,1,a,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,o=t._x,a=t._y,s=t._z,c=t._w,l=o+o,f=a+a,d=s+s,h=o*l,m=o*f,g=o*d,x=a*f,v=a*d,u=s*d,p=c*l,T=c*f,b=c*d,S=i.x,C=i.y,M=i.z;return n[0]=(1-(x+u))*S,n[1]=(m+b)*S,n[2]=(g-T)*S,n[3]=0,n[4]=(m-b)*C,n[5]=(1-(h+u))*C,n[6]=(v+p)*C,n[7]=0,n[8]=(g+T)*M,n[9]=(v-p)*M,n[10]=(1-(h+x))*M,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements,o=Bi.set(n[0],n[1],n[2]).length(),a=Bi.set(n[4],n[5],n[6]).length(),s=Bi.set(n[8],n[9],n[10]).length();this.determinant()<0&&(o=-o),e.x=n[12],e.y=n[13],e.z=n[14],wt.copy(this);let l=1/o,f=1/a,d=1/s;return wt.elements[0]*=l,wt.elements[1]*=l,wt.elements[2]*=l,wt.elements[4]*=f,wt.elements[5]*=f,wt.elements[6]*=f,wt.elements[8]*=d,wt.elements[9]*=d,wt.elements[10]*=d,t.setFromRotationMatrix(wt),i.x=o,i.y=a,i.z=s,this}makePerspective(e,t,i,n,o,a){a===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");let s=this.elements,c=2*o/(t-e),l=2*o/(i-n),f=(t+e)/(t-e),d=(i+n)/(i-n),h=-(a+o)/(a-o),m=-2*a*o/(a-o);return s[0]=c,s[4]=0,s[8]=f,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=h,s[14]=m,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,i,n,o,a){let s=this.elements,c=1/(t-e),l=1/(i-n),f=1/(a-o),d=(t+e)*c,h=(i+n)*l,m=(a+o)*f;return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-h,s[2]=0,s[6]=0,s[10]=-2*f,s[14]=-m,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Le.prototype.isMatrix4=!0;var Bi=new A,wt=new Le,Eh=new A(0,0,0),Th=new A(1,1,1),ui=new A,jr=new A,gt=new A;var lt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let o=n.indexOf(t);o!==-1&&n.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let i=this._listeners[e.type];if(i!==void 0){e.target=this;let n=i.slice(0);for(let o=0,a=n.length;o<a;o++)n[o].call(this,e);e.target=null}}};var gs=new Le,xs=new dt,hi=class{constructor(e=0,t=0,i=0,n=hi.DefaultOrder){this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let n=e.elements,o=n[0],a=n[4],s=n[8],c=n[1],l=n[5],f=n[9],d=n[2],h=n[6],m=n[10];switch(t){case"XYZ":this._y=Math.asin(st(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-st(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(s,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,l),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(s,m));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(s,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return gs.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gs,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return xs.setFromEuler(this),this.setFromQuaternion(xs,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}toVector3(e){return e?e.set(this._x,this._y,this._z):new A(this._x,this._y,this._z)}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}};hi.prototype.isEuler=!0;hi.DefaultOrder="XYZ";hi.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];var Wn=class{constructor(){this.mask=1|0}set(e){this.mask=1<<e|0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=4294967295|0}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}};var Ve=class{constructor(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(e,t,i,n,o,a,s,c,l){let f=this.elements;return f[0]=e,f[1]=n,f[2]=s,f[3]=t,f[4]=o,f[5]=c,f[6]=i,f[7]=a,f[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,o=this.elements,a=i[0],s=i[3],c=i[6],l=i[1],f=i[4],d=i[7],h=i[2],m=i[5],g=i[8],x=n[0],v=n[3],u=n[6],p=n[1],T=n[4],b=n[7],S=n[2],C=n[5],M=n[8];return o[0]=a*x+s*p+c*S,o[3]=a*v+s*T+c*C,o[6]=a*u+s*b+c*M,o[1]=l*x+f*p+d*S,o[4]=l*v+f*T+d*C,o[7]=l*u+f*b+d*M,o[2]=h*x+m*p+g*S,o[5]=h*v+m*T+g*C,o[8]=h*u+m*b+g*M,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],o=e[3],a=e[4],s=e[5],c=e[6],l=e[7],f=e[8];return t*a*f-t*s*l-i*o*f+i*s*c+n*o*l-n*a*c}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],o=e[3],a=e[4],s=e[5],c=e[6],l=e[7],f=e[8],d=f*a-s*l,h=s*c-f*o,m=l*o-a*c,g=t*d+i*h+n*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=d*x,e[1]=(n*l-f*i)*x,e[2]=(s*i-n*a)*x,e[3]=h*x,e[4]=(f*t-n*c)*x,e[5]=(n*o-s*t)*x,e[6]=m*x,e[7]=(i*c-l*t)*x,e[8]=(a*t-i*o)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,o,a,s){let c=Math.cos(o),l=Math.sin(o);return this.set(i*c,i*l,-i*(c*a+l*s)+a+e,-n*l,n*c,-n*(-l*a+c*s)+s+t,0,0,1),this}scale(e,t){let i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=t,i[4]*=t,i[7]*=t,this}rotate(e){let t=Math.cos(e),i=Math.sin(e),n=this.elements,o=n[0],a=n[3],s=n[6],c=n[1],l=n[4],f=n[7];return n[0]=t*o+i*c,n[3]=t*a+i*l,n[6]=t*s+i*f,n[1]=-i*o+t*c,n[4]=-i*a+t*l,n[7]=-i*s+t*f,this}translate(e,t){let i=this.elements;return i[0]+=e*i[2],i[3]+=e*i[5],i[6]+=e*i[8],i[1]+=t*i[2],i[4]+=t*i[5],i[7]+=t*i[8],this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ve.prototype.isMatrix3=!0;var wh=0,_s=new A,Gi=new dt,Wt=new Le,Vr=new A,xr=new A,Ah=new A,Lh=new dt,vs=new A(1,0,0),Ms=new A(0,1,0),ys=new A(0,0,1),Rh={type:"added"},Ss={type:"removed"},Fe=class extends lt{constructor(){super();Object.defineProperty(this,"id",{value:wh++}),this.uuid=Ht(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Fe.DefaultUp.clone();let e=new A,t=new hi,i=new dt,n=new A(1,1,1);function o(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(o),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Le},normalMatrix:{value:new Ve}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=Fe.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new Wn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gi.setFromAxisAngle(e,t),this.quaternion.multiply(Gi),this}rotateOnWorldAxis(e,t){return Gi.setFromAxisAngle(e,t),this.quaternion.premultiply(Gi),this}rotateX(e){return this.rotateOnAxis(vs,e)}rotateY(e){return this.rotateOnAxis(Ms,e)}rotateZ(e){return this.rotateOnAxis(ys,e)}translateOnAxis(e,t){return _s.copy(e).applyQuaternion(this.quaternion),this.position.add(_s.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(vs,e)}translateY(e){return this.translateOnAxis(Ms,e)}translateZ(e){return this.translateOnAxis(ys,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(Wt.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Vr.copy(e):Vr.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),xr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wt.lookAt(xr,Vr,this.up):Wt.lookAt(Vr,xr,this.up),this.quaternion.setFromRotationMatrix(Wt),n&&(Wt.extractRotation(n.matrixWorld),Gi.setFromRotationMatrix(Wt),this.quaternion.premultiply(Gi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Rh)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ss)),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){let t=this.children[e];t.parent=null,t.dispatchEvent(Ss)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Wt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wt),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,e,Ah),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xr,Lh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let n=this.children;for(let o=0,a=n.length;o<a;o++)n[o].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});let n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON()));function o(s,c){return s[c.uuid]===void 0&&(s[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=o(e.geometries,this.geometry);let s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){let c=s.shapes;if(Array.isArray(c))for(let l=0,f=c.length;l<f;l++){let d=c[l];o(e.shapes,d)}else o(e.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let s=[];for(let c=0,l=this.material.length;c<l;c++)s.push(o(e.materials,this.material[c]));n.material=s}else n.material=o(e.materials,this.material);if(this.children.length>0){n.children=[];for(let s=0;s<this.children.length;s++)n.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let s=0;s<this.animations.length;s++){let c=this.animations[s];n.animations.push(o(e.animations,c))}}if(t){let s=a(e.geometries),c=a(e.materials),l=a(e.textures),f=a(e.images),d=a(e.shapes),h=a(e.skeletons),m=a(e.animations);s.length>0&&(i.geometries=s),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m)}return i.object=n,i;function a(s){let c=[];for(let l in s){let f=s[l];delete f.metadata,c.push(f)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let n=e.children[i];this.add(n.clone())}return this}};Fe.DefaultUp=new A(0,1,0);Fe.DefaultMatrixAutoUpdate=!0;Fe.prototype.isObject3D=!0;var Oi=class extends Fe{constructor(){super();this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};Oi.prototype.isCamera=!0;var Ze=class extends Oi{constructor(e=50,t=1,i=.1,n=2e3){super();this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ui*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vn*2*Math.atan(Math.tan(Ui*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,n,o,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ui*.5*this.fov)/this.zoom,i=2*t,n=this.aspect*i,o=-.5*n,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;o+=a.offsetX*n/c,t-=a.offsetY*i/l,n*=a.width/c,i*=a.height/l}let s=this.filmOffset;s!==0&&(o+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+n,t,t-i,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};Ze.prototype.isPerspectiveCamera=!0;var bs=new Le,Es=new Le,Xt=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Ze,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Ze,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){let t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep;let n=e.projectionMatrix.clone(),o=t.eyeSep/2,a=o*t.near/t.focus,s=t.near*Math.tan(Ui*t.fov*.5)/t.zoom,c,l;Es.elements[12]=-o,bs.elements[12]=o,c=-s*t.aspect+a,l=s*t.aspect+a,n.elements[0]=2*t.near/(l-c),n.elements[8]=(l+c)/(l-c),this.cameraL.projectionMatrix.copy(n),c=-s*t.aspect-a,l=s*t.aspect-a,n.elements[0]=2*t.near/(l-c),n.elements[8]=(l+c)/(l-c),this.cameraR.projectionMatrix.copy(n)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Es),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(bs)}};var fi=class extends Fe{constructor(){super();this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}};fi.prototype.isScene=!0;var Ts={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},At={h:0,s:0,l:0},kr={h:0,s:0,l:0};function Xn(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}function Yn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function qn(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var ue=class{constructor(e,t,i){return t===void 0&&i===void 0?this.set(e):this.setRGB(e,t,i)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,this}setRGB(e,t,i){return this.r=e,this.g=t,this.b=i,this}setHSL(e,t,i){if(e=ds(e,1),t=st(t,0,1),i=st(i,0,1),t===0)this.r=this.g=this.b=i;else{let n=i<=.5?i*(1+t):i+t-i*t,o=2*i-n;this.r=Xn(o,n,e+1/3),this.g=Xn(o,n,e),this.b=Xn(o,n,e-1/3)}return this}setStyle(e){function t(n){n!==void 0&&parseFloat(n)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let n,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(n[1],10))/255,this.g=Math.min(255,parseInt(n[2],10))/255,this.b=Math.min(255,parseInt(n[3],10))/255,t(n[4]),this;if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(n[1],10))/100,this.g=Math.min(100,parseInt(n[2],10))/100,this.b=Math.min(100,parseInt(n[3],10))/100,t(n[4]),this;break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a)){let s=parseFloat(n[1])/360,c=parseInt(n[2],10)/100,l=parseInt(n[3],10)/100;return t(n[4]),this.setHSL(s,c,l)}break}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=i[1],o=n.length;if(o===3)return this.r=parseInt(n.charAt(0)+n.charAt(0),16)/255,this.g=parseInt(n.charAt(1)+n.charAt(1),16)/255,this.b=parseInt(n.charAt(2)+n.charAt(2),16)/255,this;if(o===6)return this.r=parseInt(n.charAt(0)+n.charAt(1),16)/255,this.g=parseInt(n.charAt(2)+n.charAt(3),16)/255,this.b=parseInt(n.charAt(4)+n.charAt(5),16)/255,this}return e&&e.length>0?this.setColorName(e):this}setColorName(e){let t=Ts[e.toLowerCase()];return t!==void 0?this.setHex(t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copyGammaToLinear(e,t=2){return this.r=Math.pow(e.r,t),this.g=Math.pow(e.g,t),this.b=Math.pow(e.b,t),this}copyLinearToGamma(e,t=2){let i=t>0?1/t:1;return this.r=Math.pow(e.r,i),this.g=Math.pow(e.g,i),this.b=Math.pow(e.b,i),this}convertGammaToLinear(e){return this.copyGammaToLinear(this,e),this}convertLinearToGamma(e){return this.copyLinearToGamma(this,e),this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=qn(e.r),this.g=qn(e.g),this.b=qn(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(e){let t=this.r,i=this.g,n=this.b,o=Math.max(t,i,n),a=Math.min(t,i,n),s,c,l=(a+o)/2;if(a===o)s=0,c=0;else{let f=o-a;switch(c=l<=.5?f/(o+a):f/(2-o-a),o){case t:s=(i-n)/f+(i<n?6:0);break;case i:s=(n-t)/f+2;break;case n:s=(t-i)/f+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getStyle(){return"rgb("+(this.r*255|0)+","+(this.g*255|0)+","+(this.b*255|0)+")"}offsetHSL(e,t,i){return this.getHSL(At),At.h+=e,At.s+=t,At.l+=i,this.setHSL(At.h,At.s,At.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(At),e.getHSL(kr);let i=zr(At.h,kr.h,t),n=zr(At.s,kr.s,t),o=zr(At.l,kr.l,t);return this.setHSL(i,n,o),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),e.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}};ue.NAMES=Ts;ue.prototype.isColor=!0;ue.prototype.r=1;ue.prototype.g=1;ue.prototype.b=1;var Ti=class extends Fe{constructor(e,t=1){super();this.type="Light",this.color=new ue(e),this.intensity=t}dispose(){}copy(e){return super.copy(e),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};Ti.prototype.isLight=!0;var Zn=class extends Ti{constructor(e,t,i){super(e,i);this.type="HemisphereLight",this.position.copy(Fe.DefaultUp),this.updateMatrix(),this.groundColor=new ue(t)}copy(e){return Ti.prototype.copy.call(this,e),this.groundColor.copy(e.groundColor),this}};Zn.prototype.isHemisphereLight=!0;var ce=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this)}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this)}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t,i){return i!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),o=this.x-e.x,a=this.y-e.y;return this.x=o*i-a*n+e.x,this.y=o*n+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}};ce.prototype.isVector2=!0;var ze=class{constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,o=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n+a[12]*o,this.y=a[1]*t+a[5]*i+a[9]*n+a[13]*o,this.z=a[2]*t+a[6]*i+a[10]*n+a[14]*o,this.w=a[3]*t+a[7]*i+a[11]*n+a[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,o,a=.01,s=.1,c=e.elements,l=c[0],f=c[4],d=c[8],h=c[1],m=c[5],g=c[9],x=c[2],v=c[6],u=c[10];if(Math.abs(f-h)<a&&Math.abs(d-x)<a&&Math.abs(g-v)<a){if(Math.abs(f+h)<s&&Math.abs(d+x)<s&&Math.abs(g+v)<s&&Math.abs(l+m+u-3)<s)return this.set(1,0,0,0),this;t=Math.PI;let T=(l+1)/2,b=(m+1)/2,S=(u+1)/2,C=(f+h)/4,M=(d+x)/4,j=(g+v)/4;return T>b&&T>S?T<a?(i=0,n=.707106781,o=.707106781):(i=Math.sqrt(T),n=C/i,o=M/i):b>S?b<a?(i=.707106781,n=0,o=.707106781):(n=Math.sqrt(b),i=C/n,o=j/n):S<a?(i=.707106781,n=.707106781,o=0):(o=Math.sqrt(S),i=M/o,n=j/o),this.set(i,n,o,t),this}let p=Math.sqrt((v-g)*(v-g)+(d-x)*(d-x)+(h-f)*(h-f));return Math.abs(p)<.001&&(p=1),this.x=(v-g)/p,this.y=(d-x)/p,this.z=(h-f)/p,this.w=Math.acos((l+m+u-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t,i){return i!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}};ze.prototype.isVector4=!0;var Yt=class{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,i=1/0,n=1/0,o=-1/0,a=-1/0,s=-1/0;for(let c=0,l=e.length;c<l;c+=3){let f=e[c],d=e[c+1],h=e[c+2];f<t&&(t=f),d<i&&(i=d),h<n&&(n=h),f>o&&(o=f),d>a&&(a=d),h>s&&(s=h)}return this.min.set(t,i,n),this.max.set(o,a,s),this}setFromBufferAttribute(e){let t=1/0,i=1/0,n=1/0,o=-1/0,a=-1/0,s=-1/0;for(let c=0,l=e.count;c<l;c++){let f=e.getX(c),d=e.getY(c),h=e.getZ(c);f<t&&(t=f),d<i&&(i=d),h<n&&(n=h),f>o&&(o=f),d>a&&(a=d),h>s&&(s=h)}return this.min.set(t,i,n),this.max.set(o,a,s),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=_r.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e){return this.makeEmpty(),this.expandByObject(e)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e){e.updateWorldMatrix(!1,!1);let t=e.geometry;t!==void 0&&(t.boundingBox===null&&t.computeBoundingBox(),Kn.copy(t.boundingBox),Kn.applyMatrix4(e.matrixWorld),this.union(Kn));let i=e.children;for(let n=0,o=i.length;n<o;n++)this.expandByObject(i[n]);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,_r),_r.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vr),Hr.subVectors(this.max,vr),zi.subVectors(e.a,vr),ji.subVectors(e.b,vr),Vi.subVectors(e.c,vr),di.subVectors(ji,zi),pi.subVectors(Vi,ji),wi.subVectors(zi,Vi);let t=[0,-di.z,di.y,0,-pi.z,pi.y,0,-wi.z,wi.y,di.z,0,-di.x,pi.z,0,-pi.x,wi.z,0,-wi.x,-di.y,di.x,0,-pi.y,pi.x,0,-wi.y,wi.x,0];return!Jn(t,zi,ji,Vi,Hr)||(t=[1,0,0,0,1,0,0,0,1],!Jn(t,zi,ji,Vi,Hr))?!1:(Wr.crossVectors(di,pi),t=[Wr.x,Wr.y,Wr.z],Jn(t,zi,ji,Vi,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return _r.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return this.getCenter(e.center),e.radius=this.getSize(_r).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};Yt.prototype.isBox3=!0;var qt=[new A,new A,new A,new A,new A,new A,new A,new A],_r=new A,Kn=new Yt,zi=new A,ji=new A,Vi=new A,di=new A,pi=new A,wi=new A,vr=new A,Hr=new A,Wr=new A,Ai=new A;function Jn(r,e,t,i,n){for(let o=0,a=r.length-3;o<=a;o+=3){Ai.fromArray(r,o);let s=n.x*Math.abs(Ai.x)+n.y*Math.abs(Ai.y)+n.z*Math.abs(Ai.z),c=e.dot(Ai),l=t.dot(Ai),f=i.dot(Ai);if(Math.max(-Math.max(c,l,f),Math.min(c,l,f))>s)return!1}return!0}var Ch=new Yt,ws=new A,Qn=new A,$n=new A,Zt=class{constructor(e=new A,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Ch.setFromPoints(e).getCenter(i);let n=0;for(let o=0,a=e.length;o<a;o++)n=Math.max(n,i.distanceToSquared(e[o]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){$n.subVectors(e,this.center);let t=$n.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),n=(i-this.radius)*.5;this.center.add($n.multiplyScalar(n/i)),this.radius+=n}return this}union(e){return Qn.subVectors(e.center,this.center).normalize().multiplyScalar(e.radius),this.expandByPoint(ws.copy(e.center).add(Qn)),this.expandByPoint(ws.copy(e.center).sub(Qn)),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}};var eo=new A,Dh=new A,Ph=new Ve,Lt=class{constructor(e=new A(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=eo.subVectors(i,t).cross(Dh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){let i=e.delta(eo),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/n;return o<0||o>1?null:t.copy(i).multiplyScalar(o).add(e.start)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Ph.getNormalMatrix(e),n=this.coplanarPoint(eo).applyMatrix4(e),o=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};Lt.prototype.isPlane=!0;var ki=new Zt,Xr=new A,Li=class{constructor(e=new Lt,t=new Lt,i=new Lt,n=new Lt,o=new Lt,a=new Lt){this.planes=[e,t,i,n,o,a]}set(e,t,i,n,o,a){let s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(i),s[3].copy(n),s[4].copy(o),s[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e){let t=this.planes,i=e.elements,n=i[0],o=i[1],a=i[2],s=i[3],c=i[4],l=i[5],f=i[6],d=i[7],h=i[8],m=i[9],g=i[10],x=i[11],v=i[12],u=i[13],p=i[14],T=i[15];return t[0].setComponents(s-n,d-c,x-h,T-v).normalize(),t[1].setComponents(s+n,d+c,x+h,T+v).normalize(),t[2].setComponents(s+o,d+l,x+m,T+u).normalize(),t[3].setComponents(s-o,d-l,x-m,T-u).normalize(),t[4].setComponents(s-a,d-f,x-g,T-p).normalize(),t[5].setComponents(s+a,d+f,x+g,T+p).normalize(),this}intersectsObject(e){let t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),ki.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSprite(e){return ki.center.set(0,0,0),ki.radius=.7071067811865476,ki.applyMatrix4(e.matrixWorld),this.intersectsSphere(ki)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(Xr.x=n.normal.x>0?e.max.x:e.min.x,Xr.y=n.normal.y>0?e.max.y:e.min.y,Xr.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var As=new Le,Ls=new A,Rs=new A,to=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Li,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new ze(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Ls.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ls),Rs.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Rs),t.updateMatrixWorld(),As.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(As),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(t.projectionMatrix),i.multiply(t.matrixWorldInverse)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var Rt=class extends Oi{constructor(e=-1,t=1,i=1,n=-1,o=.1,a=2e3){super();this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=o,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,o,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,o=i-e,a=i+e,s=n+t,c=n-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,a=o+l*this.view.width,s-=f*this.view.offsetY,c=s-f*this.view.height}this.projectionMatrix.makeOrthographic(o,a,s,c,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};Rt.prototype.isOrthographicCamera=!0;var Yr=class extends to{constructor(){super(new Rt(-5,5,5,-5,.5,500))}};Yr.prototype.isDirectionalLightShadow=!0;var io=class extends Ti{constructor(e,t){super(e,t);this.type="DirectionalLight",this.position.copy(Fe.DefaultUp),this.updateMatrix(),this.target=new Fe,this.shadow=new Yr}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};io.prototype.isDirectionalLight=!0;var Be=new A,qr=new ce,Ge=class{constructor(e,t,i){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i===!0,this.usage=zn,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,o=this.itemSize;n<o;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}copyColorsArray(e){let t=this.array,i=0;for(let n=0,o=e.length;n<o;n++){let a=e[n];a===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",n),a=new ue),t[i++]=a.r,t[i++]=a.g,t[i++]=a.b}return this}copyVector2sArray(e){let t=this.array,i=0;for(let n=0,o=e.length;n<o;n++){let a=e[n];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",n),a=new ce),t[i++]=a.x,t[i++]=a.y}return this}copyVector3sArray(e){let t=this.array,i=0;for(let n=0,o=e.length;n<o;n++){let a=e[n];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",n),a=new A),t[i++]=a.x,t[i++]=a.y,t[i++]=a.z}return this}copyVector4sArray(e){let t=this.array,i=0;for(let n=0,o=e.length;n<o;n++){let a=e[n];a===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",n),a=new ze),t[i++]=a.x,t[i++]=a.y,t[i++]=a.z,t[i++]=a.w}return this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)qr.fromBufferAttribute(this,t),qr.applyMatrix3(e),this.setXY(t,qr.x,qr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Be.fromBufferAttribute(this,t),Be.applyMatrix3(e),this.setXYZ(t,Be.x,Be.y,Be.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Be.x=this.getX(t),Be.y=this.getY(t),Be.z=this.getZ(t),Be.applyMatrix4(e),this.setXYZ(t,Be.x,Be.y,Be.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Be.x=this.getX(t),Be.y=this.getY(t),Be.z=this.getZ(t),Be.applyNormalMatrix(e),this.setXYZ(t,Be.x,Be.y,Be.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Be.x=this.getX(t),Be.y=this.getY(t),Be.z=this.getZ(t),Be.transformDirection(e),this.setXYZ(t,Be.x,Be.y,Be.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){return this.array[e*this.itemSize]}setX(e,t){return this.array[e*this.itemSize]=t,this}getY(e){return this.array[e*this.itemSize+1]}setY(e,t){return this.array[e*this.itemSize+1]=t,this}getZ(e){return this.array[e*this.itemSize+2]}setZ(e,t){return this.array[e*this.itemSize+2]=t,this}getW(e){return this.array[e*this.itemSize+3]}setW(e,t){return this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,o){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zn&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}};Ge.prototype.isBufferAttribute=!0;var Fh=class extends Ge{constructor(e,t,i){super(new Int8Array(e),t,i)}},Ih=class extends Ge{constructor(e,t,i){super(new Uint8Array(e),t,i)}},Nh=class extends Ge{constructor(e,t,i){super(new Uint8ClampedArray(e),t,i)}},Uh=class extends Ge{constructor(e,t,i){super(new Int16Array(e),t,i)}},Mr=class extends Ge{constructor(e,t,i){super(new Uint16Array(e),t,i)}},Bh=class extends Ge{constructor(e,t,i){super(new Int32Array(e),t,i)}},yr=class extends Ge{constructor(e,t,i){super(new Uint32Array(e),t,i)}},Cs=class extends Ge{constructor(e,t,i){super(new Uint16Array(e),t,i)}};Cs.prototype.isFloat16BufferAttribute=!0;var Xe=class extends Ge{constructor(e,t,i){super(new Float32Array(e),t,i)}},Gh=class extends Ge{constructor(e,t,i){super(new Float64Array(e),t,i)}};function Zr(r){if(r.length===0)return-1/0;let e=r[0];for(let t=1,i=r.length;t<i;++t)r[t]>e&&(e=r[t]);return e}var Oh=0,yt=new Le,ro=new Fe,Hi=new A,xt=new Yt,Sr=new Yt,et=new A,je=class extends lt{constructor(){super();Object.defineProperty(this,"id",{value:Oh++}),this.uuid=Ht(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zr(e)>65535?yr:Mr)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let o=new Ve().getNormalMatrix(e);i.applyNormalMatrix(o),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yt.makeRotationFromQuaternion(e),this.applyMatrix4(yt),this}rotateX(e){return yt.makeRotationX(e),this.applyMatrix4(yt),this}rotateY(e){return yt.makeRotationY(e),this.applyMatrix4(yt),this}rotateZ(e){return yt.makeRotationZ(e),this.applyMatrix4(yt),this}translate(e,t,i){return yt.makeTranslation(e,t,i),this.applyMatrix4(yt),this}scale(e,t,i){return yt.makeScale(e,t,i),this.applyMatrix4(yt),this}lookAt(e){return ro.lookAt(e),ro.updateMatrix(),this.applyMatrix4(ro.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){let t=[];for(let i=0,n=e.length;i<n;i++){let o=e[i];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Xe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){let o=t[i];xt.setFromBufferAttribute(o),this.morphTargetsRelative?(et.addVectors(this.boundingBox.min,xt.min),this.boundingBox.expandByPoint(et),et.addVectors(this.boundingBox.max,xt.max),this.boundingBox.expandByPoint(et)):(this.boundingBox.expandByPoint(xt.min),this.boundingBox.expandByPoint(xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new A,1/0);return}if(e){let i=this.boundingSphere.center;if(xt.setFromBufferAttribute(e),t)for(let o=0,a=t.length;o<a;o++){let s=t[o];Sr.setFromBufferAttribute(s),this.morphTargetsRelative?(et.addVectors(xt.min,Sr.min),xt.expandByPoint(et),et.addVectors(xt.max,Sr.max),xt.expandByPoint(et)):(xt.expandByPoint(Sr.min),xt.expandByPoint(Sr.max))}xt.getCenter(i);let n=0;for(let o=0,a=e.count;o<a;o++)et.fromBufferAttribute(e,o),n=Math.max(n,i.distanceToSquared(et));if(t)for(let o=0,a=t.length;o<a;o++){let s=t[o],c=this.morphTargetsRelative;for(let l=0,f=s.count;l<f;l++)et.fromBufferAttribute(s,l),c&&(Hi.fromBufferAttribute(e,l),et.add(Hi)),n=Math.max(n,i.distanceToSquared(et))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeFaceNormals(){}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.array,n=t.position.array,o=t.normal.array,a=t.uv.array,s=n.length/3;t.tangent===void 0&&this.setAttribute("tangent",new Ge(new Float32Array(4*s),4));let c=t.tangent.array,l=[],f=[];for(let O=0;O<s;O++)l[O]=new A,f[O]=new A;let d=new A,h=new A,m=new A,g=new ce,x=new ce,v=new ce,u=new A,p=new A;function T(O,B,$){d.fromArray(n,O*3),h.fromArray(n,B*3),m.fromArray(n,$*3),g.fromArray(a,O*2),x.fromArray(a,B*2),v.fromArray(a,$*2),h.sub(d),m.sub(d),x.sub(g),v.sub(g);let G=1/(x.x*v.y-v.x*x.y);!isFinite(G)||(u.copy(h).multiplyScalar(v.y).addScaledVector(m,-x.y).multiplyScalar(G),p.copy(m).multiplyScalar(x.x).addScaledVector(h,-v.x).multiplyScalar(G),l[O].add(u),l[B].add(u),l[$].add(u),f[O].add(p),f[B].add(p),f[$].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:i.length}]);for(let O=0,B=b.length;O<B;++O){let $=b[O],G=$.start,P=$.count;for(let U=G,z=G+P;U<z;U+=3)T(i[U+0],i[U+1],i[U+2])}let S=new A,C=new A,M=new A,j=new A;function N(O){M.fromArray(o,O*3),j.copy(M);let B=l[O];S.copy(B),S.sub(M.multiplyScalar(M.dot(B))).normalize(),C.crossVectors(j,B);let G=C.dot(f[O])<0?-1:1;c[O*4]=S.x,c[O*4+1]=S.y,c[O*4+2]=S.z,c[O*4+3]=G}for(let O=0,B=b.length;O<B;++O){let $=b[O],G=$.start,P=$.count;for(let U=G,z=G+P;U<z;U+=3)N(i[U+0]),N(i[U+1]),N(i[U+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ge(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);let n=new A,o=new A,a=new A,s=new A,c=new A,l=new A,f=new A,d=new A;if(e)for(let h=0,m=e.count;h<m;h+=3){let g=e.getX(h+0),x=e.getX(h+1),v=e.getX(h+2);n.fromBufferAttribute(t,g),o.fromBufferAttribute(t,x),a.fromBufferAttribute(t,v),f.subVectors(a,o),d.subVectors(n,o),f.cross(d),s.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),s.add(f),c.add(f),l.add(f),i.setXYZ(g,s.x,s.y,s.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(v,l.x,l.y,l.z)}else for(let h=0,m=t.count;h<m;h+=3)n.fromBufferAttribute(t,h+0),o.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),f.subVectors(a,o),d.subVectors(n,o),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}merge(e,t){if(!(e&&e.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);return}t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));let i=this.attributes;for(let n in i){if(e.attributes[n]===void 0)continue;let a=i[n].array,s=e.attributes[n],c=s.array,l=s.itemSize*t,f=Math.min(c.length,a.length-l);for(let d=0,h=l;d<f;d++,h++)a[h]=c[d]}return this}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)et.fromBufferAttribute(e,t),et.normalize(),e.setXYZ(t,et.x,et.y,et.z)}toNonIndexed(){function e(s,c){let l=s.array,f=s.itemSize,d=s.normalized,h=new l.constructor(c.length*f),m=0,g=0;for(let x=0,v=c.length;x<v;x++){s.isInterleavedBufferAttribute?m=c[x]*s.data.stride+s.offset:m=c[x]*f;for(let u=0;u<f;u++)h[g++]=l[m++]}return new Ge(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new je,i=this.index.array,n=this.attributes;for(let s in n){let c=n[s],l=e(c,i);t.setAttribute(s,l)}let o=this.morphAttributes;for(let s in o){let c=[],l=o[s];for(let f=0,d=l.length;f<d;f++){let h=l[f],m=e(h,i);c.push(m)}t.morphAttributes[s]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let s=0,c=a.length;s<c;s++){let l=a[s];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let c in i){let l=i[c];e.data.attributes[c]=l.toJSON(e.data)}let n={},o=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],f=[];for(let d=0,h=l.length;d<h;d++){let m=l[d];f.push(m.toJSON(e.data))}f.length>0&&(n[c]=f,o=!0)}o&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let s=this.boundingSphere;return s!==null&&(e.data.boundingSphere={center:s.center.toArray(),radius:s.radius}),e}clone(){return new je().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone(t));let n=e.attributes;for(let l in n){let f=n[l];this.setAttribute(l,f.clone(t))}let o=e.morphAttributes;for(let l in o){let f=[],d=o[l];for(let h=0,m=d.length;h<m;h++)f.push(d[h].clone(t));this.morphAttributes[l]=f}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,f=a.length;l<f;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};je.prototype.isBufferGeometry=!0;var Ct=class extends je{constructor(e=1,t=1,i=1,n=1){super();this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let o=e/2,a=t/2,s=Math.floor(i),c=Math.floor(n),l=s+1,f=c+1,d=e/s,h=t/c,m=[],g=[],x=[],v=[];for(let u=0;u<f;u++){let p=u*h-a;for(let T=0;T<l;T++){let b=T*d-o;g.push(b,-p,0),x.push(0,0,1),v.push(T/s),v.push(1-u/c)}}for(let u=0;u<c;u++)for(let p=0;p<s;p++){let T=p+l*u,b=p+l*(u+1),S=p+1+l*(u+1),C=p+1+l*u;m.push(T,b,C),m.push(b,S,C)}this.setIndex(m),this.setAttribute("position",new Xe(g,3)),this.setAttribute("normal",new Xe(x,3)),this.setAttribute("uv",new Xe(v,2))}static fromJSON(e){return new Ct(e.width,e.height,e.widthSegments,e.heightSegments)}};var zh=0,pt=class extends lt{constructor(){super();Object.defineProperty(this,"id",{value:zh++}),this.uuid=Ht(),this.name="",this.type="Material",this.fog=!0,this.blending=bi,this.side=Vt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=Fr,this.blendDst=Ir,this.blendEquation=oi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fs,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Or,this.stencilZFail=Or,this.stencilZPass=Or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}onBuild(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn("THREE.Material: '"+t+"' parameter is undefined.");continue}if(t==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=i===Vo;continue}let n=this[t];if(n===void 0){console.warn("THREE."+this.type+": '"+t+"' is not a property of this material.");continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(i.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularTint&&this.specularTint.isColor&&(i.specularTint=this.specularTint.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularTintMap&&this.specularTintMap.isTexture&&(i.specularTintMap=this.specularTintMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationTint!==void 0&&(i.attenuationTint=this.attenuationTint.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(i.blending=this.blending),this.side!==Vt&&(i.side=this.side),this.vertexColors&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.stencilWrite=this.stencilWrite,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,this.rotation&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(i.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=this.flatShading),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),JSON.stringify(this.userData)!=="{}"&&(i.userData=this.userData);function n(o){let a=[];for(let s in o){let c=o[s];delete c.metadata,a.push(c)}return a}if(t){let o=n(e.textures),a=n(e.images);o.length>0&&(i.textures=o),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.fog=e.fog,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let n=t.length;i=new Array(n);for(let o=0;o!==n;++o)i[o]=t[o].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};pt.prototype.isMaterial=!0;var no=class extends pt{constructor(e){super();this.type="MeshPhongMaterial",this.color=new ue(16777215),this.specular=new ue(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gr,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Fi,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this}};no.prototype.isMeshPhongMaterial=!0;var Kt=class extends pt{constructor(e){super();this.type="LineBasicMaterial",this.color=new ue(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this}};Kt.prototype.isLineBasicMaterial=!0;function Kr(){let r=null,e=!1,t=null,i=null;function n(o,a){t(o,a),i=r.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&(i=r.requestAnimationFrame(n),e=!0)},stop:function(){r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){r=o}}}function Ds(r,e){let t=e.isWebGL2,i=new WeakMap;function n(l,f){let d=l.array,h=l.usage,m=r.createBuffer();r.bindBuffer(f,m),r.bufferData(f,d,h),l.onUploadCallback();let g=r.FLOAT;return d instanceof Float32Array?g=r.FLOAT:d instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):d instanceof Uint16Array?l.isFloat16BufferAttribute?t?g=r.HALF_FLOAT:console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."):g=r.UNSIGNED_SHORT:d instanceof Int16Array?g=r.SHORT:d instanceof Uint32Array?g=r.UNSIGNED_INT:d instanceof Int32Array?g=r.INT:d instanceof Int8Array?g=r.BYTE:(d instanceof Uint8Array||d instanceof Uint8ClampedArray)&&(g=r.UNSIGNED_BYTE),{buffer:m,type:g,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version}}function o(l,f,d){let h=f.array,m=f.updateRange;r.bindBuffer(d,l),m.count===-1?r.bufferSubData(d,0,h):(t?r.bufferSubData(d,m.offset*h.BYTES_PER_ELEMENT,h,m.offset,m.count):r.bufferSubData(d,m.offset*h.BYTES_PER_ELEMENT,h.subarray(m.offset,m.offset+m.count)),m.count=-1)}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function s(l){l.isInterleavedBufferAttribute&&(l=l.data);let f=i.get(l);f&&(r.deleteBuffer(f.buffer),i.delete(l))}function c(l,f){if(l.isGLBufferAttribute){let h=i.get(l);(!h||h.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let d=i.get(l);d===void 0?i.set(l,n(l,f)):d.version<l.version&&(o(d.buffer,l,f),d.version=l.version)}return{get:a,remove:s,update:c}}var Jt=class extends je{constructor(e=1,t=1,i=1,n=1,o=1,a=1){super();this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:o,depthSegments:a};let s=this;n=Math.floor(n),o=Math.floor(o),a=Math.floor(a);let c=[],l=[],f=[],d=[],h=0,m=0;g("z","y","x",-1,-1,i,t,e,a,o,0),g("z","y","x",1,-1,i,t,-e,a,o,1),g("x","z","y",1,1,e,i,t,n,a,2),g("x","z","y",1,-1,e,i,-t,n,a,3),g("x","y","z",1,-1,e,t,i,n,o,4),g("x","y","z",-1,-1,e,t,-i,n,o,5),this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(f,3)),this.setAttribute("uv",new Xe(d,2));function g(x,v,u,p,T,b,S,C,M,j,N){let O=b/M,B=S/j,$=b/2,G=S/2,P=C/2,U=M+1,z=j+1,W=0,te=0,oe=new A;for(let fe=0;fe<z;fe++){let ie=fe*B-G;for(let Ae=0;Ae<U;Ae++){let k=Ae*O-$;oe[x]=k*p,oe[v]=ie*T,oe[u]=P,l.push(oe.x,oe.y,oe.z),oe[x]=0,oe[v]=0,oe[u]=C>0?1:-1,f.push(oe.x,oe.y,oe.z),d.push(Ae/M),d.push(1-fe/j),W+=1}}for(let fe=0;fe<j;fe++)for(let ie=0;ie<M;ie++){let Ae=h+ie+U*fe,k=h+ie+U*(fe+1),q=h+(ie+1)+U*(fe+1),J=h+(ie+1)+U*fe;c.push(Ae,k,J),c.push(k,q,J),te+=6}s.addGroup(m,te,N),m+=te,h+=W}}static fromJSON(e){return new Jt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function Qt(r){let e={};for(let t in r){e[t]={};for(let i in r[t]){let n=r[t][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?e[t][i]=n.clone():Array.isArray(n)?e[t][i]=n.slice():e[t][i]=n}}return e}function nt(r){let e={};for(let t=0;t<r.length;t++){let i=Qt(r[t]);for(let n in i)e[n]=i[n]}return e}var Ps={clone:Qt,merge:nt};var Fs=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;var Is=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;var ct=class extends pt{constructor(e){super();this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=Fs,this.fragmentShader=Is,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qt(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}};ct.prototype.isShaderMaterial=!0;var $t=new A,oo=new A,Jr=new A,mi=new A,ao=new A,Qr=new A,so=new A,br=class{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,$t)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(i).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=$t.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):($t.copy(this.direction).multiplyScalar(t).add(this.origin),$t.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){oo.copy(e).add(t).multiplyScalar(.5),Jr.copy(t).sub(e).normalize(),mi.copy(this.origin).sub(oo);let o=e.distanceTo(t)*.5,a=-this.direction.dot(Jr),s=mi.dot(this.direction),c=-mi.dot(Jr),l=mi.lengthSq(),f=Math.abs(1-a*a),d,h,m,g;if(f>0)if(d=a*c-s,h=a*s-c,g=o*f,d>=0)if(h>=-g)if(h<=g){let x=1/f;d*=x,h*=x,m=d*(d+a*h+2*s)+h*(a*d+h+2*c)+l}else h=o,d=Math.max(0,-(a*h+s)),m=-d*d+h*(h+2*c)+l;else h=-o,d=Math.max(0,-(a*h+s)),m=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-a*o+s)),h=d>0?-o:Math.min(Math.max(-o,-c),o),m=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-o,-c),o),m=h*(h+2*c)+l):(d=Math.max(0,-(a*o+s)),h=d>0?o:Math.min(Math.max(-o,-c),o),m=-d*d+h*(h+2*c)+l);else h=a>0?-o:o,d=Math.max(0,-(a*h+s)),m=-d*d+h*(h+2*c)+l;return i&&i.copy(this.direction).multiplyScalar(d).add(this.origin),n&&n.copy(Jr).multiplyScalar(h).add(oo),m}intersectSphere(e,t){$t.subVectors(e.center,this.origin);let i=$t.dot(this.direction),n=$t.dot($t)-i*i,o=e.radius*e.radius;if(n>o)return null;let a=Math.sqrt(o-n),s=i-a,c=i+a;return s<0&&c<0?null:s<0?this.at(c,t):this.at(s,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,o,a,s,c,l=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,n=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,n=(e.min.x-h.x)*l),f>=0?(o=(e.min.y-h.y)*f,a=(e.max.y-h.y)*f):(o=(e.max.y-h.y)*f,a=(e.min.y-h.y)*f),i>a||o>n||((o>i||i!==i)&&(i=o),(a<n||n!==n)&&(n=a),d>=0?(s=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(s=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||s>n)||((s>i||i!==i)&&(i=s),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,t)}intersectsBox(e){return this.intersectBox(e,$t)!==null}intersectTriangle(e,t,i,n,o){ao.subVectors(t,e),Qr.subVectors(i,e),so.crossVectors(ao,Qr);let a=this.direction.dot(so),s;if(a>0){if(n)return null;s=1}else if(a<0)s=-1,a=-a;else return null;mi.subVectors(this.origin,e);let c=s*this.direction.dot(Qr.crossVectors(mi,Qr));if(c<0)return null;let l=s*this.direction.dot(ao.cross(mi));if(l<0||c+l>a)return null;let f=-s*mi.dot(so);return f<0?null:this.at(f/a,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};var Dt=new A,ei=new A,lo=new A,ti=new A,Wi=new A,Xi=new A,Ns=new A,co=new A,uo=new A,ho=new A,Pt=class{constructor(e=new A,t=new A,i=new A){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Dt.subVectors(e,t),n.cross(Dt);let o=n.lengthSq();return o>0?n.multiplyScalar(1/Math.sqrt(o)):n.set(0,0,0)}static getBarycoord(e,t,i,n,o){Dt.subVectors(n,t),ei.subVectors(i,t),lo.subVectors(e,t);let a=Dt.dot(Dt),s=Dt.dot(ei),c=Dt.dot(lo),l=ei.dot(ei),f=ei.dot(lo),d=a*l-s*s;if(d===0)return o.set(-2,-1,-1);let h=1/d,m=(l*c-s*f)*h,g=(a*f-s*c)*h;return o.set(1-m-g,g,m)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,ti),ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getUV(e,t,i,n,o,a,s,c){return this.getBarycoord(e,t,i,n,ti),c.set(0,0),c.addScaledVector(o,ti.x),c.addScaledVector(a,ti.y),c.addScaledVector(s,ti.z),c}static isFrontFacing(e,t,i,n){return Dt.subVectors(i,t),ei.subVectors(e,t),Dt.cross(ei).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Dt.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Dt.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,n,o){return Pt.getUV(e,this.a,this.b,this.c,t,i,n,o)}containsPoint(e){return Pt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,n=this.b,o=this.c,a,s;Wi.subVectors(n,i),Xi.subVectors(o,i),co.subVectors(e,i);let c=Wi.dot(co),l=Xi.dot(co);if(c<=0&&l<=0)return t.copy(i);uo.subVectors(e,n);let f=Wi.dot(uo),d=Xi.dot(uo);if(f>=0&&d<=f)return t.copy(n);let h=c*d-f*l;if(h<=0&&c>=0&&f<=0)return a=c/(c-f),t.copy(i).addScaledVector(Wi,a);ho.subVectors(e,o);let m=Wi.dot(ho),g=Xi.dot(ho);if(g>=0&&m<=g)return t.copy(o);let x=m*l-c*g;if(x<=0&&l>=0&&g<=0)return s=l/(l-g),t.copy(i).addScaledVector(Xi,s);let v=f*g-m*d;if(v<=0&&d-f>=0&&m-g>=0)return Ns.subVectors(o,n),s=(d-f)/(d-f+(m-g)),t.copy(n).addScaledVector(Ns,s);let u=1/(v+x+h);return a=x*u,s=h*u,t.copy(i).addScaledVector(Wi,a).addScaledVector(Xi,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};var Yi=class extends pt{constructor(e){super();this.type="MeshBasicMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Fi,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this}};Yi.prototype.isMeshBasicMaterial=!0;var Us=new Le,qi=new br,fo=new Zt,gi=new A,xi=new A,_i=new A,po=new A,mo=new A,go=new A,$r=new A,en=new A,tn=new A,rn=new ce,nn=new ce,on=new ce,xo=new A,an=new A,ke=class extends Fe{constructor(e=new je,t=new Yi){super();this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry;if(e.isBufferGeometry){let t=e.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=n.length;o<a;o++){let s=n[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=o}}}}else{let t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}raycast(e,t){let i=this.geometry,n=this.material,o=this.matrixWorld;if(n===void 0||(i.boundingSphere===null&&i.computeBoundingSphere(),fo.copy(i.boundingSphere),fo.applyMatrix4(o),e.ray.intersectsSphere(fo)===!1)||(Us.copy(o).invert(),qi.copy(e.ray).applyMatrix4(Us),i.boundingBox!==null&&qi.intersectsBox(i.boundingBox)===!1))return;let a;if(i.isBufferGeometry){let s=i.index,c=i.attributes.position,l=i.morphAttributes.position,f=i.morphTargetsRelative,d=i.attributes.uv,h=i.attributes.uv2,m=i.groups,g=i.drawRange;if(s!==null)if(Array.isArray(n))for(let x=0,v=m.length;x<v;x++){let u=m[x],p=n[u.materialIndex],T=Math.max(u.start,g.start),b=Math.min(u.start+u.count,g.start+g.count);for(let S=T,C=b;S<C;S+=3){let M=s.getX(S),j=s.getX(S+1),N=s.getX(S+2);a=sn(this,p,e,qi,c,l,f,d,h,M,j,N),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=u.materialIndex,t.push(a))}}else{let x=Math.max(0,g.start),v=Math.min(s.count,g.start+g.count);for(let u=x,p=v;u<p;u+=3){let T=s.getX(u),b=s.getX(u+1),S=s.getX(u+2);a=sn(this,n,e,qi,c,l,f,d,h,T,b,S),a&&(a.faceIndex=Math.floor(u/3),t.push(a))}}else if(c!==void 0)if(Array.isArray(n))for(let x=0,v=m.length;x<v;x++){let u=m[x],p=n[u.materialIndex],T=Math.max(u.start,g.start),b=Math.min(u.start+u.count,g.start+g.count);for(let S=T,C=b;S<C;S+=3){let M=S,j=S+1,N=S+2;a=sn(this,p,e,qi,c,l,f,d,h,M,j,N),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=u.materialIndex,t.push(a))}}else{let x=Math.max(0,g.start),v=Math.min(c.count,g.start+g.count);for(let u=x,p=v;u<p;u+=3){let T=u,b=u+1,S=u+2;a=sn(this,n,e,qi,c,l,f,d,h,T,b,S),a&&(a.faceIndex=Math.floor(u/3),t.push(a))}}}else i.isGeometry&&console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}};ke.prototype.isMesh=!0;function jh(r,e,t,i,n,o,a,s){let c;if(e.side===Ne?c=i.intersectTriangle(a,o,n,!0,s):c=i.intersectTriangle(n,o,a,e.side!==Et,s),c===null)return null;an.copy(s),an.applyMatrix4(r.matrixWorld);let l=t.ray.origin.distanceTo(an);return l<t.near||l>t.far?null:{distance:l,point:an.clone(),object:r}}function sn(r,e,t,i,n,o,a,s,c,l,f,d){gi.fromBufferAttribute(n,l),xi.fromBufferAttribute(n,f),_i.fromBufferAttribute(n,d);let h=r.morphTargetInfluences;if(o&&h){$r.set(0,0,0),en.set(0,0,0),tn.set(0,0,0);for(let g=0,x=o.length;g<x;g++){let v=h[g],u=o[g];v!==0&&(po.fromBufferAttribute(u,l),mo.fromBufferAttribute(u,f),go.fromBufferAttribute(u,d),a?($r.addScaledVector(po,v),en.addScaledVector(mo,v),tn.addScaledVector(go,v)):($r.addScaledVector(po.sub(gi),v),en.addScaledVector(mo.sub(xi),v),tn.addScaledVector(go.sub(_i),v)))}gi.add($r),xi.add(en),_i.add(tn)}r.isSkinnedMesh&&(r.boneTransform(l,gi),r.boneTransform(f,xi),r.boneTransform(d,_i));let m=jh(r,e,t,i,gi,xi,_i,xo);if(m){s&&(rn.fromBufferAttribute(s,l),nn.fromBufferAttribute(s,f),on.fromBufferAttribute(s,d),m.uv=Pt.getUV(xo,gi,xi,_i,rn,nn,on,new ce)),c&&(rn.fromBufferAttribute(c,l),nn.fromBufferAttribute(c,f),on.fromBufferAttribute(c,d),m.uv2=Pt.getUV(xo,gi,xi,_i,rn,nn,on,new ce));let g={a:l,b:f,c:d,normal:new A,materialIndex:0};Pt.getNormal(gi,xi,_i,g.normal),m.face=g}return m}var Bs=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vUv ).g;

#endif
`;var Gs=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var Os=`
#ifdef ALPHATEST

	if ( diffuseColor.a < ALPHATEST ) discard;

#endif
`;var zs=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );

	#endif

#endif
`;var js=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`;var Vs=`
vec3 transformed = vec3( position );
`;var ks=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`;var Hs=`

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile
vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {

	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	vec4 r = roughness * c0 + c1;

	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

	return vec2( - 1.04, 1.04 ) * a004 + r.zw;

}

float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

#if defined ( PHYSICALLY_CORRECT_LIGHTS )

	// based upon Frostbite 3 Moving to Physically-based Rendering
	// page 32, equation 26: E[window1]
	// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
	// this is intended to be used on spot and point lights who are represented as luminous intensity
	// but who must be converted to luminous irradiance for surface lighting calculation
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

	if( cutoffDistance > 0.0 ) {

		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

	}

	return distanceFalloff;

#else

	if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {

		return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );

	}

	return 1.0;

#endif

}

vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );

	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney\u2019s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
vec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( incidentLight.direction + viewDir );

	float dotNL = saturate( dot( normal, incidentLight.direction ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

	float D = D_GGX( alpha, dotNH );

	return F * ( V * D );

} // validated

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see referece)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

// ref: https://www.unrealengine.com/blog/physically-based-shading-on-mobile - environmentBRDF for GGX on mobile
vec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );

	return specularColor * brdf.x + brdf.y;

} // validated

// Fdez-Ag\xFCera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
void BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {

	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );

	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );

	vec3 FssEss = specularColor * brdf.x + brdf.y;

	float Ess = brdf.x + brdf.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );

	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotVH = saturate( dot( geometry.viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs#L94
float D_Charlie( float roughness, float NoH ) {

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / roughness;
	float cos2h = NoH * NoH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs#L136
float V_Neubelt( float NoV, float NoL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( NoL + NoV - NoL * NoV ) ) );

}

vec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {

	vec3 N = geometry.normal;
	vec3 V = geometry.viewDir;

	vec3 H = normalize( V + L );
	float dotNH = saturate( dot( N, H ) );

	return specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );

}

#endif
`;var Ws=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// http://api.unrealengine.com/attachments/Engine/Rendering/LightingAndShadows/BumpMappingWithoutTangentSpace/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );

		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;		// normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`;var Xs=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

	}
	#pragma unroll_loop_end

	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

		bool clipped = true;

		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

		}
		#pragma unroll_loop_end

		if ( clipped ) discard;

	#endif

#endif
`;var Ys=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`;var qs=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`;var Zs=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`;var Ks=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`;var Js=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`;var Qs=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	varying vec3 vColor;

#endif
`;var $s=`
#if defined( USE_COLOR_ALPHA )

	vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif
`;var el=`
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef CLEARCOAT
	vec3 clearcoatNormal;
#endif
};

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

mat3 transposeMat3( const in mat3 m ) {

	mat3 tmp;

	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

	return tmp;

}

// https://en.wikipedia.org/wiki/Relative_luminance
float linearToRelativeLuminance( const in vec3 color ) {

	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );

	return dot( weights, color.rgb );

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}
`;var tl=`
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );

		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );

		vec2 f = fract( uv );

		uv += 0.5 - f;

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		if ( mipInt < cubeUV_maxMipLevel ) {

			uv.y += 2.0 * cubeUV_maxTileSize;

		}

		uv.y += filterInt * 2.0 * cubeUV_minTileSize;

		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );

		uv *= texelSize;

		vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;

		uv.x += texelSize;

		vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;

		uv.y += texelSize;

		vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;

		uv.x -= texelSize;

		vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;

		vec3 tm = mix( tl, tr, f.x );

		vec3 bm = mix( bl, br, f.x );

		return mix( tm, bm, f.y );

	}

	// These defines must match with PMREMGenerator

	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= r1 ) {

			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;

		} else if ( roughness >= r4 ) {

			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;

		} else if ( roughness >= r5 ) {

			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;

		} else if ( roughness >= r6 ) {

			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`;var il=`
vec3 transformedNormal = objectNormal;

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 m = mat3( instanceMatrix );

	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );

	transformedNormal = m * transformedNormal;

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`;var rl=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`;var nl=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );

#endif
`;var ol=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vUv );

	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`;var al=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`;var sl=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`;var ll=`
// For a discussion of what this is, please read this: http://lousodrome.net/blog/light/2013/05/26/gamma-correct-and-hdr-rendering-in-a-32-bits-buffer/

vec4 LinearToLinear( in vec4 value ) {
	return value;
}

vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}

vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}

vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}

vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
	// return vec4( value.brg, ( 3.0 + 128.0 ) / 256.0 );
}

// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}

vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}

// reference: http://iwasbeingirony.blogspot.ca/2010/06/difference-between-rgbm-and-rgbd.html
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}

vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	// NOTE: The implementation with min causes the shader to not compile on
	// a common Alcatel A502DL in Chrome 78/Android 8.1. Some research suggests 
	// that the chipset is Mediatek MT6739 w/ IMG PowerVR GE8100 GPU.
	// D = min( floor( D ) / 255.0, 1.0 );
	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}

// LogLuv reference: http://graphicrants.blogspot.ca/2009/04/rgbm-color-encoding.html

// M matrix, for encoding
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract( Le );
	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
	return vResult;
}

// Inverse M matrix, for decoding
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
	return vec4( max( vRGB, 0.0 ), 1.0 );
}
`;var cl=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

		envColor = envMapTexelToLinear( envColor );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );

	#else

		vec4 envColor = vec4( 0.0 );

	#endif

	#ifdef ENVMAP_BLENDING_MULTIPLY

		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_MIX )

		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_ADD )

		outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif
`;var ul=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform int maxMipLevel;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`;var hl=`
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`;var fl=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`;var dl=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`;var pl=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`;var ml=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`;var gl=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`;var xl=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`;var _l=`

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return texture2D( gradientMap, coord ).rgb;

	#else

		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );

	#endif

}
`;var vl=`
#ifdef USE_LIGHTMAP

	vec4 lightMapTexel= texture2D( lightMap, vUv2 );
	reflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity; // factor of PI should not be present; included here to prevent breakage

#endif
`;var Ml=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`;var yl=`
vec3 diffuse = vec3( 1.0 );

GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );

GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;

vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif

IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;

vIndirectFront += getAmbientLightIrradiance( ambientLightColor );

vIndirectFront += getLightProbeIrradiance( lightProbe, geometry );

#ifdef DOUBLE_SIDED

	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );

	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );

#endif

#if NUM_POINT_LIGHTS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );

		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;

		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;

		#ifdef DOUBLE_SIDED

			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;

		#endif

	}
	#pragma unroll_loop_end

#endif

#if NUM_SPOT_LIGHTS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );

		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;

		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;

		#ifdef DOUBLE_SIDED

			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;

		#endif
	}
	#pragma unroll_loop_end

#endif

/*
#if NUM_RECT_AREA_LIGHTS > 0

	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		// TODO (abelnation): implement

	}

#endif
*/

#if NUM_DIR_LIGHTS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );

		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;

		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;

		#ifdef DOUBLE_SIDED

			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;

		#endif

	}
	#pragma unroll_loop_end

#endif

#if NUM_HEMI_LIGHTS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );

		#ifdef DOUBLE_SIDED

			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );

		#endif

	}
	#pragma unroll_loop_end

#endif
`;var Sl=`
uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {

	vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	#ifndef PHYSICALLY_CORRECT_LIGHTS

		irradiance *= PI;

	#endif

	return irradiance;

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {

		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// directLight is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {

		vec3 lVector = pointLight.position - geometry.position;
		directLight.direction = normalize( lVector );

		float lightDistance = length( lVector );

		directLight.color = pointLight.color;
		directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
		directLight.visible = ( directLight.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// directLight is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {

		vec3 lVector = spotLight.position - geometry.position;
		directLight.direction = normalize( lVector );

		float lightDistance = length( lVector );
		float angleCos = dot( directLight.direction, spotLight.direction );

		if ( angleCos > spotLight.coneCos ) {

			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );

			directLight.color = spotLight.color;
			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
			directLight.visible = true;

		} else {

			directLight.color = vec3( 0.0 );
			directLight.visible = false;

		}
	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {

		float dotNL = dot( geometry.normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		#ifndef PHYSICALLY_CORRECT_LIGHTS

			irradiance *= PI;

		#endif

		return irradiance;

	}

#endif
`;var bl=`
#if defined( USE_ENVMAP )

	#ifdef ENVMAP_MODE_REFRACTION

		uniform float refractionRatio;

	#endif

	vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {

		#if defined( ENVMAP_TYPE_CUBE_UV )

			vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {

		#if defined( ENVMAP_TYPE_CUBE_UV )

			vec3 reflectVec;

			#ifdef ENVMAP_MODE_REFLECTION

				reflectVec = reflect( - viewDir, normal );

				// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
				reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			#else

				reflectVec = refract( - viewDir, normal, refractionRatio );

			#endif

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

#endif
`;var El=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`;var Tl=`
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;

	#ifndef PHYSICALLY_CORRECT_LIGHTS

		irradiance *= PI; // punctual light

	#endif

	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon

#define Material_LightProbeLOD( material )	(0)
`;var wl=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`;var Al=`
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	#ifndef PHYSICALLY_CORRECT_LIGHTS

		irradiance *= PI; // punctual light

	#endif

	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong

#define Material_LightProbeLOD( material )	(0)
`;var Ll=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.specularRoughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.specularRoughness += geometryRoughness;
material.specularRoughness = min( material.specularRoughness, 1.0 );

#ifdef IOR

	#ifdef SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularTintFactor = specularTint;

		#ifdef USE_SPECULARINTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;

		#endif

		#ifdef USE_SPECULARTINTMAP

			specularTintFactor *= specularTintMapTexelToLinear( texture2D( specularTintMap, vUv ) ).rgb;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularTintFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = mix( min( pow2( ( ior - 1.0 ) / ( ior + 1.0 ) ) * specularTintFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheen;

#endif
`;var Rl=`
struct PhysicalMaterial {

	vec3 diffuseColor;
	float specularRoughness;
	vec3 specularColor;
	float specularF90;

#ifdef CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	vec3 sheenColor;
#endif

};

#define DEFAULT_SPECULAR_COEFFICIENT 0.04

// Clear coat directional hemishperical reflectance (this approximation should be improved)
float clearcoatDHRApprox( const in float roughness, const in float dotNL ) {

	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifndef PHYSICALLY_CORRECT_LIGHTS

		irradiance *= PI; // punctual light

	#endif

	#ifdef CLEARCOAT

		float ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = ccDotNL * directLight.color;

		#ifndef PHYSICALLY_CORRECT_LIGHTS

			ccIrradiance *= PI; // punctual light

		#endif

		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );

		reflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), 1.0, material.clearcoatRoughness );

	#else

		float clearcoatDHR = 0.0;

	#endif

	#ifdef USE_SHEEN

		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(
			material.specularRoughness,
			directLight.direction,
			geometry,
			material.sheenColor
		);

	#else

		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.specularRoughness );

	#endif

	reflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef CLEARCOAT

		float ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );

		reflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );

		float ccDotNL = ccDotNV;
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );

	#else

		float clearcoatDHR = 0.0;

	#endif

	float clearcoatInv = 1.0 - clearcoatDHR;

	// Both indirect specular and indirect diffuse light accumulate here

	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );

	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );

	reflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`;var Cl=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - If you have defined an RE_IndirectSpecular, you need to also provide a Material_LightProbeLOD. <---- ???
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

GeometricContext geometry;

geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

#ifdef CLEARCOAT

	geometry.clearcoatNormal = clearcoatNormal;

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointDirectLightIrradiance( pointLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotDirectLightIrradiance( spotLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	irradiance += getLightProbeIrradiance( lightProbe, geometry );

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`;var Dl=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;

		#ifndef PHYSICALLY_CORRECT_LIGHTS

			lightMapIrradiance *= PI; // factor of PI should not be present; included here to prevent breakage

		#endif

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )

		iblIrradiance += getLightProbeIndirectIrradiance( /*lightProbe,*/ geometry, maxMipLevel );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	radiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );

	#ifdef CLEARCOAT

		clearcoatRadiance += getLightProbeIndirectRadiance( /*specularLightProbe,*/ geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );

	#endif

#endif
`;var Pl=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );

#endif
`;var Fl=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`;var Il=`
#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var Nl=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		varying float vFragDepth;
		varying float vIsPerspective;

	#else

		uniform float logDepthBufFC;

	#endif

#endif
`;var Ul=`
#ifdef USE_LOGDEPTHBUF

	#ifdef USE_LOGDEPTHBUF_EXT

		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

	#else

		if ( isPerspectiveMatrix( projectionMatrix ) ) {

			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;

			gl_Position.z *= gl_Position.w;

		}

	#endif

#endif
`;var Bl=`
#ifdef USE_MAP

	vec4 texelColor = texture2D( map, vUv );

	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;

#endif
`;var Gl=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`;var Ol=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

#endif

#ifdef USE_MAP

	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`;var zl=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	uniform mat3 uvTransform;

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var jl=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`;var Vl=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`;var kl=`
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;
	objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
	objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
	objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
	objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];

#endif
`;var Hl=`
#ifdef USE_MORPHTARGETS

	uniform float morphTargetBaseInfluence;

	#ifndef USE_MORPHNORMALS

		uniform float morphTargetInfluences[ 8 ];

	#else

		uniform float morphTargetInfluences[ 4 ];

	#endif

#endif
`;var Wl=`
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;
	transformed += morphTarget0 * morphTargetInfluences[ 0 ];
	transformed += morphTarget1 * morphTargetInfluences[ 1 ];
	transformed += morphTarget2 * morphTargetInfluences[ 2 ];
	transformed += morphTarget3 * morphTargetInfluences[ 3 ];

	#ifndef USE_MORPHNORMALS

		transformed += morphTarget4 * morphTargetInfluences[ 4 ];
		transformed += morphTarget5 * morphTargetInfluences[ 5 ];
		transformed += morphTarget6 * morphTargetInfluences[ 6 ];
		transformed += morphTarget7 * morphTargetInfluences[ 7 ];

	#endif

#endif
`;var Xl=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	// Workaround for Adreno GPUs not able to do dFdx( vViewPosition )

	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	#ifdef USE_TANGENT

		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );

		#ifdef DOUBLE_SIDED

			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;

		#endif

		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )

			mat3 vTBN = mat3( tangent, bitangent, normal );

		#endif

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 geometryNormal = normal;

`;var Yl=`

#ifdef OBJECTSPACE_NORMALMAP

	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( TANGENTSPACE_NORMALMAP )

	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	#ifdef USE_TANGENT

		normal = normalize( vTBN * mapN );

	#else

		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );

	#endif

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`;var ql=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Zl=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Kl=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`;var Jl=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef OBJECTSPACE_NORMALMAP

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {

		// Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );

		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );

	}

#endif
`;var Ql=`
#ifdef CLEARCOAT

	vec3 clearcoatNormal = geometryNormal;

#endif
`;var $l=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	#ifdef USE_TANGENT

		clearcoatNormal = normalize( vTBN * clearcoatMapN );

	#else

		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );

	#endif

#endif
`;var ec=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif
`;var tc=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)

const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );

const float ShiftRight8 = 1. / 256.;

vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8; // tidy overflow
	return r * PackUpscale;
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}

vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ/eyeZ is < 0 when in front of the camera per OpenGL conventions

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}
`;var ic=`
#ifdef PREMULTIPLIED_ALPHA

	// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`;var rc=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`;var nc=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`;var oc=`
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift acording to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`;var ac=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`;var sc=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`;var lc=`
#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];

		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): create uniforms for area light shadows

	#endif
	*/

	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );

	}

	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {

		return unpackRGBATo2Half( texture2D( shadow, uv ) );

	}

	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){

		float occlusion = 1.0;

		vec2 distribution = texture2DDistribution( shadow, uv );

		float hard_shadow = step( compare , distribution.x ); // Hard Shadow

		if (hard_shadow != 1.0 ) {

			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

		}
		return occlusion;

	}

	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

		float shadow = 1.0;

		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;

		// if ( something && something ) breaks ATI OpenGL shader compiler
		// if ( all( something, something ) ) using this instead

		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );

		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );

		bool frustumTest = all( frustumTestVec );

		if ( frustumTest ) {

		#if defined( SHADOWMAP_TYPE_PCF )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;

			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );

		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;

			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;

			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );

		#elif defined( SHADOWMAP_TYPE_VSM )

			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

		#else // no percentage-closer filtering:

			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

		#endif

		}

		return shadow;

	}

	// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
	// vector suitable for 2D texture mapping. This code uses the following layout for the
	// 2D texture:
	//
	// xzXZ
	//  y Y
	//
	// Y - Positive y direction
	// y - Negative y direction
	// X - Positive x direction
	// x - Negative x direction
	// Z - Positive z direction
	// z - Negative z direction
	//
	// Source and test bed:
	// https://gist.github.com/tschw/da10c43c467ce8afd0c4

	vec2 cubeToUV( vec3 v, float texelSizeY ) {

		// Number of texels to avoid at the edge of each square

		vec3 absV = abs( v );

		// Intersect unit cube

		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;

		// Apply scale to avoid seams

		// two texels less per square (one texel will do for NEAREST)
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

		// Unwrap

		// space: -1 ... 1 range for each square
		//
		// #X##		dim    := ( 4 , 2 )
		//  # #		center := ( 1 , 1 )

		vec2 planar = v.xy;

		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;

		if ( absV.z >= almostOne ) {

			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;

		} else if ( absV.x >= almostOne ) {

			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;

		} else if ( absV.y >= almostOne ) {

			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;

		}

		// Transform to UV space

		// scale := 0.5 / dim
		// translate := ( center + 0.5 ) / dim
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

	}

	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;

		// dp = normalized distance from light to fragment position
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
		dp += shadowBias;

		// bd3D = base direction 3D
		vec3 bd3D = normalize( lightToPosition );

		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )

			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );

		#else // no percentage-closer filtering

			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

		#endif

	}

#endif
`;var cc=`
#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];

		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`;var uc=`
#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0

		// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;

	#endif

	#if NUM_DIR_LIGHT_SHADOWS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif
`;var hc=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`;var fc=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`;var dc=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	#ifdef BONE_TEXTURE

		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;

		mat4 getBoneMatrix( const in float i ) {

			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );

			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );

			y = dy * ( y + 0.5 );

			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );

			mat4 bone = mat4( v1, v2, v3, v4 );

			return bone;

		}

	#else

		uniform mat4 boneMatrices[ MAX_BONES ];

		mat4 getBoneMatrix( const in float i ) {

			mat4 bone = boneMatrices[ int(i) ];
			return bone;

		}

	#endif

#endif
`;var pc=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`;var mc=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`;var gc=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`;var xc=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`;var _c=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`;var vc=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return toneMappingExposure * color;

}

// source: https://www.cs.utah.edu/~reinhard/cdrom/
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 OptimizedCineonToneMapping( vec3 color ) {

	// optimized filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`;var Mc=`
#ifdef USE_TRANSMISSION

	float transmissionFactor = transmission;
	float thicknessFactor = thickness;

	#ifdef USE_TRANSMISSIONMAP

		transmissionFactor *= texture2D( transmissionMap, vUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		thicknessFactor *= texture2D( thicknessMap, vUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );

	vec3 transmission = transmissionFactor * getIBLVolumeRefraction(
		n, v, roughnessFactor, material.diffuseColor, material.specularColor,
		pos, modelMatrix, viewMatrix, projectionMatrix, ior, thicknessFactor,
		attenuationTint, attenuationDistance );

	totalDiffuse = mix( totalDiffuse, transmission, transmissionFactor );
#endif
`;var yc=`
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationTint;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	vec3 getVolumeTransmissionRay( vec3 n, vec3 v, float thickness, float ior, mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independant scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( float roughness, float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec3 getTransmissionSample( vec2 fragCoord, float roughness, float ior ) {

		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );

		#ifdef TEXTURE_LOD_EXT

			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod ).rgb;

		#else

			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod ).rgb;

		#endif

	}

	vec3 applyVolumeAttenuation( vec3 radiance, float transmissionDistance, vec3 attenuationColor, float attenuationDistance ) {

		if ( attenuationDistance == 0.0 ) {

			// Attenuation distance is +\u221E (which we indicate by zero), i.e. the transmitted color is not attenuated at all.
			return radiance;

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance * radiance;

		}

	}

	vec3 getIBLVolumeRefraction( vec3 n, vec3 v, float perceptualRoughness, vec3 baseColor, vec3 specularColor,
		vec3 position, mat4 modelMatrix, mat4 viewMatrix, mat4 projMatrix, float ior, float thickness,
		vec3 attenuationColor, float attenuationDistance ) {

		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;

		// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;

		// Sample framebuffer to get pixel the refracted ray hits.
		vec3 transmittedLight = getTransmissionSample( refractionCoords, perceptualRoughness, ior );

		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight, length( transmissionRay ), attenuationColor, attenuationDistance );

		return ( 1.0 - specularColor ) * attenuatedColor * baseColor;

	}
#endif
`;var Sc=`
#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )

	varying vec2 vUv;

#endif
`;var bc=`
#ifdef USE_UV

	#ifdef UVS_VERTEX_ONLY

		vec2 vUv;

	#else

		varying vec2 vUv;

	#endif

	uniform mat3 uvTransform;

#endif
`;var Ec=`
#ifdef USE_UV

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

#endif
`;var Tc=`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	varying vec2 vUv2;

#endif
`;var wc=`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	attribute vec2 uv2;
	varying vec2 vUv2;

	uniform mat3 uv2Transform;

#endif
`;var Ac=`
#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )

	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;

#endif
`;var Lc=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION )

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`;var Rc=`
uniform sampler2D t2D;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	gl_FragColor = mapTexelToLinear( texColor );

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`;var Cc=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`;var Dc=`
#include <envmap_common_pars_fragment>
uniform float opacity;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>

	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`;var Pc=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`;var Fc=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#endif

}
`;var Ic=`
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <skinbase_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}
`;var Nc=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( 1.0 );

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`;var Uc=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <skinbase_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`;var Bc=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	vec4 texColor = texture2D( tEquirect, sampleUV );

	gl_FragColor = mapTexelToLinear( texColor );

	#include <tonemapping_fragment>
	#include <encodings_fragment>

}
`;var Gc=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`;var Oc=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var zc=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`;var jc=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP
	
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Vc=`
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`;var kc=`
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

varying vec3 vLightFront;
varying vec3 vIndirectFront;

#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif


#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>

	// accumulation

	#ifdef DOUBLE_SIDED

		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;

	#else

		reflectedLight.indirectDiffuse += vIndirectFront;

	#endif

	#include <lightmap_fragment>

	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );

	#ifdef DOUBLE_SIDED

		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;

	#else

		reflectedLight.directDiffuse = vLightFront;

	#endif

	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();

	// modulation

	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}
`;var Hc=`
#define LAMBERT

varying vec3 vLightFront;
varying vec3 vIndirectFront;

#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}
`;var Wc=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>

#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );

	#else

		vec4 matcapColor = vec4( 1.0 );

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Xc=`
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`;var Yc=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )

	varying vec3 vViewPosition;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );

}
`;var qc=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )

	varying vec3 vViewPosition;

#endif

#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )

	vViewPosition = - mvPosition.xyz;

#endif

}
`;var Zc=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Kc=`
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`;var Jc=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define CLEARCOAT
	#define SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularTint;

	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif

	#ifdef USE_SPECULARTINTMAP
		uniform sampler2D specularTintMap;
	#endif
#endif

#ifdef CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheen;
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <transmission_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Qc=`
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`;var $c=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var eu=`
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`;var tu=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>

	outgoingLight = diffuseColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var iu=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`;var ru=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`;var nu=`
#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`;var ou=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>

	outgoingLight = diffuseColor.rgb;

	gl_FragColor = vec4( outgoingLight, diffuseColor.a );

	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>

}
`;var au=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`;var we={alphamap_fragment:Bs,alphamap_pars_fragment:Gs,alphatest_fragment:Os,aomap_fragment:zs,aomap_pars_fragment:js,begin_vertex:Vs,beginnormal_vertex:ks,bsdfs:Hs,bumpmap_pars_fragment:Ws,clipping_planes_fragment:Xs,clipping_planes_pars_fragment:Ys,clipping_planes_pars_vertex:qs,clipping_planes_vertex:Zs,color_fragment:Ks,color_pars_fragment:Js,color_pars_vertex:Qs,color_vertex:$s,common:el,cube_uv_reflection_fragment:tl,defaultnormal_vertex:il,displacementmap_pars_vertex:rl,displacementmap_vertex:nl,emissivemap_fragment:ol,emissivemap_pars_fragment:al,encodings_fragment:sl,encodings_pars_fragment:ll,envmap_fragment:cl,envmap_common_pars_fragment:ul,envmap_pars_fragment:hl,envmap_pars_vertex:fl,envmap_physical_pars_fragment:bl,envmap_vertex:dl,fog_vertex:pl,fog_pars_vertex:ml,fog_fragment:gl,fog_pars_fragment:xl,gradientmap_pars_fragment:_l,lightmap_fragment:vl,lightmap_pars_fragment:Ml,lights_lambert_vertex:yl,lights_pars_begin:Sl,lights_toon_fragment:El,lights_toon_pars_fragment:Tl,lights_phong_fragment:wl,lights_phong_pars_fragment:Al,lights_physical_fragment:Ll,lights_physical_pars_fragment:Rl,lights_fragment_begin:Cl,lights_fragment_maps:Dl,lights_fragment_end:Pl,logdepthbuf_fragment:Fl,logdepthbuf_pars_fragment:Il,logdepthbuf_pars_vertex:Nl,logdepthbuf_vertex:Ul,map_fragment:Bl,map_pars_fragment:Gl,map_particle_fragment:Ol,map_particle_pars_fragment:zl,metalnessmap_fragment:jl,metalnessmap_pars_fragment:Vl,morphnormal_vertex:kl,morphtarget_pars_vertex:Hl,morphtarget_vertex:Wl,normal_fragment_begin:Xl,normal_fragment_maps:Yl,normal_pars_fragment:ql,normal_pars_vertex:Zl,normal_vertex:Kl,normalmap_pars_fragment:Jl,clearcoat_normal_fragment_begin:Ql,clearcoat_normal_fragment_maps:$l,clearcoat_pars_fragment:ec,packing:tc,premultiplied_alpha_fragment:ic,project_vertex:rc,dithering_fragment:nc,dithering_pars_fragment:oc,roughnessmap_fragment:ac,roughnessmap_pars_fragment:sc,shadowmap_pars_fragment:lc,shadowmap_pars_vertex:cc,shadowmap_vertex:uc,shadowmask_pars_fragment:hc,skinbase_vertex:fc,skinning_pars_vertex:dc,skinning_vertex:pc,skinnormal_vertex:mc,specularmap_fragment:gc,specularmap_pars_fragment:xc,tonemapping_fragment:_c,tonemapping_pars_fragment:vc,transmission_fragment:Mc,transmission_pars_fragment:yc,uv_pars_fragment:Sc,uv_pars_vertex:bc,uv_vertex:Ec,uv2_pars_fragment:Tc,uv2_pars_vertex:wc,uv2_vertex:Ac,worldpos_vertex:Lc,background_frag:Rc,background_vert:Cc,cube_frag:Dc,cube_vert:Pc,depth_frag:Fc,depth_vert:Ic,distanceRGBA_frag:Nc,distanceRGBA_vert:Uc,equirect_frag:Bc,equirect_vert:Gc,linedashed_frag:Oc,linedashed_vert:zc,meshbasic_frag:jc,meshbasic_vert:Vc,meshlambert_frag:kc,meshlambert_vert:Hc,meshmatcap_frag:Wc,meshmatcap_vert:Xc,meshnormal_frag:Yc,meshnormal_vert:qc,meshphong_frag:Zc,meshphong_vert:Kc,meshphysical_frag:Jc,meshphysical_vert:Qc,meshtoon_frag:$c,meshtoon_vert:eu,points_frag:tu,points_vert:iu,shadow_frag:ru,shadow_vert:nu,sprite_frag:ou,sprite_vert:au};var Z={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new Ve},uv2Transform:{value:new Ve},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new Ve}}};var St={basic:{uniforms:nt([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:we.meshbasic_vert,fragmentShader:we.meshbasic_frag},lambert:{uniforms:nt([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.fog,Z.lights,{emissive:{value:new ue(0)}}]),vertexShader:we.meshlambert_vert,fragmentShader:we.meshlambert_frag},phong:{uniforms:nt([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:we.meshphong_vert,fragmentShader:we.meshphong_frag},standard:{uniforms:nt([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:we.meshphysical_vert,fragmentShader:we.meshphysical_frag},toon:{uniforms:nt([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new ue(0)}}]),vertexShader:we.meshtoon_vert,fragmentShader:we.meshtoon_frag},matcap:{uniforms:nt([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:we.meshmatcap_vert,fragmentShader:we.meshmatcap_frag},points:{uniforms:nt([Z.points,Z.fog]),vertexShader:we.points_vert,fragmentShader:we.points_frag},dashed:{uniforms:nt([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:we.linedashed_vert,fragmentShader:we.linedashed_frag},depth:{uniforms:nt([Z.common,Z.displacementmap]),vertexShader:we.depth_vert,fragmentShader:we.depth_frag},normal:{uniforms:nt([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:we.meshnormal_vert,fragmentShader:we.meshnormal_frag},sprite:{uniforms:nt([Z.sprite,Z.fog]),vertexShader:we.sprite_vert,fragmentShader:we.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null}},vertexShader:we.background_vert,fragmentShader:we.background_frag},cube:{uniforms:nt([Z.envmap,{opacity:{value:1}}]),vertexShader:we.cube_vert,fragmentShader:we.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:we.equirect_vert,fragmentShader:we.equirect_frag},distanceRGBA:{uniforms:nt([Z.common,Z.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:we.distanceRGBA_vert,fragmentShader:we.distanceRGBA_frag},shadow:{uniforms:nt([Z.lights,Z.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:we.shadow_vert,fragmentShader:we.shadow_frag}};St.physical={uniforms:nt([St.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new ce(1,1)},clearcoatNormalMap:{value:null},sheen:{value:new ue(0)},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationTint:{value:new ue(0)},specularIntensity:{value:0},specularIntensityMap:{value:null},specularTint:{value:new ue(1,1,1)},specularTintMap:{value:null}}]),vertexShader:we.meshphysical_vert,fragmentShader:we.meshphysical_frag};function su(r,e,t,i,n){let o=new ue(0),a=0,s,c,l=null,f=0,d=null;function h(g,x){let v=!1,u=x.isScene===!0?x.background:null;u&&u.isTexture&&(u=e.get(u));let p=r.xr,T=p.getSession&&p.getSession();T&&T.environmentBlendMode==="additive"&&(u=null),u===null?m(o,a):u&&u.isColor&&(m(u,1),v=!0),(r.autoClear||v)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),u&&(u.isCubeTexture||u.mapping===si)?(c===void 0&&(c=new ke(new Jt(1,1,1),new ct({name:"BackgroundCubeMaterial",uniforms:Qt(St.cube.uniforms),vertexShader:St.cube.vertexShader,fragmentShader:St.cube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,S,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=u,c.material.uniforms.flipEnvMap.value=u.isCubeTexture&&u.isRenderTargetTexture===!1?-1:1,(l!==u||f!==u.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,l=u,f=u.version,d=r.toneMapping),g.unshift(c,c.geometry,c.material,0,0,null)):u&&u.isTexture&&(s===void 0&&(s=new ke(new Ct(2,2),new ct({name:"BackgroundMaterial",uniforms:Qt(St.background.uniforms),vertexShader:St.background.vertexShader,fragmentShader:St.background.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),s.geometry.deleteAttribute("normal"),Object.defineProperty(s.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(s)),s.material.uniforms.t2D.value=u,u.matrixAutoUpdate===!0&&u.updateMatrix(),s.material.uniforms.uvTransform.value.copy(u.matrix),(l!==u||f!==u.version||d!==r.toneMapping)&&(s.material.needsUpdate=!0,l=u,f=u.version,d=r.toneMapping),g.unshift(s,s.geometry,s.material,0,0,null))}function m(g,x){t.buffers.color.setClear(g.r,g.g,g.b,x,n)}return{getClearColor:function(){return o},setClearColor:function(g,x=1){o.set(g),a=x,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(g){a=g,m(o,a)},render:h}}function lu(r,e,t,i){let n=r.getParameter(r.MAX_VERTEX_ATTRIBS),o=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||o!==null,s={},c=x(null),l=c;function f(G,P,U,z,W){let te=!1;if(a){let oe=g(z,U,P);l!==oe&&(l=oe,h(l.object)),te=v(z,W),te&&u(z,W)}else{let oe=P.wireframe===!0;(l.geometry!==z.id||l.program!==U.id||l.wireframe!==oe)&&(l.geometry=z.id,l.program=U.id,l.wireframe=oe,te=!0)}G.isInstancedMesh===!0&&(te=!0),W!==null&&t.update(W,r.ELEMENT_ARRAY_BUFFER),te&&(M(G,P,U,z),W!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function d(){return i.isWebGL2?r.createVertexArray():o.createVertexArrayOES()}function h(G){return i.isWebGL2?r.bindVertexArray(G):o.bindVertexArrayOES(G)}function m(G){return i.isWebGL2?r.deleteVertexArray(G):o.deleteVertexArrayOES(G)}function g(G,P,U){let z=U.wireframe===!0,W=s[G.id];W===void 0&&(W={},s[G.id]=W);let te=W[P.id];te===void 0&&(te={},W[P.id]=te);let oe=te[z];return oe===void 0&&(oe=x(d()),te[z]=oe),oe}function x(G){let P=[],U=[],z=[];for(let W=0;W<n;W++)P[W]=0,U[W]=0,z[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:z,object:G,attributes:{},index:null}}function v(G,P){let U=l.attributes,z=G.attributes,W=0;for(let te in z){let oe=U[te],fe=z[te];if(oe===void 0||oe.attribute!==fe||oe.data!==fe.data)return!0;W++}return l.attributesNum!==W||l.index!==P}function u(G,P){let U={},z=G.attributes,W=0;for(let te in z){let oe=z[te],fe={};fe.attribute=oe,oe.data&&(fe.data=oe.data),U[te]=fe,W++}l.attributes=U,l.attributesNum=W,l.index=P}function p(){let G=l.newAttributes;for(let P=0,U=G.length;P<U;P++)G[P]=0}function T(G){b(G,0)}function b(G,P){let U=l.newAttributes,z=l.enabledAttributes,W=l.attributeDivisors;U[G]=1,z[G]===0&&(r.enableVertexAttribArray(G),z[G]=1),W[G]!==P&&((i.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](G,P),W[G]=P)}function S(){let G=l.newAttributes,P=l.enabledAttributes;for(let U=0,z=P.length;U<z;U++)P[U]!==G[U]&&(r.disableVertexAttribArray(U),P[U]=0)}function C(G,P,U,z,W,te){i.isWebGL2===!0&&(U===r.INT||U===r.UNSIGNED_INT)?r.vertexAttribIPointer(G,P,U,W,te):r.vertexAttribPointer(G,P,U,z,W,te)}function M(G,P,U,z){if(i.isWebGL2===!1&&(G.isInstancedMesh||z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;p();let W=z.attributes,te=U.getAttributes(),oe=P.defaultAttributeValues;for(let fe in te){let ie=te[fe];if(ie>=0){let Ae=W[fe];if(Ae!==void 0){let k=Ae.normalized,q=Ae.itemSize,J=t.get(Ae);if(J===void 0)continue;let w=J.buffer,xe=J.type,ye=J.bytesPerElement;if(Ae.isInterleavedBufferAttribute){let de=Ae.data,he=de.stride,Re=Ae.offset;de&&de.isInstancedInterleavedBuffer?(b(ie,de.meshPerAttribute),z._maxInstanceCount===void 0&&(z._maxInstanceCount=de.meshPerAttribute*de.count)):T(ie),r.bindBuffer(r.ARRAY_BUFFER,w),C(ie,q,xe,k,he*ye,Re*ye)}else Ae.isInstancedBufferAttribute?(b(ie,Ae.meshPerAttribute),z._maxInstanceCount===void 0&&(z._maxInstanceCount=Ae.meshPerAttribute*Ae.count)):T(ie),r.bindBuffer(r.ARRAY_BUFFER,w),C(ie,q,xe,k,0,0)}else if(fe==="instanceMatrix"){let k=t.get(G.instanceMatrix);if(k===void 0)continue;let q=k.buffer,J=k.type;b(ie+0,1),b(ie+1,1),b(ie+2,1),b(ie+3,1),r.bindBuffer(r.ARRAY_BUFFER,q),r.vertexAttribPointer(ie+0,4,J,!1,64,0),r.vertexAttribPointer(ie+1,4,J,!1,64,16),r.vertexAttribPointer(ie+2,4,J,!1,64,32),r.vertexAttribPointer(ie+3,4,J,!1,64,48)}else if(fe==="instanceColor"){let k=t.get(G.instanceColor);if(k===void 0)continue;let q=k.buffer,J=k.type;b(ie,1),r.bindBuffer(r.ARRAY_BUFFER,q),r.vertexAttribPointer(ie,3,J,!1,12,0)}else if(oe!==void 0){let k=oe[fe];if(k!==void 0)switch(k.length){case 2:r.vertexAttrib2fv(ie,k);break;case 3:r.vertexAttrib3fv(ie,k);break;case 4:r.vertexAttrib4fv(ie,k);break;default:r.vertexAttrib1fv(ie,k)}}}}S()}function j(){B();for(let G in s){let P=s[G];for(let U in P){let z=P[U];for(let W in z)m(z[W].object),delete z[W];delete P[U]}delete s[G]}}function N(G){if(s[G.id]===void 0)return;let P=s[G.id];for(let U in P){let z=P[U];for(let W in z)m(z[W].object),delete z[W];delete P[U]}delete s[G.id]}function O(G){for(let P in s){let U=s[P];if(U[G.id]===void 0)continue;let z=U[G.id];for(let W in z)m(z[W].object),delete z[W];delete U[G.id]}}function B(){$(),l!==c&&(l=c,h(l.object))}function $(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:f,reset:B,resetDefaultState:$,dispose:j,releaseStatesOfGeometry:N,releaseStatesOfProgram:O,initAttributes:p,enableAttribute:T,disableUnusedAttributes:S}}function cu(r,e,t,i){let n=i.isWebGL2,o;function a(l){o=l}function s(l,f){r.drawArrays(o,l,f),t.update(f,o,1)}function c(l,f,d){if(d===0)return;let h,m;if(n)h=r,m="drawArraysInstanced";else if(h=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",h===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}h[m](o,l,f,d),t.update(f,o,d)}this.setMode=a,this.render=s,this.renderInstances=c}function uu(r,e,t){let i;function n(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let M=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(M){if(M==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext!="undefined"&&r instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext!="undefined"&&r instanceof WebGL2ComputeRenderingContext,s=t.precision!==void 0?t.precision:"highp",c=o(s);c!==s&&(console.warn("THREE.WebGLRenderer:",s,"not supported, using",c,"instead."),s=c);let l=a||e.has("WEBGL_draw_buffers"),f=t.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),h=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),u=r.getParameter(r.MAX_VARYING_VECTORS),p=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=h>0,b=a||e.has("OES_texture_float"),S=T&&b,C=a?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:n,getMaxPrecision:o,precision:s,logarithmicDepthBuffer:f,maxTextures:d,maxVertexTextures:h,maxTextureSize:m,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:v,maxVaryings:u,maxFragmentUniforms:p,vertexTextures:T,floatFragmentTextures:b,floatVertexTextures:S,maxSamples:C}}function hu(r){let e=this,t=null,i=0,n=!1,o=!1,a=new Lt,s=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h,m){let g=d.length!==0||h||i!==0||n;return n=h,t=f(d,m,0),i=d.length,g},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1,l()},this.setState=function(d,h,m){let g=d.clippingPlanes,x=d.clipIntersection,v=d.clipShadows,u=r.get(d);if(!n||g===null||g.length===0||o&&!v)o?f(null):l();else{let p=o?0:i,T=p*4,b=u.clippingState||null;c.value=b,b=f(g,h,T,m);for(let S=0;S!==T;++S)b[S]=t[S];u.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=p}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,h,m,g){let x=d!==null?d.length:0,v=null;if(x!==0){if(v=c.value,g!==!0||v===null){let u=m+x*4,p=h.matrixWorldInverse;s.getNormalMatrix(p),(v===null||v.length<u)&&(v=new Float32Array(u));for(let T=0,b=m;T!==x;++T,b+=4)a.copy(d[T]).applyMatrix4(p,s),a.normal.toArray(v,b),v[b+3]=a.constant}c.value=v,c.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,v}}var Zi,_o=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zi===void 0&&(Zi=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),Zi.width=e.width,Zi.height=e.height;let i=Zi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}};var Vh=0,ot=class extends lt{constructor(e=ot.DEFAULT_IMAGE,t=ot.DEFAULT_MAPPING,i=Qe,n=Qe,o=Ke,a=li,s=qe,c=It,l=1,f=$e){super();Object.defineProperty(this,"id",{value:Vh++}),this.uuid=Ht(),this.name="",this.image=e,this.mipmaps=[],this.mapping=t,this.wrapS=i,this.wrapT=n,this.magFilter=o,this.minFilter=a,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=f,this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(this.image!==void 0){let n=this.image;if(n.uuid===void 0&&(n.uuid=Ht()),!t&&e.images[n.uuid]===void 0){let o;if(Array.isArray(n)){o=[];for(let a=0,s=n.length;a<s;a++)n[a].isDataTexture?o.push(vo(n[a].image)):o.push(vo(n[a]))}else o=vo(n);e.images[n.uuid]={uuid:n.uuid,url:o}}i.image=n.uuid}return t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==An)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cr:e.x=e.x-Math.floor(e.x);break;case Qe:e.x=e.x<0?0:1;break;case ur:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cr:e.y=e.y-Math.floor(e.y);break;case Qe:e.y=e.y<0?0:1;break;case ur:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&this.version++}};ot.DEFAULT_IMAGE=void 0;ot.DEFAULT_MAPPING=An;ot.prototype.isTexture=!0;function vo(r){return typeof HTMLImageElement!="undefined"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&r instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&r instanceof ImageBitmap?_o.getDataURL(r):r.data?{data:Array.prototype.slice.call(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ye=class extends lt{constructor(e,t,i={}){super();this.width=e,this.height=t,this.depth=1,this.scissor=new ze(0,0,e,t),this.scissorTest=!1,this.viewport=new ze(0,0,e,t),this.texture=new ot(void 0,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.encoding),this.texture.isRenderTargetTexture=!0,this.texture.image={width:e,height:t,depth:1},this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Ke,this.depthBuffer=i.depthBuffer!==void 0?i.depthBuffer:!0,this.stencilBuffer=i.stencilBuffer!==void 0?i.stencilBuffer:!1,this.depthTexture=i.depthTexture!==void 0?i.depthTexture:null}setTexture(e){e.image={width:this.width,height:this.height,depth:this.depth},this.texture=e}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.image={...this.texture.image},this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}};Ye.prototype.isWebGLRenderTarget=!0;var Ki=90,Ji=1,Mo=class extends Fe{constructor(e,t,i){super();if(this.type="CubeCamera",i.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=i;let n=new Ze(Ki,Ji,e,t);n.layers=this.layers,n.up.set(0,-1,0),n.lookAt(new A(1,0,0)),this.add(n);let o=new Ze(Ki,Ji,e,t);o.layers=this.layers,o.up.set(0,-1,0),o.lookAt(new A(-1,0,0)),this.add(o);let a=new Ze(Ki,Ji,e,t);a.layers=this.layers,a.up.set(0,0,1),a.lookAt(new A(0,1,0)),this.add(a);let s=new Ze(Ki,Ji,e,t);s.layers=this.layers,s.up.set(0,0,-1),s.lookAt(new A(0,-1,0)),this.add(s);let c=new Ze(Ki,Ji,e,t);c.layers=this.layers,c.up.set(0,-1,0),c.lookAt(new A(0,0,1)),this.add(c);let l=new Ze(Ki,Ji,e,t);l.layers=this.layers,l.up.set(0,-1,0),l.lookAt(new A(0,0,-1)),this.add(l)}update(e,t){this.parent===null&&this.updateMatrixWorld();let i=this.renderTarget,[n,o,a,s,c,l]=this.children,f=e.xr.enabled,d=e.getRenderTarget();e.xr.enabled=!1;let h=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0),e.render(t,n),e.setRenderTarget(i,1),e.render(t,o),e.setRenderTarget(i,2),e.render(t,a),e.setRenderTarget(i,3),e.render(t,s),e.setRenderTarget(i,4),e.render(t,c),i.texture.generateMipmaps=h,e.setRenderTarget(i,5),e.render(t,l),e.setRenderTarget(d),e.xr.enabled=f}};var Qi=class extends ot{constructor(e,t,i,n,o,a,s,c,l,f){e=e!==void 0?e:[],t=t!==void 0?t:ai,s=s!==void 0?s:ci;super(e,t,i,n,o,a,s,c,l,f);this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};Qi.prototype.isCubeTexture=!0;var ln=class extends Ye{constructor(e,t,i){Number.isInteger(t)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),t=i);super(e,e,t);t=t||{},this.texture=new Qi(void 0,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ke,this.texture._needsFlipEnvMap=!1}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.format=qe,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new Jt(5,5,5),o=new ct({name:"CubemapFromEquirect",uniforms:Qt(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ne,blending:Mt});o.uniforms.tEquirect.value=t;let a=new ke(n,o),s=t.minFilter;return t.minFilter===li&&(t.minFilter=Ke),new Mo(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,n){let o=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,n);e.setRenderTarget(o)}};ln.prototype.isWebGLCubeRenderTarget=!0;function fu(r){let e=new WeakMap;function t(a,s){return s===ar?a.mapping=ai:s===sr&&(a.mapping=Ei),a}function i(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){let s=a.mapping;if(s===ar||s===sr)if(e.has(a)){let c=e.get(a).texture;return t(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=r.getRenderTarget(),f=new ln(c.height/2);return f.fromEquirectangularTexture(r,a),e.set(a,f),r.setRenderTarget(l),a.addEventListener("dispose",n),t(f.texture,a.mapping)}else return null}}return a}function n(a){let s=a.target;s.removeEventListener("dispose",n);let c=e.get(s);c!==void 0&&(e.delete(s),c.dispose())}function o(){e=new WeakMap}return{get:i,dispose:o}}var $i=class extends ct{constructor(e){super(e);this.type="RawShaderMaterial"}};$i.prototype.isRawShaderMaterial=!0;var er=4,vi=8,Ut=Math.pow(2,vi),du=[.125,.215,.35,.446,.526,.582],pu=vi-er+1+du.length,tr=20,Bt={[$e]:0,[pr]:1,[gr]:2,[Nr]:3,[Ur]:4,[Br]:5,[mr]:6},Ri=new Yi({side:Ne,depthWrite:!1,depthTest:!1}),kh=new ke(new Jt,Ri),yo=new Rt,{_lodPlanes:Er,_sizeLods:mu,_sigmas:cn}=Wh(),gu=new ue,So=null,Ci=(1+Math.sqrt(5))/2,ir=1/Ci,xu=[new A(1,1,1),new A(-1,1,1),new A(1,1,-1),new A(-1,1,-1),new A(0,Ci,ir),new A(0,Ci,-ir),new A(ir,0,Ci),new A(-ir,0,Ci),new A(Ci,ir,0),new A(-Ci,ir,0)];function _u(r){let e=Math.max(r.r,r.g,r.b),t=Math.min(Math.max(Math.ceil(Math.log2(e)),-128),127);return r.multiplyScalar(Math.pow(2,-t)),(t+128)/255}var bo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._blurMaterial=Xh(tr),this._equirectShader=null,this._cubemapShader=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,n=100){So=this._renderer.getRenderTarget();let o=this._allocateTargets();return this._sceneToCubeUV(e,i,n,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e){return this._fromTexture(e)}fromCubemap(e){return this._fromTexture(e)}compileCubemapShader(){this._cubemapShader===null&&(this._cubemapShader=yu(),this._compileMaterial(this._cubemapShader))}compileEquirectangularShader(){this._equirectShader===null&&(this._equirectShader=Mu(),this._compileMaterial(this._equirectShader))}dispose(){this._blurMaterial.dispose(),this._cubemapShader!==null&&this._cubemapShader.dispose(),this._equirectShader!==null&&this._equirectShader.dispose();for(let e=0;e<Er.length;e++)Er[e].dispose()}_cleanup(e){this._pingPongRenderTarget.dispose(),this._renderer.setRenderTarget(So),e.scissorTest=!1,un(e,0,0,e.width,e.height)}_fromTexture(e){So=this._renderer.getRenderTarget();let t=this._allocateTargets(e);return this._textureToCubeUV(e,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(e){let t={magFilter:Oe,minFilter:Oe,generateMipmaps:!1,type:It,format:Ta,encoding:Hh(e)?e.encoding:gr,depthBuffer:!1},i=vu(t);return i.depthBuffer=!e,this._pingPongRenderTarget=vu(t),i}_compileMaterial(e){let t=new ke(Er[0],e);this._renderer.compile(t,yo)}_sceneToCubeUV(e,t,i,n){let o=90,a=1,s=new Ze(o,a,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.outputEncoding,m=f.toneMapping;f.getClearColor(gu),f.toneMapping=Tt,f.outputEncoding=$e,f.autoClear=!1;let g=!1,x=e.background;if(x){if(x.isColor){Ri.color.copy(x).convertSRGBToLinear(),e.background=null;let v=_u(Ri.color);Ri.opacity=v,g=!0}}else{Ri.color.copy(gu).convertSRGBToLinear();let v=_u(Ri.color);Ri.opacity=v,g=!0}for(let v=0;v<6;v++){let u=v%3;u==0?(s.up.set(0,c[v],0),s.lookAt(l[v],0,0)):u==1?(s.up.set(0,0,c[v]),s.lookAt(0,l[v],0)):(s.up.set(0,c[v],0),s.lookAt(0,0,l[v])),un(n,u*Ut,v>2?Ut:0,Ut,Ut),f.setRenderTarget(n),g&&f.render(kh,s),f.render(e,s)}f.toneMapping=m,f.outputEncoding=h,f.autoClear=d,e.background=x}_textureToCubeUV(e,t){let i=this._renderer;e.isCubeTexture?this._cubemapShader==null&&(this._cubemapShader=yu()):this._equirectShader==null&&(this._equirectShader=Mu());let n=e.isCubeTexture?this._cubemapShader:this._equirectShader,o=new ke(Er[0],n),a=n.uniforms;a.envMap.value=e,e.isCubeTexture||a.texelSize.value.set(1/e.image.width,1/e.image.height),a.inputEncoding.value=Bt[e.encoding],a.outputEncoding.value=Bt[t.texture.encoding],un(t,0,0,3*Ut,2*Ut),i.setRenderTarget(t),i.render(o,yo)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let n=1;n<pu;n++){let o=Math.sqrt(cn[n]*cn[n]-cn[n-1]*cn[n-1]),a=xu[(n-1)%xu.length];this._blur(e,n-1,n,o,a)}t.autoClear=i}_blur(e,t,i,n,o){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,n,"latitudinal",o),this._halfBlur(a,e,i,i,n,"longitudinal",o)}_halfBlur(e,t,i,n,o,a,s){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let f=3,d=new ke(Er[n],l),h=l.uniforms,m=mu[i]-1,g=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*tr-1),x=o/g,v=isFinite(o)?1+Math.floor(f*x):tr;v>tr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${tr}`);let u=[],p=0;for(let C=0;C<tr;++C){let M=C/x,j=Math.exp(-M*M/2);u.push(j),C==0?p+=j:C<v&&(p+=2*j)}for(let C=0;C<u.length;C++)u[C]=u[C]/p;h.envMap.value=e.texture,h.samples.value=v,h.weights.value=u,h.latitudinal.value=a==="latitudinal",s&&(h.poleAxis.value=s),h.dTheta.value=g,h.mipInt.value=vi-i,h.inputEncoding.value=Bt[e.texture.encoding],h.outputEncoding.value=Bt[e.texture.encoding];let T=mu[n],b=3*Math.max(0,Ut-2*T),S=(n===0?0:2*Ut)+2*T*(n>vi-er?n-vi+er:0);un(t,b,S,3*T,2*T),c.setRenderTarget(t),c.render(d,yo)}};function Hh(r){return r===void 0||r.type!==It?!1:r.encoding===$e||r.encoding===pr||r.encoding===mr}function Wh(){let r=[],e=[],t=[],i=vi;for(let n=0;n<pu;n++){let o=Math.pow(2,i);e.push(o);let a=1/o;n>vi-er?a=du[n-vi+er-1]:n==0&&(a=0),t.push(a);let s=1/(o-1),c=-s/2,l=1+s/2,f=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,h=6,m=3,g=2,x=1,v=new Float32Array(m*h*d),u=new Float32Array(g*h*d),p=new Float32Array(x*h*d);for(let b=0;b<d;b++){let S=b%3*2/3-1,C=b>2?0:-1,M=[S,C,0,S+2/3,C,0,S+2/3,C+1,0,S,C,0,S+2/3,C+1,0,S,C+1,0];v.set(M,m*h*b),u.set(f,g*h*b);let j=[b,b,b,b,b,b];p.set(j,x*h*b)}let T=new je;T.setAttribute("position",new Ge(v,m)),T.setAttribute("uv",new Ge(u,g)),T.setAttribute("faceIndex",new Ge(p,x)),r.push(T),i>er&&i--}return{_lodPlanes:r,_sizeLods:e,_sigmas:t}}function vu(r){let e=new Ye(3*Ut,3*Ut,r);return e.texture.mapping=si,e.texture.name="PMREM.cubeUv",e.scissorTest=!0,e}function un(r,e,t,i,n){r.viewport.set(e,t,i,n),r.scissor.set(e,t,i,n)}function Xh(r){let e=new Float32Array(r),t=new A(0,1,0);return new $i({name:"SphericalGaussianBlur",defines:{n:r},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:e},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:t},inputEncoding:{value:Bt[$e]},outputEncoding:{value:Bt[$e]}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			${To()}

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:Mt,depthTest:!1,depthWrite:!1})}function Mu(){let r=new ce(1,1);return new $i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null},texelSize:{value:r},inputEncoding:{value:Bt[$e]},outputEncoding:{value:Bt[$e]}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform vec2 texelSize;

			${To()}

			#include <common>

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				vec2 f = fract( uv / texelSize - 0.5 );
				uv -= f * texelSize;
				vec3 tl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x += texelSize.x;
				vec3 tr = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.y += texelSize.y;
				vec3 br = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x -= texelSize.x;
				vec3 bl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;

				vec3 tm = mix( tl, tr, f.x );
				vec3 bm = mix( bl, br, f.x );
				gl_FragColor.rgb = mix( tm, bm, f.y );

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:Mt,depthTest:!1,depthWrite:!1})}function yu(){return new $i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},inputEncoding:{value:Bt[$e]},outputEncoding:{value:Bt[$e]}},vertexShader:Eo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			${To()}

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb = envMapTexelToLinear( textureCube( envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ) ) ).rgb;
				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:Mt,depthTest:!1,depthWrite:!1})}function Eo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 position;
		attribute vec2 uv;
		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function To(){return`

		uniform int inputEncoding;
		uniform int outputEncoding;

		#include <encodings_pars_fragment>

		vec4 inputTexelToLinear( vec4 value ) {

			if ( inputEncoding == 0 ) {

				return value;

			} else if ( inputEncoding == 1 ) {

				return sRGBToLinear( value );

			} else if ( inputEncoding == 2 ) {

				return RGBEToLinear( value );

			} else if ( inputEncoding == 3 ) {

				return RGBMToLinear( value, 7.0 );

			} else if ( inputEncoding == 4 ) {

				return RGBMToLinear( value, 16.0 );

			} else if ( inputEncoding == 5 ) {

				return RGBDToLinear( value, 256.0 );

			} else {

				return GammaToLinear( value, 2.2 );

			}

		}

		vec4 linearToOutputTexel( vec4 value ) {

			if ( outputEncoding == 0 ) {

				return value;

			} else if ( outputEncoding == 1 ) {

				return LinearTosRGB( value );

			} else if ( outputEncoding == 2 ) {

				return LinearToRGBE( value );

			} else if ( outputEncoding == 3 ) {

				return LinearToRGBM( value, 7.0 );

			} else if ( outputEncoding == 4 ) {

				return LinearToRGBM( value, 16.0 );

			} else if ( outputEncoding == 5 ) {

				return LinearToRGBD( value, 256.0 );

			} else {

				return LinearToGamma( value, 2.2 );

			}

		}

		vec4 envMapTexelToLinear( vec4 color ) {

			return inputTexelToLinear( color );

		}
	`}function Su(r){let e=new WeakMap,t=null;function i(s){if(s&&s.isTexture&&s.isRenderTargetTexture===!1){let c=s.mapping,l=c===ar||c===sr,f=c===ai||c===Ei;if(l||f){if(e.has(s))return e.get(s).texture;{let d=s.image;if(l&&d&&d.height>0||f&&d&&n(d)){let h=r.getRenderTarget();t===null&&(t=new bo(r));let m=l?t.fromEquirectangular(s):t.fromCubemap(s);return e.set(s,m),r.setRenderTarget(h),s.addEventListener("dispose",o),m.texture}else return null}}}return s}function n(s){let c=0,l=6;for(let f=0;f<l;f++)s[f]!==void 0&&c++;return c===l}function o(s){let c=s.target;c.removeEventListener("dispose",o);let l=e.get(c);l!==void 0&&(l.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function bu(r){let e={};function t(i){if(e[i]!==void 0)return e[i];let n;switch(i){case"WEBGL_depth_texture":n=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=r.getExtension(i)}return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float")},get:function(i){let n=t(i);return n===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Eu(r,e,t,i){let n={},o=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete n[h.id];let m=o.get(h);m&&(e.remove(m),o.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function s(d,h){return n[h.id]===!0||(h.addEventListener("dispose",a),n[h.id]=!0,t.memory.geometries++),h}function c(d){let h=d.attributes;for(let g in h)e.update(h[g],r.ARRAY_BUFFER);let m=d.morphAttributes;for(let g in m){let x=m[g];for(let v=0,u=x.length;v<u;v++)e.update(x[v],r.ARRAY_BUFFER)}}function l(d){let h=[],m=d.index,g=d.attributes.position,x=0;if(m!==null){let p=m.array;x=m.version;for(let T=0,b=p.length;T<b;T+=3){let S=p[T+0],C=p[T+1],M=p[T+2];h.push(S,C,C,M,M,S)}}else{let p=g.array;x=g.version;for(let T=0,b=p.length/3-1;T<b;T+=3){let S=T+0,C=T+1,M=T+2;h.push(S,C,C,M,M,S)}}let v=new(Zr(h)>65535?yr:Mr)(h,1);v.version=x;let u=o.get(d);u&&e.remove(u),o.set(d,v)}function f(d){let h=o.get(d);if(h){let m=d.index;m!==null&&h.version<m.version&&l(d)}else l(d);return o.get(d)}return{get:s,update:c,getWireframeAttribute:f}}function Tu(r,e,t,i){let n=i.isWebGL2,o;function a(h){o=h}let s,c;function l(h){s=h.type,c=h.bytesPerElement}function f(h,m){r.drawElements(o,m,s,h*c),t.update(m,o,1)}function d(h,m,g){if(g===0)return;let x,v;if(n)x=r,v="drawElementsInstanced";else if(x=e.get("ANGLE_instanced_arrays"),v="drawElementsInstancedANGLE",x===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}x[v](o,m,s,h*c,g),t.update(m,o,g)}this.setMode=a,this.setIndex=l,this.render=f,this.renderInstances=d}function wu(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(o,a,s){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=s*(o/3);break;case r.LINES:t.lines+=s*(o/2);break;case r.LINE_STRIP:t.lines+=s*(o-1);break;case r.LINE_LOOP:t.lines+=s*o;break;case r.POINTS:t.points+=s*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:n,update:i}}function Yh(r,e){return r[0]-e[0]}function qh(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Au(r){let e={},t=new Float32Array(8),i=[];for(let o=0;o<8;o++)i[o]=[o,0];function n(o,a,s,c){let l=o.morphTargetInfluences,f=l===void 0?0:l.length,d=e[a.id];if(d===void 0||d.length!==f){d=[];for(let v=0;v<f;v++)d[v]=[v,0];e[a.id]=d}for(let v=0;v<f;v++){let u=d[v];u[0]=v,u[1]=l[v]}d.sort(qh);for(let v=0;v<8;v++)v<f&&d[v][1]?(i[v][0]=d[v][0],i[v][1]=d[v][1]):(i[v][0]=Number.MAX_SAFE_INTEGER,i[v][1]=0);i.sort(Yh);let h=a.morphAttributes.position,m=a.morphAttributes.normal,g=0;for(let v=0;v<8;v++){let u=i[v],p=u[0],T=u[1];p!==Number.MAX_SAFE_INTEGER&&T?(h&&a.getAttribute("morphTarget"+v)!==h[p]&&a.setAttribute("morphTarget"+v,h[p]),m&&a.getAttribute("morphNormal"+v)!==m[p]&&a.setAttribute("morphNormal"+v,m[p]),t[v]=T,g+=T):(h&&a.hasAttribute("morphTarget"+v)===!0&&a.deleteAttribute("morphTarget"+v),m&&a.hasAttribute("morphNormal"+v)===!0&&a.deleteAttribute("morphNormal"+v),t[v]=0)}let x=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(r,"morphTargetBaseInfluence",x),c.getUniforms().setValue(r,"morphTargetInfluences",t)}return{update:n}}var hn=class extends Ye{constructor(e,t,i){super(e,t,i);this.samples=4}copy(e){return super.copy.call(this,e),this.samples=e.samples,this}};hn.prototype.isWebGLMultisampleRenderTarget=!0;function Lu(r,e,t,i){let n=new WeakMap;function o(c){let l=i.render.frame,f=c.geometry,d=e.get(c,f);return n.get(d)!==l&&(e.update(d),n.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",s)===!1&&c.addEventListener("dispose",s),t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER)),d}function a(){n=new WeakMap}function s(c){let l=c.target;l.removeEventListener("dispose",s),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:o,dispose:a}}var fn=class extends ot{constructor(e=null,t=1,i=1,n=1){super(null);this.image={data:e,width:t,height:i,depth:n},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}};fn.prototype.isDataTexture2DArray=!0;var dn=class extends ot{constructor(e=null,t=1,i=1,n=1){super(null);this.image={data:e,width:t,height:i,depth:n},this.magFilter=Oe,this.minFilter=Oe,this.wrapR=Qe,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}};dn.prototype.isDataTexture3D=!0;var Ru=new ot,Zh=new fn,Kh=new dn,Cu=new Qi,Du=[],Pu=[],Fu=new Float32Array(16),Iu=new Float32Array(9),Nu=new Float32Array(4);function rr(r,e,t){let i=r[0];if(i<=0||i>0)return r;let n=e*t,o=Du[n];if(o===void 0&&(o=new Float32Array(n),Du[n]=o),e!==0){i.toArray(o,0);for(let a=1,s=0;a!==e;++a)s+=t,r[a].toArray(o,s)}return o}function ft(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function ut(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function Uu(r,e){let t=Pu[e];t===void 0&&(t=new Int32Array(e),Pu[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function Jh(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Qh(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;r.uniform2fv(this.addr,e),ut(t,e)}}function $h(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;r.uniform3fv(this.addr,e),ut(t,e)}}function ef(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;r.uniform4fv(this.addr,e),ut(t,e)}}function tf(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),ut(t,e)}else{if(ft(t,i))return;Nu.set(i),r.uniformMatrix2fv(this.addr,!1,Nu),ut(t,i)}}function rf(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),ut(t,e)}else{if(ft(t,i))return;Iu.set(i),r.uniformMatrix3fv(this.addr,!1,Iu),ut(t,i)}}function nf(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),ut(t,e)}else{if(ft(t,i))return;Fu.set(i),r.uniformMatrix4fv(this.addr,!1,Fu),ut(t,i)}}function of(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function af(r,e){let t=this.cache;ft(t,e)||(r.uniform2iv(this.addr,e),ut(t,e))}function sf(r,e){let t=this.cache;ft(t,e)||(r.uniform3iv(this.addr,e),ut(t,e))}function lf(r,e){let t=this.cache;ft(t,e)||(r.uniform4iv(this.addr,e),ut(t,e))}function cf(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function uf(r,e){let t=this.cache;ft(t,e)||(r.uniform2uiv(this.addr,e),ut(t,e))}function hf(r,e){let t=this.cache;ft(t,e)||(r.uniform3uiv(this.addr,e),ut(t,e))}function ff(r,e){let t=this.cache;ft(t,e)||(r.uniform4uiv(this.addr,e),ut(t,e))}function df(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.safeSetTexture2D(e||Ru,n)}function pf(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||Kh,n)}function mf(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.safeSetTextureCube(e||Cu,n)}function gf(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||Zh,n)}function xf(r){switch(r){case 5126:return Jh;case 35664:return Qh;case 35665:return $h;case 35666:return ef;case 35674:return tf;case 35675:return rf;case 35676:return nf;case 5124:case 35670:return of;case 35667:case 35671:return af;case 35668:case 35672:return sf;case 35669:case 35673:return lf;case 5125:return cf;case 36294:return uf;case 36295:return hf;case 36296:return ff;case 35678:case 36198:case 36298:case 36306:case 35682:return df;case 35679:case 36299:case 36307:return pf;case 35680:case 36300:case 36308:case 36293:return mf;case 36289:case 36303:case 36311:case 36292:return gf}}function _f(r,e){r.uniform1fv(this.addr,e)}function vf(r,e){let t=rr(e,this.size,2);r.uniform2fv(this.addr,t)}function Mf(r,e){let t=rr(e,this.size,3);r.uniform3fv(this.addr,t)}function yf(r,e){let t=rr(e,this.size,4);r.uniform4fv(this.addr,t)}function Sf(r,e){let t=rr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function bf(r,e){let t=rr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Ef(r,e){let t=rr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function Tf(r,e){r.uniform1iv(this.addr,e)}function wf(r,e){r.uniform2iv(this.addr,e)}function Af(r,e){r.uniform3iv(this.addr,e)}function Lf(r,e){r.uniform4iv(this.addr,e)}function Rf(r,e){r.uniform1uiv(this.addr,e)}function Cf(r,e){r.uniform2uiv(this.addr,e)}function Df(r,e){r.uniform3uiv(this.addr,e)}function Pf(r,e){r.uniform4uiv(this.addr,e)}function Ff(r,e,t){let i=e.length,n=Uu(t,i);r.uniform1iv(this.addr,n);for(let o=0;o!==i;++o)t.safeSetTexture2D(e[o]||Ru,n[o])}function If(r,e,t){let i=e.length,n=Uu(t,i);r.uniform1iv(this.addr,n);for(let o=0;o!==i;++o)t.safeSetTextureCube(e[o]||Cu,n[o])}function Nf(r){switch(r){case 5126:return _f;case 35664:return vf;case 35665:return Mf;case 35666:return yf;case 35674:return Sf;case 35675:return bf;case 35676:return Ef;case 5124:case 35670:return Tf;case 35667:case 35671:return wf;case 35668:case 35672:return Af;case 35669:case 35673:return Lf;case 5125:return Rf;case 36294:return Cf;case 36295:return Df;case 36296:return Pf;case 35678:case 36198:case 36298:case 36306:case 35682:return Ff;case 35680:case 36300:case 36308:case 36293:return If}}function Uf(r,e,t){this.id=r,this.addr=t,this.cache=[],this.setValue=xf(e.type)}function Bu(r,e,t){this.id=r,this.addr=t,this.cache=[],this.size=e.size,this.setValue=Nf(e.type)}Bu.prototype.updateCache=function(r){let e=this.cache;r instanceof Float32Array&&e.length!==r.length&&(this.cache=new Float32Array(r.length)),ut(e,r)};function Gu(r){this.id=r,this.seq=[],this.map={}}Gu.prototype.setValue=function(r,e,t){let i=this.seq;for(let n=0,o=i.length;n!==o;++n){let a=i[n];a.setValue(r,e[a.id],t)}};var wo=/(\w+)(\])?(\[|\.)?/g;function Ou(r,e){r.seq.push(e),r.map[e.id]=e}function Bf(r,e,t){let i=r.name,n=i.length;for(wo.lastIndex=0;;){let o=wo.exec(i),a=wo.lastIndex,s=o[1],c=o[2]==="]",l=o[3];if(c&&(s=s|0),l===void 0||l==="["&&a+2===n){Ou(t,l===void 0?new Uf(s,r,e):new Bu(s,r,e));break}else{let d=t.map[s];d===void 0&&(d=new Gu(s),Ou(t,d)),t=d}}}function Gt(r,e){this.seq=[],this.map={};let t=r.getProgramParameter(e,r.ACTIVE_UNIFORMS);for(let i=0;i<t;++i){let n=r.getActiveUniform(e,i),o=r.getUniformLocation(e,n.name);Bf(n,o,this)}}Gt.prototype.setValue=function(r,e,t,i){let n=this.map[e];n!==void 0&&n.setValue(r,t,i)};Gt.prototype.setOptional=function(r,e,t){let i=e[t];i!==void 0&&this.setValue(r,t,i)};Gt.upload=function(r,e,t,i){for(let n=0,o=e.length;n!==o;++n){let a=e[n],s=t[a.id];s.needsUpdate!==!1&&a.setValue(r,s.value,i)}};Gt.seqWithValue=function(r,e){let t=[];for(let i=0,n=r.length;i!==n;++i){let o=r[i];o.id in e&&t.push(o)}return t};function Ao(r,e,t){let i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}var Gf=0;function Of(r){let e=r.split(`
`);for(let t=0;t<e.length;t++)e[t]=t+1+": "+e[t];return e.join(`
`)}function zu(r){switch(r){case $e:return["Linear","( value )"];case pr:return["sRGB","( value )"];case gr:return["RGBE","( value )"];case Nr:return["RGBM","( value, 7.0 )"];case Ur:return["RGBM","( value, 16.0 )"];case Br:return["RGBD","( value, 256.0 )"];case mr:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case ls:return["LogLuv","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",r),["Linear","( value )"]}}function ju(r,e,t){let i=r.getShaderParameter(e,r.COMPILE_STATUS),n=r.getShaderInfoLog(e).trim();return i&&n===""?"":t.toUpperCase()+`

`+n+`

`+Of(r.getShaderSource(e))}function nr(r,e){let t=zu(e);return"vec4 "+r+"( vec4 value ) { return "+t[0]+"ToLinear"+t[1]+"; }"}function zf(r,e){let t=zu(e);return"vec4 "+r+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function jf(r,e){let t;switch(e){case ua:t="Linear";break;case ha:t="Reinhard";break;case fa:t="OptimizedCineon";break;case da:t="ACESFilmic";break;case pa:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Vf(r){return[r.extensionDerivatives||r.envMapCubeUV||r.bumpMap||r.tangentSpaceNormalMap||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission>0)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Tr).join(`
`)}function kf(r){let e=[];for(let t in r){let i=r[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Hf(r,e){let t={},i=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){let a=r.getActiveAttrib(e,n).name;t[a]=r.getAttribLocation(e,a)}return t}function Tr(r){return r!==""}function Vu(r,e){return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ku(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Wf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lo(r){return r.replace(Wf,Xf)}function Xf(r,e){let t=we[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return Lo(t)}var Yf=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,qf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hu(r){return r.replace(qf,Wu).replace(Yf,Zf)}function Zf(r,e,t,i){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),Wu(r,e,t,i)}function Wu(r,e,t,i){let n="";for(let o=parseInt(e);o<parseInt(t);o++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return n}function Xu(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Kf(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Pr?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===jo?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Si&&(e="SHADOWMAP_TYPE_VSM"),e}function Jf(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ai:case Ei:e="ENVMAP_TYPE_CUBE";break;case si:case lr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Qf(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ei:case lr:e="ENVMAP_MODE_REFRACTION";break}return e}function $f(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Fi:e="ENVMAP_BLENDING_MULTIPLY";break;case la:e="ENVMAP_BLENDING_MIX";break;case ca:e="ENVMAP_BLENDING_ADD";break}return e}function Yu(r,e,t,i){let n=r.getContext(),o=t.defines,a=t.vertexShader,s=t.fragmentShader,c=Kf(t),l=Jf(t),f=Qf(t),d=$f(t),h=r.gammaFactor>0?r.gammaFactor:1,m=t.isWebGL2?"":Vf(t),g=kf(o),x=n.createProgram(),v,u,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=[g].filter(Tr).join(`
`),v.length>0&&(v+=`
`),u=[m,g].filter(Tr).join(`
`),u.length>0&&(u+=`
`)):(v=[Xu(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+h,"#define MAX_BONES "+t.maxBones,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularTintMap?"#define USE_SPECULARTINTMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.useVertexTexture?"#define BONE_TEXTURE":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tr).join(`
`),u=[m,Xu(t),"#define SHADER_NAME "+t.shaderName,g,t.alphaTest?"#define ALPHATEST "+t.alphaTest+(t.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+f:"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",t.specularTintMap?"#define USE_SPECULARTINTMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.sheen?"#define USE_SHEEN":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(t.extensionShaderTextureLOD||t.envMap)&&t.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tt?"#define TONE_MAPPING":"",t.toneMapping!==Tt?we.tonemapping_pars_fragment:"",t.toneMapping!==Tt?jf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",we.encodings_pars_fragment,t.map?nr("mapTexelToLinear",t.mapEncoding):"",t.matcap?nr("matcapTexelToLinear",t.matcapEncoding):"",t.envMap?nr("envMapTexelToLinear",t.envMapEncoding):"",t.emissiveMap?nr("emissiveMapTexelToLinear",t.emissiveMapEncoding):"",t.specularTintMap?nr("specularTintMapTexelToLinear",t.specularTintMapEncoding):"",t.lightMap?nr("lightMapTexelToLinear",t.lightMapEncoding):"",zf("linearToOutputTexel",t.outputEncoding),t.depthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Tr).join(`
`)),a=Lo(a),a=Vu(a,t),a=ku(a,t),s=Lo(s),s=Vu(s,t),s=ku(s,t),a=Hu(a),s=Hu(s),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,v=["#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,u=["#define varying in",t.glslVersion===jn?"":"out highp vec4 pc_fragColor;",t.glslVersion===jn?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let T=p+v+a,b=p+u+s,S=Ao(n,n.VERTEX_SHADER,T),C=Ao(n,n.FRAGMENT_SHADER,b);if(n.attachShader(x,S),n.attachShader(x,C),t.index0AttributeName!==void 0?n.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x),r.debug.checkShaderErrors){let N=n.getProgramInfoLog(x).trim(),O=n.getShaderInfoLog(S).trim(),B=n.getShaderInfoLog(C).trim(),$=!0,G=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1){$=!1;let P=ju(n,S,"vertex"),U=ju(n,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Program Info Log: `+N+`
`+P+`
`+U)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(O===""||B==="")&&(G=!1);G&&(this.diagnostics={runnable:$,programLog:N,vertexShader:{log:O,prefix:v},fragmentShader:{log:B,prefix:u}})}n.deleteShader(S),n.deleteShader(C);let M;this.getUniforms=function(){return M===void 0&&(M=new Gt(n,x)),M};let j;return this.getAttributes=function(){return j===void 0&&(j=Hf(n,x)),j},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.name=t.shaderName,this.id=Gf++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=S,this.fragmentShader=C,this}function qu(r,e,t,i,n,o,a){let s=[],c=n.isWebGL2,l=n.logarithmicDepthBuffer,f=n.floatVertexTextures,d=n.maxVertexUniforms,h=n.vertexTextures,m=n.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},x=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","instancingColor","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","displacementMap","specularMap","specularIntensityMap","specularTintMap","specularTintMapEncoding","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexAlphas","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen","transmission","transmissionMap","thicknessMap"];function v(M){let N=M.skeleton.bones;if(f)return 1024;{let B=Math.floor((d-20)/4),$=Math.min(B,N.length);return $<N.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+N.length+" bones. This GPU supports "+$+"."),0):$}}function u(M){let j;return M&&M.isTexture?j=M.encoding:M&&M.isWebGLRenderTarget?(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),j=M.texture.encoding):j=$e,j}function p(M,j,N,O,B){let $=O.fog,G=M.isMeshStandardMaterial?O.environment:null,P=(M.isMeshStandardMaterial?t:e).get(M.envMap||G),U=g[M.type],z=B.isSkinnedMesh?v(B):0;M.precision!==null&&(m=n.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));let W,te;if(U){let ie=St[U];W=ie.vertexShader,te=ie.fragmentShader}else W=M.vertexShader,te=M.fragmentShader;let oe=r.getRenderTarget();return{isWebGL2:c,shaderID:U,shaderName:M.type,vertexShader:W,fragmentShader:te,defines:M.defines,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,instancing:B.isInstancedMesh===!0,instancingColor:B.isInstancedMesh===!0&&B.instanceColor!==null,supportsVertexTextures:h,outputEncoding:oe!==null?u(oe.texture):r.outputEncoding,map:!!M.map,mapEncoding:u(M.map),matcap:!!M.matcap,matcapEncoding:u(M.matcap),envMap:!!P,envMapMode:P&&P.mapping,envMapEncoding:u(P),envMapCubeUV:!!P&&(P.mapping===si||P.mapping===lr),lightMap:!!M.lightMap,lightMapEncoding:u(M.lightMap),aoMap:!!M.aoMap,emissiveMap:!!M.emissiveMap,emissiveMapEncoding:u(M.emissiveMap),bumpMap:!!M.bumpMap,normalMap:!!M.normalMap,objectSpaceNormalMap:M.normalMapType===hs,tangentSpaceNormalMap:M.normalMapType===Gr,clearcoatMap:!!M.clearcoatMap,clearcoatRoughnessMap:!!M.clearcoatRoughnessMap,clearcoatNormalMap:!!M.clearcoatNormalMap,displacementMap:!!M.displacementMap,roughnessMap:!!M.roughnessMap,metalnessMap:!!M.metalnessMap,specularMap:!!M.specularMap,specularIntensityMap:!!M.specularIntensityMap,specularTintMap:!!M.specularTintMap,specularTintMapEncoding:u(M.specularTintMap),alphaMap:!!M.alphaMap,gradientMap:!!M.gradientMap,sheen:!!M.sheen,transmission:!!M.transmission,transmissionMap:!!M.transmissionMap,thicknessMap:!!M.thicknessMap,combine:M.combine,vertexTangents:!!M.normalMap&&!!B.geometry&&!!B.geometry.attributes.tangent,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.geometry&&!!B.geometry.attributes.color&&B.geometry.attributes.color.itemSize===4,vertexUvs:!!M.map||!!M.bumpMap||!!M.normalMap||!!M.specularMap||!!M.alphaMap||!!M.emissiveMap||!!M.roughnessMap||!!M.metalnessMap||!!M.clearcoatMap||!!M.clearcoatRoughnessMap||!!M.clearcoatNormalMap||!!M.displacementMap||!!M.transmissionMap||!!M.thicknessMap||!!M.specularIntensityMap||!!M.specularTintMap,uvsVertexOnly:!(!!M.map||!!M.bumpMap||!!M.normalMap||!!M.specularMap||!!M.alphaMap||!!M.emissiveMap||!!M.roughnessMap||!!M.metalnessMap||!!M.clearcoatNormalMap||!!M.transmission||!!M.transmissionMap||!!M.thicknessMap||!!M.specularIntensityMap||!!M.specularTintMap)&&!!M.displacementMap,fog:!!$,useFog:M.fog,fogExp2:$&&$.isFogExp2,flatShading:!!M.flatShading,sizeAttenuation:M.sizeAttenuation,logarithmicDepthBuffer:l,skinning:B.isSkinnedMesh===!0&&z>0,maxBones:z,useVertexTexture:f,morphTargets:!!B.geometry&&!!B.geometry.morphAttributes.position,morphNormals:!!B.geometry&&!!B.geometry.morphAttributes.normal,numDirLights:j.directional.length,numPointLights:j.point.length,numSpotLights:j.spot.length,numRectAreaLights:j.rectArea.length,numHemiLights:j.hemi.length,numDirLightShadows:j.directionalShadowMap.length,numPointLightShadows:j.pointShadowMap.length,numSpotLightShadows:j.spotShadowMap.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&N.length>0,shadowMapType:r.shadowMap.type,toneMapping:M.toneMapped?r.toneMapping:Tt,physicallyCorrectLights:r.physicallyCorrectLights,premultipliedAlpha:M.premultipliedAlpha,alphaTest:M.alphaTest,doubleSided:M.side===Et,flipSided:M.side===Ne,depthPacking:M.depthPacking!==void 0?M.depthPacking:!1,index0AttributeName:M.index0AttributeName,extensionDerivatives:M.extensions&&M.extensions.derivatives,extensionFragDepth:M.extensions&&M.extensions.fragDepth,extensionDrawBuffers:M.extensions&&M.extensions.drawBuffers,extensionShaderTextureLOD:M.extensions&&M.extensions.shaderTextureLOD,rendererExtensionFragDepth:c||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:c||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:c||i.has("EXT_shader_texture_lod"),customProgramCacheKey:M.customProgramCacheKey()}}function T(M){let j=[];if(M.shaderID?j.push(M.shaderID):(j.push(M.fragmentShader),j.push(M.vertexShader)),M.defines!==void 0)for(let N in M.defines)j.push(N),j.push(M.defines[N]);if(M.isRawShaderMaterial===!1){for(let N=0;N<x.length;N++)j.push(M[x[N]]);j.push(r.outputEncoding),j.push(r.gammaFactor)}return j.push(M.customProgramCacheKey),j.join()}function b(M){let j=g[M.type],N;if(j){let O=St[j];N=Ps.clone(O.uniforms)}else N=M.uniforms;return N}function S(M,j){let N;for(let O=0,B=s.length;O<B;O++){let $=s[O];if($.cacheKey===j){N=$,++N.usedTimes;break}}return N===void 0&&(N=new Yu(r,j,M,o),s.push(N)),N}function C(M){if(--M.usedTimes==0){let j=s.indexOf(M);s[j]=s[s.length-1],s.pop(),M.destroy()}}return{getParameters:p,getProgramCacheKey:T,getUniforms:b,acquireProgram:S,releaseProgram:C,programs:s}}function Zu(){let r=new WeakMap;function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function t(o){r.delete(o)}function i(o,a,s){r.get(o)[a]=s}function n(){r=new WeakMap}return{get:e,remove:t,update:i,dispose:n}}function ed(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.program!==e.program?r.program.id-e.program.id:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Ku(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ju(r){let e=[],t=0,i=[],n=[],o=[],a={id:-1};function s(){t=0,i.length=0,n.length=0,o.length=0}function c(m,g,x,v,u,p){let T=e[t],b=r.get(x);return T===void 0?(T={id:m.id,object:m,geometry:g,material:x,program:b.program||a,groupOrder:v,renderOrder:m.renderOrder,z:u,group:p},e[t]=T):(T.id=m.id,T.object=m,T.geometry=g,T.material=x,T.program=b.program||a,T.groupOrder=v,T.renderOrder=m.renderOrder,T.z=u,T.group=p),t++,T}function l(m,g,x,v,u,p){let T=c(m,g,x,v,u,p);x.transmission>0?n.push(T):x.transparent===!0?o.push(T):i.push(T)}function f(m,g,x,v,u,p){let T=c(m,g,x,v,u,p);x.transmission>0?n.unshift(T):x.transparent===!0?o.unshift(T):i.unshift(T)}function d(m,g){i.length>1&&i.sort(m||ed),n.length>1&&n.sort(g||Ku),o.length>1&&o.sort(g||Ku)}function h(){for(let m=t,g=e.length;m<g;m++){let x=e[m];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.program=null,x.group=null}}return{opaque:i,transmissive:n,transparent:o,init:s,push:l,unshift:f,finish:h,sort:d}}function Qu(r){let e=new WeakMap;function t(n,o){let a;return e.has(n)===!1?(a=new Ju(r),e.set(n,[a])):o>=e.get(n).length?(a=new Ju(r),e.get(n).push(a)):a=e.get(n)[o],a}function i(){e=new WeakMap}return{get:t,dispose:i}}function td(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new ue};break;case"SpotLight":t={position:new A,direction:new A,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":t={color:new ue,position:new A,halfWidth:new A,halfHeight:new A};break}return r[e.id]=t,t}}}function id(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var rd=0;function nd(r,e){return(e.castShadow?1:0)-(r.castShadow?1:0)}function $u(r,e){let t=new td,i=id(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let f=0;f<9;f++)n.probe.push(new A);let o=new A,a=new Le,s=new Le;function c(f){let d=0,h=0,m=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let g=0,x=0,v=0,u=0,p=0,T=0,b=0,S=0;f.sort(nd);for(let M=0,j=f.length;M<j;M++){let N=f[M],O=N.color,B=N.intensity,$=N.distance,G=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)d+=O.r*B,h+=O.g*B,m+=O.b*B;else if(N.isLightProbe)for(let P=0;P<9;P++)n.probe[P].addScaledVector(N.sh.coefficients[P],B);else if(N.isDirectionalLight){let P=t.get(N);if(P.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let U=N.shadow,z=i.get(N);z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,n.directionalShadow[g]=z,n.directionalShadowMap[g]=G,n.directionalShadowMatrix[g]=N.shadow.matrix,T++}n.directional[g]=P,g++}else if(N.isSpotLight){let P=t.get(N);if(P.position.setFromMatrixPosition(N.matrixWorld),P.color.copy(O).multiplyScalar(B),P.distance=$,P.coneCos=Math.cos(N.angle),P.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),P.decay=N.decay,N.castShadow){let U=N.shadow,z=i.get(N);z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,n.spotShadow[v]=z,n.spotShadowMap[v]=G,n.spotShadowMatrix[v]=N.shadow.matrix,S++}n.spot[v]=P,v++}else if(N.isRectAreaLight){let P=t.get(N);P.color.copy(O).multiplyScalar(B),P.halfWidth.set(N.width*.5,0,0),P.halfHeight.set(0,N.height*.5,0),n.rectArea[u]=P,u++}else if(N.isPointLight){let P=t.get(N);if(P.color.copy(N.color).multiplyScalar(N.intensity),P.distance=N.distance,P.decay=N.decay,N.castShadow){let U=N.shadow,z=i.get(N);z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,z.shadowCameraNear=U.camera.near,z.shadowCameraFar=U.camera.far,n.pointShadow[x]=z,n.pointShadowMap[x]=G,n.pointShadowMatrix[x]=N.shadow.matrix,b++}n.point[x]=P,x++}else if(N.isHemisphereLight){let P=t.get(N);P.skyColor.copy(N.color).multiplyScalar(B),P.groundColor.copy(N.groundColor).multiplyScalar(B),n.hemi[p]=P,p++}}u>0&&(e.isWebGL2?(n.rectAreaLTC1=Z.LTC_FLOAT_1,n.rectAreaLTC2=Z.LTC_FLOAT_2):r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Z.LTC_FLOAT_1,n.rectAreaLTC2=Z.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(n.rectAreaLTC1=Z.LTC_HALF_1,n.rectAreaLTC2=Z.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=m;let C=n.hash;(C.directionalLength!==g||C.pointLength!==x||C.spotLength!==v||C.rectAreaLength!==u||C.hemiLength!==p||C.numDirectionalShadows!==T||C.numPointShadows!==b||C.numSpotShadows!==S)&&(n.directional.length=g,n.spot.length=v,n.rectArea.length=u,n.point.length=x,n.hemi.length=p,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=b,n.spotShadowMatrix.length=S,C.directionalLength=g,C.pointLength=x,C.spotLength=v,C.rectAreaLength=u,C.hemiLength=p,C.numDirectionalShadows=T,C.numPointShadows=b,C.numSpotShadows=S,n.version=rd++)}function l(f,d){let h=0,m=0,g=0,x=0,v=0,u=d.matrixWorldInverse;for(let p=0,T=f.length;p<T;p++){let b=f[p];if(b.isDirectionalLight){let S=n.directional[h];S.direction.setFromMatrixPosition(b.matrixWorld),o.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(o),S.direction.transformDirection(u),h++}else if(b.isSpotLight){let S=n.spot[g];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(u),S.direction.setFromMatrixPosition(b.matrixWorld),o.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(o),S.direction.transformDirection(u),g++}else if(b.isRectAreaLight){let S=n.rectArea[x];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(u),s.identity(),a.copy(b.matrixWorld),a.premultiply(u),s.extractRotation(a),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(s),S.halfHeight.applyMatrix4(s),x++}else if(b.isPointLight){let S=n.point[m];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(u),m++}else if(b.isHemisphereLight){let S=n.hemi[v];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(u),S.direction.normalize(),v++}}}return{setup:c,setupView:l,state:n}}function eh(r,e){let t=new $u(r,e),i=[],n=[];function o(){i.length=0,n.length=0}function a(d){i.push(d)}function s(d){n.push(d)}function c(){t.setup(i)}function l(d){t.setupView(i,d)}return{init:o,state:{lightsArray:i,shadowsArray:n,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:s}}function th(r,e){let t=new WeakMap;function i(o,a=0){let s;return t.has(o)===!1?(s=new eh(r,e),t.set(o,[s])):a>=t.get(o).length?(s=new eh(r,e),t.get(o).push(s)):s=t.get(o)[a],s}function n(){t=new WeakMap}return{get:i,dispose:n}}var pn=class extends pt{constructor(e){super();this.type="MeshDepthMaterial",this.depthPacking=cs,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};pn.prototype.isMeshDepthMaterial=!0;var mn=class extends pt{constructor(e){super();this.type="MeshDistanceMaterial",this.referencePosition=new A,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};mn.prototype.isMeshDistanceMaterial=!0;var ih=`
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
uniform float samples;

#include <packing>

void main() {

	float mean = 0.0;
	float squared_mean = 0.0;

	// This seems totally useless but it's a crazy work around for a Adreno compiler bug
	// float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( squared_mean - mean * mean );

	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );

}
`;var rh=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`;function nh(r,e,t){let i=new Li,n=new ce,o=new ce,a=new ze,s=new pn({depthPacking:us}),c=new mn,l={},f=t.maxTextureSize,d={0:Ne,1:Vt,2:Et},h=new ct({uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4},samples:{value:8}},vertexShader:rh,fragmentShader:ih}),m=h.clone();m.defines.HORIZONTAL_PASS=1;let g=new je;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ke(g,h),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pr,this.render=function(b,S,C){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||b.length===0)return;let M=r.getRenderTarget(),j=r.getActiveCubeFace(),N=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Mt),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);for(let B=0,$=b.length;B<$;B++){let G=b[B],P=G.shadow;if(P===void 0){console.warn("THREE.WebGLShadowMap:",G,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;n.copy(P.mapSize);let U=P.getFrameExtents();if(n.multiply(U),o.copy(P.mapSize),(n.x>f||n.y>f)&&(n.x>f&&(o.x=Math.floor(f/U.x),n.x=o.x*U.x,P.mapSize.x=o.x),n.y>f&&(o.y=Math.floor(f/U.y),n.y=o.y*U.y,P.mapSize.y=o.y)),P.map===null&&!P.isPointLightShadow&&this.type===Si){let W={minFilter:Ke,magFilter:Ke,format:qe};P.map=new Ye(n.x,n.y,W),P.map.texture.name=G.name+".shadowMap",P.mapPass=new Ye(n.x,n.y,W),P.camera.updateProjectionMatrix()}if(P.map===null){let W={minFilter:Oe,magFilter:Oe,format:qe};P.map=new Ye(n.x,n.y,W),P.map.texture.name=G.name+".shadowMap",P.camera.updateProjectionMatrix()}r.setRenderTarget(P.map),r.clear();let z=P.getViewportCount();for(let W=0;W<z;W++){let te=P.getViewport(W);a.set(o.x*te.x,o.y*te.y,o.x*te.z,o.y*te.w),O.viewport(a),P.updateMatrices(G,W),i=P.getFrustum(),T(S,C,P.camera,G,this.type)}!P.isPointLightShadow&&this.type===Si&&u(P,C),P.needsUpdate=!1}v.needsUpdate=!1,r.setRenderTarget(M,j,N)};function u(b,S){let C=e.update(x);h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,h.uniforms.samples.value=b.blurSamples,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(S,null,C,h,x,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,m.uniforms.samples.value=b.blurSamples,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(S,null,C,m,x,null)}function p(b,S,C,M,j,N,O){let B=null,$=M.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if($!==void 0?B=$:B=M.isPointLight===!0?c:s,r.localClippingEnabled&&C.clipShadows===!0&&C.clippingPlanes.length!==0){let G=B.uuid,P=C.uuid,U=l[G];U===void 0&&(U={},l[G]=U);let z=U[P];z===void 0&&(z=B.clone(),U[P]=z),B=z}return B.visible=C.visible,B.wireframe=C.wireframe,O===Si?B.side=C.shadowSide!==null?C.shadowSide:C.side:B.side=C.shadowSide!==null?C.shadowSide:d[C.side],B.clipShadows=C.clipShadows,B.clippingPlanes=C.clippingPlanes,B.clipIntersection=C.clipIntersection,B.wireframeLinewidth=C.wireframeLinewidth,B.linewidth=C.linewidth,M.isPointLight===!0&&B.isMeshDistanceMaterial===!0&&(B.referencePosition.setFromMatrixPosition(M.matrixWorld),B.nearDistance=j,B.farDistance=N),B}function T(b,S,C,M,j){if(b.visible===!1)return;if(b.layers.test(S.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&j===Si)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,b.matrixWorld);let B=e.update(b),$=b.material;if(Array.isArray($)){let G=B.groups;for(let P=0,U=G.length;P<U;P++){let z=G[P],W=$[z.materialIndex];if(W&&W.visible){let te=p(b,B,W,M,C.near,C.far,j);r.renderBufferDirect(C,null,B,te,b,z)}}}else if($.visible){let G=p(b,B,$,M,C.near,C.far,j);r.renderBufferDirect(C,null,B,G,b,null)}}let O=b.children;for(let B=0,$=O.length;B<$;B++)T(O[B],S,C,M,j)}}function oh(r,e,t){let i=t.isWebGL2;function n(){let L=!1,K=new ze,V=null,ee=new ze(0,0,0,0);return{setMask:function(ne){V!==ne&&!L&&(r.colorMask(ne,ne,ne,ne),V=ne)},setLocked:function(ne){L=ne},setClear:function(ne,Ee,R,Q,Ue){Ue===!0&&(ne*=Q,Ee*=Q,R*=Q),K.set(ne,Ee,R,Q),ee.equals(K)===!1&&(r.clearColor(ne,Ee,R,Q),ee.copy(K))},reset:function(){L=!1,V=null,ee.set(-1,0,0,0)}}}function o(){let L=!1,K=null,V=null,ee=null;return{setTest:function(ne){ne?q(r.DEPTH_TEST):J(r.DEPTH_TEST)},setMask:function(ne){K!==ne&&!L&&(r.depthMask(ne),K=ne)},setFunc:function(ne){if(V!==ne){if(ne)switch(ne){case ta:r.depthFunc(r.NEVER);break;case ia:r.depthFunc(r.ALWAYS);break;case ra:r.depthFunc(r.LESS);break;case or:r.depthFunc(r.LEQUAL);break;case na:r.depthFunc(r.EQUAL);break;case oa:r.depthFunc(r.GEQUAL);break;case aa:r.depthFunc(r.GREATER);break;case sa:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}else r.depthFunc(r.LEQUAL);V=ne}},setLocked:function(ne){L=ne},setClear:function(ne){ee!==ne&&(r.clearDepth(ne),ee=ne)},reset:function(){L=!1,K=null,V=null,ee=null}}}function a(){let L=!1,K=null,V=null,ee=null,ne=null,Ee=null,R=null,Q=null,Ue=null;return{setTest:function(Te){L||(Te?q(r.STENCIL_TEST):J(r.STENCIL_TEST))},setMask:function(Te){K!==Te&&!L&&(r.stencilMask(Te),K=Te)},setFunc:function(Te,We,at){(V!==Te||ee!==We||ne!==at)&&(r.stencilFunc(Te,We,at),V=Te,ee=We,ne=at)},setOp:function(Te,We,at){(Ee!==Te||R!==We||Q!==at)&&(r.stencilOp(Te,We,at),Ee=Te,R=We,Q=at)},setLocked:function(Te){L=Te},setClear:function(Te){Ue!==Te&&(r.clearStencil(Te),Ue=Te)},reset:function(){L=!1,K=null,V=null,ee=null,ne=null,Ee=null,R=null,Q=null,Ue=null}}}let s=new n,c=new o,l=new a,f={},d=null,h={},m=null,g=!1,x=null,v=null,u=null,p=null,T=null,b=null,S=null,C=!1,M=null,j=null,N=null,O=null,B=null,$=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,P=0,U=r.getParameter(r.VERSION);U.indexOf("WebGL")!==-1?(P=parseFloat(/^WebGL (\d)/.exec(U)[1]),G=P>=1):U.indexOf("OpenGL ES")!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),G=P>=2);let z=null,W={},te=r.getParameter(r.SCISSOR_BOX),oe=r.getParameter(r.VIEWPORT),fe=new ze().fromArray(te),ie=new ze().fromArray(oe);function Ae(L,K,V){let ee=new Uint8Array(4),ne=r.createTexture();r.bindTexture(L,ne),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ee=0;Ee<V;Ee++)r.texImage2D(K+Ee,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ee);return ne}let k={};k[r.TEXTURE_2D]=Ae(r.TEXTURE_2D,r.TEXTURE_2D,1),k[r.TEXTURE_CUBE_MAP]=Ae(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),s.setClear(0,0,0,1),c.setClear(1),l.setClear(0),q(r.DEPTH_TEST),c.setFunc(or),Ie(!1),tt(yn),q(r.CULL_FACE),Re(Mt);function q(L){f[L]!==!0&&(r.enable(L),f[L]=!0)}function J(L){f[L]!==!1&&(r.disable(L),f[L]=!1)}function w(L){L!==d&&(r.bindFramebuffer(r.FRAMEBUFFER,L),d=L)}function xe(L,K){return K===null&&d!==null&&(K=d),h[L]!==K?(r.bindFramebuffer(L,K),h[L]=K,i&&(L===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=K),L===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=K)),!0):!1}function ye(L){return m!==L?(r.useProgram(L),m=L,!0):!1}let de={[oi]:r.FUNC_ADD,[Ho]:r.FUNC_SUBTRACT,[Wo]:r.FUNC_REVERSE_SUBTRACT};if(i)de[Tn]=r.MIN,de[wn]=r.MAX;else{let L=e.get("EXT_blend_minmax");L!==null&&(de[Tn]=L.MIN_EXT,de[wn]=L.MAX_EXT)}let he={[Xo]:r.ZERO,[Yo]:r.ONE,[qo]:r.SRC_COLOR,[Fr]:r.SRC_ALPHA,[ea]:r.SRC_ALPHA_SATURATE,[Qo]:r.DST_COLOR,[Ko]:r.DST_ALPHA,[Zo]:r.ONE_MINUS_SRC_COLOR,[Ir]:r.ONE_MINUS_SRC_ALPHA,[$o]:r.ONE_MINUS_DST_COLOR,[Jo]:r.ONE_MINUS_DST_ALPHA};function Re(L,K,V,ee,ne,Ee,R,Q){if(L===Mt){g===!0&&(J(r.BLEND),g=!1);return}if(g===!1&&(q(r.BLEND),g=!0),L!==ko){if(L!==x||Q!==C){if((v!==oi||T!==oi)&&(r.blendEquation(r.FUNC_ADD),v=oi,T=oi),Q)switch(L){case bi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Sn:r.blendFunc(r.ONE,r.ONE);break;case bn:r.blendFuncSeparate(r.ZERO,r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ONE_MINUS_SRC_ALPHA);break;case En:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case bi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Sn:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case bn:r.blendFunc(r.ZERO,r.ONE_MINUS_SRC_COLOR);break;case En:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}u=null,p=null,b=null,S=null,x=L,C=Q}return}ne=ne||K,Ee=Ee||V,R=R||ee,(K!==v||ne!==T)&&(r.blendEquationSeparate(de[K],de[ne]),v=K,T=ne),(V!==u||ee!==p||Ee!==b||R!==S)&&(r.blendFuncSeparate(he[V],he[ee],he[Ee],he[R]),u=V,p=ee,b=Ee,S=R),x=L,C=null}function De(L,K){L.side===Et?J(r.CULL_FACE):q(r.CULL_FACE);let V=L.side===Ne;K&&(V=!V),Ie(V),L.blending===bi&&L.transparent===!1?Re(Mt):Re(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.premultipliedAlpha),c.setFunc(L.depthFunc),c.setTest(L.depthTest),c.setMask(L.depthWrite),s.setMask(L.colorWrite);let ee=L.stencilWrite;l.setTest(ee),ee&&(l.setMask(L.stencilWriteMask),l.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),l.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ht(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?q(r.SAMPLE_ALPHA_TO_COVERAGE):J(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ie(L){M!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),M=L)}function tt(L){L!==Oo?(q(r.CULL_FACE),L!==j&&(L===yn?r.cullFace(r.BACK):L===zo?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):J(r.CULL_FACE),j=L}function mt(L){L!==N&&(G&&r.lineWidth(L),N=L)}function ht(L,K,V){L?(q(r.POLYGON_OFFSET_FILL),(O!==K||B!==V)&&(r.polygonOffset(K,V),O=K,B=V)):J(r.POLYGON_OFFSET_FILL)}function E(L){L?q(r.SCISSOR_TEST):J(r.SCISSOR_TEST)}function y(L){L===void 0&&(L=r.TEXTURE0+$-1),z!==L&&(r.activeTexture(L),z=L)}function H(L,K){z===null&&y();let V=W[z];V===void 0&&(V={type:void 0,texture:void 0},W[z]=V),(V.type!==L||V.texture!==K)&&(r.bindTexture(L,K||k[L]),V.type=L,V.texture=K)}function Y(){let L=W[z];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function le(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function re(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function me(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ge(L){fe.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),fe.copy(L))}function _e(L){ie.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),ie.copy(L))}function ae(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),i===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),f={},z=null,W={},d=null,h={},m=null,g=!1,x=null,v=null,u=null,p=null,T=null,b=null,S=null,C=!1,M=null,j=null,N=null,O=null,B=null,fe.set(0,0,r.canvas.width,r.canvas.height),ie.set(0,0,r.canvas.width,r.canvas.height),s.reset(),c.reset(),l.reset()}return{buffers:{color:s,depth:c,stencil:l},enable:q,disable:J,bindFramebuffer:xe,bindXRFramebuffer:w,useProgram:ye,setBlending:Re,setMaterial:De,setFlipSided:Ie,setCullFace:tt,setLineWidth:mt,setPolygonOffset:ht,setScissorTest:E,activeTexture:y,bindTexture:H,unbindTexture:Y,compressedTexImage2D:le,texImage2D:re,texImage3D:me,scissor:ge,viewport:_e,reset:ae}}function ah(r,e,t,i,n,o,a){let s=n.isWebGL2,c=n.maxTextures,l=n.maxCubemapSize,f=n.maxTextureSize,d=n.maxSamples,h=new WeakMap,m,g=!1;try{g=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(E,y){return g?new OffscreenCanvas(E,y):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}function v(E,y,H,Y){let le=1;if((E.width>Y||E.height>Y)&&(le=Y/Math.max(E.width,E.height)),le<1||y===!0)if(typeof HTMLImageElement!="undefined"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&E instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&E instanceof ImageBitmap){let re=y?ps:Math.floor,me=re(le*E.width),ge=re(le*E.height);m===void 0&&(m=x(me,ge));let _e=H?x(me,ge):m;return _e.width=me,_e.height=ge,_e.getContext("2d").drawImage(E,0,0,me,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+E.width+"x"+E.height+") to ("+me+"x"+ge+")."),_e}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+E.width+"x"+E.height+")."),E;return E}function u(E){return kn(E.width)&&kn(E.height)}function p(E){return s?!1:E.wrapS!==Qe||E.wrapT!==Qe||E.minFilter!==Oe&&E.minFilter!==Ke}function T(E,y){return E.generateMipmaps&&y&&E.minFilter!==Oe&&E.minFilter!==Ke}function b(E,y,H,Y,le=1){r.generateMipmap(E);let re=i.get(y);re.__maxMipLevel=Math.log2(Math.max(H,Y,le))}function S(E,y,H){if(s===!1)return y;if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=y;return y===r.RED&&(H===r.FLOAT&&(Y=r.R32F),H===r.HALF_FLOAT&&(Y=r.R16F),H===r.UNSIGNED_BYTE&&(Y=r.R8)),y===r.RGB&&(H===r.FLOAT&&(Y=r.RGB32F),H===r.HALF_FLOAT&&(Y=r.RGB16F),H===r.UNSIGNED_BYTE&&(Y=r.RGB8)),y===r.RGBA&&(H===r.FLOAT&&(Y=r.RGBA32F),H===r.HALF_FLOAT&&(Y=r.RGBA16F),H===r.UNSIGNED_BYTE&&(Y=r.RGBA8)),(Y===r.R16F||Y===r.R32F||Y===r.RGBA16F||Y===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function C(E){return E===Oe||E===Ln||E===Rn?r.NEAREST:r.LINEAR}function M(E){let y=E.target;y.removeEventListener("dispose",M),N(y),y.isVideoTexture&&h.delete(y),a.memory.textures--}function j(E){let y=E.target;y.removeEventListener("dispose",j),O(y)}function N(E){let y=i.get(E);y.__webglInit!==void 0&&(r.deleteTexture(y.__webglTexture),i.remove(E))}function O(E){let y=E.texture,H=i.get(E),Y=i.get(y);if(!!E){if(Y.__webglTexture!==void 0&&(r.deleteTexture(Y.__webglTexture),a.memory.textures--),E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let le=0;le<6;le++)r.deleteFramebuffer(H.__webglFramebuffer[le]),H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer[le]);else r.deleteFramebuffer(H.__webglFramebuffer),H.__webglDepthbuffer&&r.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&r.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer&&r.deleteRenderbuffer(H.__webglColorRenderbuffer),H.__webglDepthRenderbuffer&&r.deleteRenderbuffer(H.__webglDepthRenderbuffer);if(E.isWebGLMultipleRenderTargets)for(let le=0,re=y.length;le<re;le++){let me=i.get(y[le]);me.__webglTexture&&(r.deleteTexture(me.__webglTexture),a.memory.textures--),i.remove(y[le])}i.remove(y),i.remove(E)}}let B=0;function $(){B=0}function G(){let E=B;return E>=c&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+c),B+=1,E}function P(E,y){let H=i.get(E);if(E.isVideoTexture&&De(E),E.version>0&&H.__version!==E.version){let Y=E.image;if(Y===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ae(H,E,y);return}}t.activeTexture(r.TEXTURE0+y),t.bindTexture(r.TEXTURE_2D,H.__webglTexture)}function U(E,y){let H=i.get(E);if(E.version>0&&H.__version!==E.version){Ae(H,E,y);return}t.activeTexture(r.TEXTURE0+y),t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture)}function z(E,y){let H=i.get(E);if(E.version>0&&H.__version!==E.version){Ae(H,E,y);return}t.activeTexture(r.TEXTURE0+y),t.bindTexture(r.TEXTURE_3D,H.__webglTexture)}function W(E,y){let H=i.get(E);if(E.version>0&&H.__version!==E.version){k(H,E,y);return}t.activeTexture(r.TEXTURE0+y),t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture)}let te={[cr]:r.REPEAT,[Qe]:r.CLAMP_TO_EDGE,[ur]:r.MIRRORED_REPEAT},oe={[Oe]:r.NEAREST,[Ln]:r.NEAREST_MIPMAP_NEAREST,[Rn]:r.NEAREST_MIPMAP_LINEAR,[Ke]:r.LINEAR,[ma]:r.LINEAR_MIPMAP_NEAREST,[li]:r.LINEAR_MIPMAP_LINEAR};function fe(E,y,H){if(H?(r.texParameteri(E,r.TEXTURE_WRAP_S,te[y.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,te[y.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,te[y.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,oe[y.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,oe[y.minFilter])):(r.texParameteri(E,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(E,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(y.wrapS!==Qe||y.wrapT!==Qe)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(E,r.TEXTURE_MAG_FILTER,C(y.magFilter)),r.texParameteri(E,r.TEXTURE_MIN_FILTER,C(y.minFilter)),y.minFilter!==Oe&&y.minFilter!==Ke&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){let Y=e.get("EXT_texture_filter_anisotropic");if(y.type===Nt&&e.has("OES_texture_float_linear")===!1||s===!1&&y.type===kt&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(r.texParameterf(E,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,n.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function ie(E,y){E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",M),E.__webglTexture=r.createTexture(),a.memory.textures++)}function Ae(E,y,H){let Y=r.TEXTURE_2D;y.isDataTexture2DArray&&(Y=r.TEXTURE_2D_ARRAY),y.isDataTexture3D&&(Y=r.TEXTURE_3D),ie(E,y),t.activeTexture(r.TEXTURE0+H),t.bindTexture(Y,E.__webglTexture),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.NONE);let le=p(y)&&u(y.image)===!1,re=v(y.image,le,!1,f),me=u(re)||s,ge=o.convert(y.format),_e=o.convert(y.type),ae=S(y.internalFormat,ge,_e);fe(Y,y,me);let L,K=y.mipmaps;if(y.isDepthTexture)ae=r.DEPTH_COMPONENT,s?y.type===Nt?ae=r.DEPTH_COMPONENT32F:y.type===Ii?ae=r.DEPTH_COMPONENT24:y.type===Ni?ae=r.DEPTH24_STENCIL8:ae=r.DEPTH_COMPONENT16:y.type===Nt&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===fr&&ae===r.DEPTH_COMPONENT&&y.type!==hr&&y.type!==Ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=hr,_e=o.convert(y.type)),y.format===dr&&ae===r.DEPTH_COMPONENT&&(ae=r.DEPTH_STENCIL,y.type!==Ni&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=Ni,_e=o.convert(y.type))),t.texImage2D(r.TEXTURE_2D,0,ae,re.width,re.height,0,ge,_e,null);else if(y.isDataTexture)if(K.length>0&&me){for(let V=0,ee=K.length;V<ee;V++)L=K[V],t.texImage2D(r.TEXTURE_2D,V,ae,L.width,L.height,0,ge,_e,L.data);y.generateMipmaps=!1,E.__maxMipLevel=K.length-1}else t.texImage2D(r.TEXTURE_2D,0,ae,re.width,re.height,0,ge,_e,re.data),E.__maxMipLevel=0;else if(y.isCompressedTexture){for(let V=0,ee=K.length;V<ee;V++)L=K[V],y.format!==qe&&y.format!==ci?ge!==null?t.compressedTexImage2D(r.TEXTURE_2D,V,ae,L.width,L.height,0,L.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):t.texImage2D(r.TEXTURE_2D,V,ae,L.width,L.height,0,ge,_e,L.data);E.__maxMipLevel=K.length-1}else if(y.isDataTexture2DArray)t.texImage3D(r.TEXTURE_2D_ARRAY,0,ae,re.width,re.height,re.depth,0,ge,_e,re.data),E.__maxMipLevel=0;else if(y.isDataTexture3D)t.texImage3D(r.TEXTURE_3D,0,ae,re.width,re.height,re.depth,0,ge,_e,re.data),E.__maxMipLevel=0;else if(K.length>0&&me){for(let V=0,ee=K.length;V<ee;V++)L=K[V],t.texImage2D(r.TEXTURE_2D,V,ae,ge,_e,L);y.generateMipmaps=!1,E.__maxMipLevel=K.length-1}else t.texImage2D(r.TEXTURE_2D,0,ae,ge,_e,re),E.__maxMipLevel=0;T(y,me)&&b(Y,y,re.width,re.height),E.__version=y.version,y.onUpdate&&y.onUpdate(y)}function k(E,y,H){if(y.image.length!==6)return;ie(E,y),t.activeTexture(r.TEXTURE0+H),t.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.NONE);let Y=y&&(y.isCompressedTexture||y.image[0].isCompressedTexture),le=y.image[0]&&y.image[0].isDataTexture,re=[];for(let V=0;V<6;V++)!Y&&!le?re[V]=v(y.image[V],!1,!0,l):re[V]=le?y.image[V].image:y.image[V];let me=re[0],ge=u(me)||s,_e=o.convert(y.format),ae=o.convert(y.type),L=S(y.internalFormat,_e,ae);fe(r.TEXTURE_CUBE_MAP,y,ge);let K;if(Y){for(let V=0;V<6;V++){K=re[V].mipmaps;for(let ee=0;ee<K.length;ee++){let ne=K[ee];y.format!==qe&&y.format!==ci?_e!==null?t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+V,ee,L,ne.width,ne.height,0,ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+V,ee,L,ne.width,ne.height,0,_e,ae,ne.data)}}E.__maxMipLevel=K.length-1}else{K=y.mipmaps;for(let V=0;V<6;V++)if(le){t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,L,re[V].width,re[V].height,0,_e,ae,re[V].data);for(let ee=0;ee<K.length;ee++){let Ee=K[ee].image[V].image;t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+V,ee+1,L,Ee.width,Ee.height,0,_e,ae,Ee.data)}}else{t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,L,_e,ae,re[V]);for(let ee=0;ee<K.length;ee++){let ne=K[ee];t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+V,ee+1,L,_e,ae,ne.image[V])}}E.__maxMipLevel=K.length}T(y,ge)&&b(r.TEXTURE_CUBE_MAP,y,me.width,me.height),E.__version=y.version,y.onUpdate&&y.onUpdate(y)}function q(E,y,H,Y,le){let re=o.convert(H.format),me=o.convert(H.type),ge=S(H.internalFormat,re,me);le===r.TEXTURE_3D||le===r.TEXTURE_2D_ARRAY?t.texImage3D(le,0,ge,y.width,y.height,y.depth,0,re,me,null):t.texImage2D(le,0,ge,y.width,y.height,0,re,me,null),t.bindFramebuffer(r.FRAMEBUFFER,E),r.framebufferTexture2D(r.FRAMEBUFFER,Y,le,i.get(H).__webglTexture,0),t.bindFramebuffer(r.FRAMEBUFFER,null)}function J(E,y,H){if(r.bindRenderbuffer(r.RENDERBUFFER,E),y.depthBuffer&&!y.stencilBuffer){let Y=r.DEPTH_COMPONENT16;if(H){let le=y.depthTexture;le&&le.isDepthTexture&&(le.type===Nt?Y=r.DEPTH_COMPONENT32F:le.type===Ii&&(Y=r.DEPTH_COMPONENT24));let re=Re(y);r.renderbufferStorageMultisample(r.RENDERBUFFER,re,Y,y.width,y.height)}else r.renderbufferStorage(r.RENDERBUFFER,Y,y.width,y.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,E)}else if(y.depthBuffer&&y.stencilBuffer){if(H){let Y=Re(y);r.renderbufferStorageMultisample(r.RENDERBUFFER,Y,r.DEPTH24_STENCIL8,y.width,y.height)}else r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,y.width,y.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,E)}else{let Y=y.isWebGLMultipleRenderTargets===!0?y.texture[0]:y.texture,le=o.convert(Y.format),re=o.convert(Y.type),me=S(Y.internalFormat,le,re);if(H){let ge=Re(y);r.renderbufferStorageMultisample(r.RENDERBUFFER,ge,me,y.width,y.height)}else r.renderbufferStorage(r.RENDERBUFFER,me,y.width,y.height)}r.bindRenderbuffer(r.RENDERBUFFER,null)}function w(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),P(y.depthTexture,0);let Y=i.get(y.depthTexture).__webglTexture;if(y.depthTexture.format===fr)r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Y,0);else if(y.depthTexture.format===dr)r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function xe(E){let y=i.get(E),H=E.isWebGLCubeRenderTarget===!0;if(E.depthTexture){if(H)throw new Error("target.depthTexture not supported in Cube render targets");w(y.__webglFramebuffer,E)}else if(H){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]=r.createRenderbuffer(),J(y.__webglDepthbuffer[Y],E,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=r.createRenderbuffer(),J(y.__webglDepthbuffer,E,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function ye(E){let y=E.texture,H=i.get(E),Y=i.get(y);E.addEventListener("dispose",j),E.isWebGLMultipleRenderTargets!==!0&&(Y.__webglTexture=r.createTexture(),Y.__version=y.version,a.memory.textures++);let le=E.isWebGLCubeRenderTarget===!0,re=E.isWebGLMultipleRenderTargets===!0,me=E.isWebGLMultisampleRenderTarget===!0,ge=y.isDataTexture3D||y.isDataTexture2DArray,_e=u(E)||s;if(s&&y.format===ci&&(y.type===Nt||y.type===kt)&&(y.format=qe,console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),le){H.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)H.__webglFramebuffer[ae]=r.createFramebuffer()}else if(H.__webglFramebuffer=r.createFramebuffer(),re)if(n.drawBuffers){let ae=E.texture;for(let L=0,K=ae.length;L<K;L++){let V=i.get(ae[L]);V.__webglTexture===void 0&&(V.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");else if(me)if(s){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer);let ae=o.convert(y.format),L=o.convert(y.type),K=S(y.internalFormat,ae,L),V=Re(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,V,K,E.width,E.height),t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,H.__webglColorRenderbuffer),r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),J(H.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(le){t.bindTexture(r.TEXTURE_CUBE_MAP,Y.__webglTexture),fe(r.TEXTURE_CUBE_MAP,y,_e);for(let ae=0;ae<6;ae++)q(H.__webglFramebuffer[ae],E,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae);T(y,_e)&&b(r.TEXTURE_CUBE_MAP,y,E.width,E.height),t.bindTexture(r.TEXTURE_CUBE_MAP,null)}else if(re){let ae=E.texture;for(let L=0,K=ae.length;L<K;L++){let V=ae[L],ee=i.get(V);t.bindTexture(r.TEXTURE_2D,ee.__webglTexture),fe(r.TEXTURE_2D,V,_e),q(H.__webglFramebuffer,E,V,r.COLOR_ATTACHMENT0+L,r.TEXTURE_2D),T(V,_e)&&b(r.TEXTURE_2D,V,E.width,E.height)}t.bindTexture(r.TEXTURE_2D,null)}else{let ae=r.TEXTURE_2D;ge&&(s?ae=y.isDataTexture3D?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.")),t.bindTexture(ae,Y.__webglTexture),fe(ae,y,_e),q(H.__webglFramebuffer,E,y,r.COLOR_ATTACHMENT0,ae),T(y,_e)&&b(ae,y,E.width,E.height,E.depth),t.bindTexture(ae,null)}E.depthBuffer&&xe(E)}function de(E){let y=u(E)||s,H=E.isWebGLMultipleRenderTargets===!0?E.texture:[E.texture];for(let Y=0,le=H.length;Y<le;Y++){let re=H[Y];if(T(re,y)){let me=E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ge=i.get(re).__webglTexture;t.bindTexture(me,ge),b(me,re,E.width,E.height),t.bindTexture(me,null)}}}function he(E){if(E.isWebGLMultisampleRenderTarget)if(s){let y=E.width,H=E.height,Y=r.COLOR_BUFFER_BIT;E.depthBuffer&&(Y|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&(Y|=r.STENCIL_BUFFER_BIT);let le=i.get(E);t.bindFramebuffer(r.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglFramebuffer),r.blitFramebuffer(0,0,y,H,0,0,y,H,Y,r.NEAREST),t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function Re(E){return s&&E.isWebGLMultisampleRenderTarget?Math.min(d,E.samples):0}function De(E){let y=a.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}let Ie=!1,tt=!1;function mt(E,y){E&&E.isWebGLRenderTarget&&(Ie===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),Ie=!0),E=E.texture),P(E,y)}function ht(E,y){E&&E.isWebGLCubeRenderTarget&&(tt===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),tt=!0),E=E.texture),W(E,y)}this.allocateTextureUnit=G,this.resetTextureUnits=$,this.setTexture2D=P,this.setTexture2DArray=U,this.setTexture3D=z,this.setTextureCube=W,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=he,this.safeSetTexture2D=mt,this.safeSetTextureCube=ht}function sh(r,e,t){let i=t.isWebGL2;function n(o){let a;if(o===It)return r.UNSIGNED_BYTE;if(o===va)return r.UNSIGNED_SHORT_4_4_4_4;if(o===Ma)return r.UNSIGNED_SHORT_5_5_5_1;if(o===ya)return r.UNSIGNED_SHORT_5_6_5;if(o===ga)return r.BYTE;if(o===xa)return r.SHORT;if(o===hr)return r.UNSIGNED_SHORT;if(o===_a)return r.INT;if(o===Ii)return r.UNSIGNED_INT;if(o===Nt)return r.FLOAT;if(o===kt)return i?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(o===Sa)return r.ALPHA;if(o===ci)return r.RGB;if(o===qe)return r.RGBA;if(o===ba)return r.LUMINANCE;if(o===Ea)return r.LUMINANCE_ALPHA;if(o===fr)return r.DEPTH_COMPONENT;if(o===dr)return r.DEPTH_STENCIL;if(o===wa)return r.RED;if(o===Aa)return r.RED_INTEGER;if(o===La)return r.RG;if(o===Ra)return r.RG_INTEGER;if(o===Ca)return r.RGB_INTEGER;if(o===Da)return r.RGBA_INTEGER;if(o===Cn||o===Dn||o===Pn||o===Fn)if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(o===Cn)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===Dn)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Pn)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Fn)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===In||o===Nn||o===Un||o===Bn)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(o===In)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Nn)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===Un)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===Bn)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===Pa)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if((o===Gn||o===On)&&(a=e.get("WEBGL_compressed_texture_etc"),a!==null)){if(o===Gn)return a.COMPRESSED_RGB8_ETC2;if(o===On)return a.COMPRESSED_RGBA8_ETC2_EAC}if(o===Fa||o===Ia||o===Na||o===Ua||o===Ba||o===Ga||o===Oa||o===za||o===ja||o===Va||o===ka||o===Ha||o===Wa||o===Xa||o===qa||o===Za||o===Ka||o===Ja||o===Qa||o===$a||o===es||o===ts||o===is||o===rs||o===ns||o===os||o===as||o===ss)return a=e.get("WEBGL_compressed_texture_astc"),a!==null?o:null;if(o===Ya)return a=e.get("EXT_texture_compression_bptc"),a!==null?o:null;if(o===Ni)return i?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null)}return{convert:n}}var gn=class extends Ze{constructor(e=[]){super();this.cameras=e}};gn.prototype.isArrayCamera=!0;var Di=class extends Fe{constructor(){super();this.type="Group"}};Di.prototype.isGroup=!0;var od={type:"move"},wr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Di,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Di,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Di,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,o=null,a=null,s=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred")if(s!==null&&(n=t.getPose(e.targetRaySpace,i),n!==null&&(s.matrix.fromArray(n.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),n.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(n.linearVelocity)):s.hasLinearVelocity=!1,n.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(n.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(od))),l&&e.hand){a=!0;for(let x of e.hand.values()){let v=t.getJointPose(x,i);if(l.joints[x.jointName]===void 0){let p=new Di;p.matrixAutoUpdate=!1,p.visible=!1,l.joints[x.jointName]=p,l.add(p)}let u=l.joints[x.jointName];v!==null&&(u.matrix.fromArray(v.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.jointRadius=v.radius),u.visible=v!==null}let f=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=f.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&h>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,i),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));return s!==null&&(s.visible=n!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=a!==null),this}};var Ro=class extends lt{constructor(e,t){super();let i=this,n=e.state,o=null,a=1,s=null,c="local-floor",l=null,f=null,d=null,h=null,m=null,g=!1,x=null,v=null,u=null,p=null,T=null,b=null,S=[],C=new Map,M=new Ze;M.layers.enable(1),M.viewport=new ze;let j=new Ze;j.layers.enable(2),j.viewport=new ze;let N=[M,j],O=new gn;O.layers.enable(1),O.layers.enable(2);let B=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let q=S[k];return q===void 0&&(q=new wr,S[k]=q),q.getTargetRaySpace()},this.getControllerGrip=function(k){let q=S[k];return q===void 0&&(q=new wr,S[k]=q),q.getGripSpace()},this.getHand=function(k){let q=S[k];return q===void 0&&(q=new wr,S[k]=q),q.getHandSpace()};function G(k){let q=C.get(k.inputSource);q&&q.dispatchEvent({type:k.type,data:k.inputSource})}function P(){C.forEach(function(k,q){k.disconnect(q)}),C.clear(),B=null,$=null,n.bindXRFramebuffer(null),e.setRenderTarget(e.getRenderTarget()),d&&t.deleteFramebuffer(d),x&&t.deleteFramebuffer(x),v&&t.deleteRenderbuffer(v),u&&t.deleteRenderbuffer(u),d=null,x=null,v=null,u=null,m=null,h=null,f=null,o=null,Ae.stop(),i.isPresenting=!1,i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){a=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){c=k,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return s},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f},this.getFrame=function(){return p},this.getSession=function(){return o},this.setSession=async function(k){if(o=k,o!==null){o.addEventListener("select",G),o.addEventListener("selectstart",G),o.addEventListener("selectend",G),o.addEventListener("squeeze",G),o.addEventListener("squeezestart",G),o.addEventListener("squeezeend",G),o.addEventListener("end",P),o.addEventListener("inputsourceschange",U);let q=t.getContextAttributes();if(q.xrCompatible!==!0&&await t.makeXRCompatible(),o.renderState.layers===void 0){let J={antialias:q.antialias,alpha:q.alpha,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(o,t,J),o.updateRenderState({baseLayer:m})}else if(t instanceof WebGLRenderingContext){let J={antialias:!0,alpha:q.alpha,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(o,t,J),o.updateRenderState({layers:[m]})}else{g=q.antialias;let J=null;q.depth&&(b=t.DEPTH_BUFFER_BIT,q.stencil&&(b|=t.STENCIL_BUFFER_BIT),T=q.stencil?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,J=q.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24);let w={colorFormat:q.alpha?t.RGBA8:t.RGB8,depthFormat:J,scaleFactor:a};f=new XRWebGLBinding(o,t),h=f.createProjectionLayer(w),d=t.createFramebuffer(),o.updateRenderState({layers:[h]}),g&&(x=t.createFramebuffer(),v=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,v),t.renderbufferStorageMultisample(t.RENDERBUFFER,4,t.RGBA8,h.textureWidth,h.textureHeight),n.bindFramebuffer(t.FRAMEBUFFER,x),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,v),t.bindRenderbuffer(t.RENDERBUFFER,null),J!==null&&(u=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,u),t.renderbufferStorageMultisample(t.RENDERBUFFER,4,J,h.textureWidth,h.textureHeight),t.framebufferRenderbuffer(t.FRAMEBUFFER,T,t.RENDERBUFFER,u),t.bindRenderbuffer(t.RENDERBUFFER,null)),n.bindFramebuffer(t.FRAMEBUFFER,null))}s=await o.requestReferenceSpace(c),Ae.setContext(o),Ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}};function U(k){let q=o.inputSources;for(let J=0;J<S.length;J++)C.set(q[J],S[J]);for(let J=0;J<k.removed.length;J++){let w=k.removed[J],xe=C.get(w);xe&&(xe.dispatchEvent({type:"disconnected",data:w}),C.delete(w))}for(let J=0;J<k.added.length;J++){let w=k.added[J],xe=C.get(w);xe&&xe.dispatchEvent({type:"connected",data:w})}}let z=new A,W=new A;function te(k,q,J){z.setFromMatrixPosition(q.matrixWorld),W.setFromMatrixPosition(J.matrixWorld);let w=z.distanceTo(W),xe=q.projectionMatrix.elements,ye=J.projectionMatrix.elements,de=xe[14]/(xe[10]-1),he=xe[14]/(xe[10]+1),Re=(xe[9]+1)/xe[5],De=(xe[9]-1)/xe[5],Ie=(xe[8]-1)/xe[0],tt=(ye[8]+1)/ye[0],mt=de*Ie,ht=de*tt,E=w/(-Ie+tt),y=E*-Ie;q.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(y),k.translateZ(E),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();let H=de+E,Y=he+E,le=mt-y,re=ht+(w-y),me=Re*he/Y*H,ge=De*he/Y*H;k.projectionMatrix.makePerspective(le,re,me,ge,H,Y)}function oe(k,q){q===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(q.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(o===null)return;O.near=j.near=M.near=k.near,O.far=j.far=M.far=k.far,(B!==O.near||$!==O.far)&&(o.updateRenderState({depthNear:O.near,depthFar:O.far}),B=O.near,$=O.far);let q=k.parent,J=O.cameras;oe(O,q);for(let xe=0;xe<J.length;xe++)oe(J[xe],q);O.matrixWorld.decompose(O.position,O.quaternion,O.scale),k.position.copy(O.position),k.quaternion.copy(O.quaternion),k.scale.copy(O.scale),k.matrix.copy(O.matrix),k.matrixWorld.copy(O.matrixWorld);let w=k.children;for(let xe=0,ye=w.length;xe<ye;xe++)w[xe].updateMatrixWorld(!0);J.length===2?te(O,M,j):O.projectionMatrix.copy(M.projectionMatrix)},this.getCamera=function(){return O},this.getFoveation=function(){if(h!==null)return h.fixedFoveation;if(m!==null)return m.fixedFoveation},this.setFoveation=function(k){h!==null&&(h.fixedFoveation=k),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=k)};let fe=null;function ie(k,q){if(l=q.getViewerPose(s),p=q,l!==null){let w=l.views;m!==null&&n.bindXRFramebuffer(m.framebuffer);let xe=!1;w.length!==O.cameras.length&&(O.cameras.length=0,xe=!0);for(let ye=0;ye<w.length;ye++){let de=w[ye],he=null;if(m!==null)he=m.getViewport(de);else{let De=f.getViewSubImage(h,de);n.bindXRFramebuffer(d),De.depthStencilTexture!==void 0&&t.framebufferTexture2D(t.FRAMEBUFFER,T,t.TEXTURE_2D,De.depthStencilTexture,0),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,De.colorTexture,0),he=De.viewport}let Re=N[ye];Re.matrix.fromArray(de.transform.matrix),Re.projectionMatrix.fromArray(de.projectionMatrix),Re.viewport.set(he.x,he.y,he.width,he.height),ye===0&&O.matrix.copy(Re.matrix),xe===!0&&O.cameras.push(Re)}g&&(n.bindXRFramebuffer(x),b!==null&&t.clear(b))}let J=o.inputSources;for(let w=0;w<S.length;w++){let xe=S[w],ye=J[w];xe.update(ye,q,s)}if(fe&&fe(k,q),g){let w=h.textureWidth,xe=h.textureHeight;n.bindFramebuffer(t.READ_FRAMEBUFFER,x),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,d),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[T]),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[T]),t.blitFramebuffer(0,0,w,xe,0,0,w,xe,t.COLOR_BUFFER_BIT,t.NEAREST),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,[t.COLOR_ATTACHMENT0]),n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,x)}p=null}let Ae=new Kr;Ae.setAnimationLoop(ie),this.setAnimationLoop=function(k){fe=k},this.dispose=function(){}}};function lh(r){function e(u,p){u.fogColor.value.copy(p.color),p.isFog?(u.fogNear.value=p.near,u.fogFar.value=p.far):p.isFogExp2&&(u.fogDensity.value=p.density)}function t(u,p,T,b,S){p.isMeshBasicMaterial?i(u,p):p.isMeshLambertMaterial?(i(u,p),c(u,p)):p.isMeshToonMaterial?(i(u,p),f(u,p)):p.isMeshPhongMaterial?(i(u,p),l(u,p)):p.isMeshStandardMaterial?(i(u,p),p.isMeshPhysicalMaterial?h(u,p,S):d(u,p)):p.isMeshMatcapMaterial?(i(u,p),m(u,p)):p.isMeshDepthMaterial?(i(u,p),g(u,p)):p.isMeshDistanceMaterial?(i(u,p),x(u,p)):p.isMeshNormalMaterial?(i(u,p),v(u,p)):p.isLineBasicMaterial?(n(u,p),p.isLineDashedMaterial&&o(u,p)):p.isPointsMaterial?a(u,p,T,b):p.isSpriteMaterial?s(u,p):p.isShadowMaterial?(u.color.value.copy(p.color),u.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function i(u,p){u.opacity.value=p.opacity,p.color&&u.diffuse.value.copy(p.color),p.emissive&&u.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(u.map.value=p.map),p.alphaMap&&(u.alphaMap.value=p.alphaMap),p.specularMap&&(u.specularMap.value=p.specularMap);let T=r.get(p).envMap;if(T){u.envMap.value=T,u.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=p.reflectivity,u.ior.value=p.ior,u.refractionRatio.value=p.refractionRatio;let C=r.get(T).__maxMipLevel;C!==void 0&&(u.maxMipLevel.value=C)}p.lightMap&&(u.lightMap.value=p.lightMap,u.lightMapIntensity.value=p.lightMapIntensity),p.aoMap&&(u.aoMap.value=p.aoMap,u.aoMapIntensity.value=p.aoMapIntensity);let b;p.map?b=p.map:p.specularMap?b=p.specularMap:p.displacementMap?b=p.displacementMap:p.normalMap?b=p.normalMap:p.bumpMap?b=p.bumpMap:p.roughnessMap?b=p.roughnessMap:p.metalnessMap?b=p.metalnessMap:p.alphaMap?b=p.alphaMap:p.emissiveMap?b=p.emissiveMap:p.clearcoatMap?b=p.clearcoatMap:p.clearcoatNormalMap?b=p.clearcoatNormalMap:p.clearcoatRoughnessMap?b=p.clearcoatRoughnessMap:p.specularIntensityMap?b=p.specularIntensityMap:p.specularTintMap&&(b=p.specularTintMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),u.uvTransform.value.copy(b.matrix));let S;p.aoMap?S=p.aoMap:p.lightMap&&(S=p.lightMap),S!==void 0&&(S.isWebGLRenderTarget&&(S=S.texture),S.matrixAutoUpdate===!0&&S.updateMatrix(),u.uv2Transform.value.copy(S.matrix))}function n(u,p){u.diffuse.value.copy(p.color),u.opacity.value=p.opacity}function o(u,p){u.dashSize.value=p.dashSize,u.totalSize.value=p.dashSize+p.gapSize,u.scale.value=p.scale}function a(u,p,T,b){u.diffuse.value.copy(p.color),u.opacity.value=p.opacity,u.size.value=p.size*T,u.scale.value=b*.5,p.map&&(u.map.value=p.map),p.alphaMap&&(u.alphaMap.value=p.alphaMap);let S;p.map?S=p.map:p.alphaMap&&(S=p.alphaMap),S!==void 0&&(S.matrixAutoUpdate===!0&&S.updateMatrix(),u.uvTransform.value.copy(S.matrix))}function s(u,p){u.diffuse.value.copy(p.color),u.opacity.value=p.opacity,u.rotation.value=p.rotation,p.map&&(u.map.value=p.map),p.alphaMap&&(u.alphaMap.value=p.alphaMap);let T;p.map?T=p.map:p.alphaMap&&(T=p.alphaMap),T!==void 0&&(T.matrixAutoUpdate===!0&&T.updateMatrix(),u.uvTransform.value.copy(T.matrix))}function c(u,p){p.emissiveMap&&(u.emissiveMap.value=p.emissiveMap)}function l(u,p){u.specular.value.copy(p.specular),u.shininess.value=Math.max(p.shininess,1e-4),p.emissiveMap&&(u.emissiveMap.value=p.emissiveMap),p.bumpMap&&(u.bumpMap.value=p.bumpMap,u.bumpScale.value=p.bumpScale,p.side===Ne&&(u.bumpScale.value*=-1)),p.normalMap&&(u.normalMap.value=p.normalMap,u.normalScale.value.copy(p.normalScale),p.side===Ne&&u.normalScale.value.negate()),p.displacementMap&&(u.displacementMap.value=p.displacementMap,u.displacementScale.value=p.displacementScale,u.displacementBias.value=p.displacementBias)}function f(u,p){p.gradientMap&&(u.gradientMap.value=p.gradientMap),p.emissiveMap&&(u.emissiveMap.value=p.emissiveMap),p.bumpMap&&(u.bumpMap.value=p.bumpMap,u.bumpScale.value=p.bumpScale,p.side===Ne&&(u.bumpScale.value*=-1)),p.normalMap&&(u.normalMap.value=p.normalMap,u.normalScale.value.copy(p.normalScale),p.side===Ne&&u.normalScale.value.negate()),p.displacementMap&&(u.displacementMap.value=p.displacementMap,u.displacementScale.value=p.displacementScale,u.displacementBias.value=p.displacementBias)}function d(u,p){u.roughness.value=p.roughness,u.metalness.value=p.metalness,p.roughnessMap&&(u.roughnessMap.value=p.roughnessMap),p.metalnessMap&&(u.metalnessMap.value=p.metalnessMap),p.emissiveMap&&(u.emissiveMap.value=p.emissiveMap),p.bumpMap&&(u.bumpMap.value=p.bumpMap,u.bumpScale.value=p.bumpScale,p.side===Ne&&(u.bumpScale.value*=-1)),p.normalMap&&(u.normalMap.value=p.normalMap,u.normalScale.value.copy(p.normalScale),p.side===Ne&&u.normalScale.value.negate()),p.displacementMap&&(u.displacementMap.value=p.displacementMap,u.displacementScale.value=p.displacementScale,u.displacementBias.value=p.displacementBias),r.get(p).envMap&&(u.envMapIntensity.value=p.envMapIntensity)}function h(u,p,T){d(u,p),u.ior.value=p.ior,u.clearcoat.value=p.clearcoat,u.clearcoatRoughness.value=p.clearcoatRoughness,p.sheen&&u.sheen.value.copy(p.sheen),p.clearcoatMap&&(u.clearcoatMap.value=p.clearcoatMap),p.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap),p.clearcoatNormalMap&&(u.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),u.clearcoatNormalMap.value=p.clearcoatNormalMap,p.side===Ne&&u.clearcoatNormalScale.value.negate()),u.transmission.value=p.transmission,p.transmissionMap&&(u.transmissionMap.value=p.transmissionMap),p.transmission>0&&(u.transmissionSamplerMap.value=T.texture,u.transmissionSamplerSize.value.set(T.width,T.height)),u.thickness.value=p.thickness,p.thicknessMap&&(u.thicknessMap.value=p.thicknessMap),u.attenuationDistance.value=p.attenuationDistance,u.attenuationTint.value.copy(p.attenuationTint),u.specularIntensity.value=p.specularIntensity,u.specularTint.value.copy(p.specularTint),p.specularIntensityMap&&(u.specularIntensityMap.value=p.specularIntensityMap),p.specularTintMap&&(u.specularTintMap.value=p.specularTintMap)}function m(u,p){p.matcap&&(u.matcap.value=p.matcap),p.bumpMap&&(u.bumpMap.value=p.bumpMap,u.bumpScale.value=p.bumpScale,p.side===Ne&&(u.bumpScale.value*=-1)),p.normalMap&&(u.normalMap.value=p.normalMap,u.normalScale.value.copy(p.normalScale),p.side===Ne&&u.normalScale.value.negate()),p.displacementMap&&(u.displacementMap.value=p.displacementMap,u.displacementScale.value=p.displacementScale,u.displacementBias.value=p.displacementBias)}function g(u,p){p.displacementMap&&(u.displacementMap.value=p.displacementMap,u.displacementScale.value=p.displacementScale,u.displacementBias.value=p.displacementBias)}function x(u,p){p.displacementMap&&(u.displacementMap.value=p.displacementMap,u.displacementScale.value=p.displacementScale,u.displacementBias.value=p.displacementBias),u.referencePosition.value.copy(p.referencePosition),u.nearDistance.value=p.nearDistance,u.farDistance.value=p.farDistance}function v(u,p){p.bumpMap&&(u.bumpMap.value=p.bumpMap,u.bumpScale.value=p.bumpScale,p.side===Ne&&(u.bumpScale.value*=-1)),p.normalMap&&(u.normalMap.value=p.normalMap,u.normalScale.value.copy(p.normalScale),p.side===Ne&&u.normalScale.value.negate()),p.displacementMap&&(u.displacementMap.value=p.displacementMap,u.displacementScale.value=p.displacementScale,u.displacementBias.value=p.displacementBias)}return{refreshFogUniforms:e,refreshMaterialUniforms:t}}function ad(){let r=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");return r.style.display="block",r}function sd(r={}){let e=r.canvas!==void 0?r.canvas:ad(),t=r.context!==void 0?r.context:null,i=r.alpha!==void 0?r.alpha:!1,n=r.depth!==void 0?r.depth:!0,o=r.stencil!==void 0?r.stencil:!0,a=r.antialias!==void 0?r.antialias:!1,s=r.premultipliedAlpha!==void 0?r.premultipliedAlpha:!0,c=r.preserveDrawingBuffer!==void 0?r.preserveDrawingBuffer:!1,l=r.powerPreference!==void 0?r.powerPreference:"default",f=r.failIfMajorPerformanceCaveat!==void 0?r.failIfMajorPerformanceCaveat:!1,d=null,h=null,m=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=$e,this.physicallyCorrectLights=!1,this.toneMapping=Tt,this.toneMappingExposure=1;let x=this,v=!1,u=0,p=0,T=null,b=-1,S=null,C=new ze,M=new ze,j=null,N=e.width,O=e.height,B=1,$=null,G=null,P=new ze(0,0,N,O),U=new ze(0,0,N,O),z=!1,W=[],te=new Li,oe=!1,fe=!1,ie=null,Ae=new Le,k=new A,q={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function J(){return T===null?B:1}let w=t;function xe(_,F){for(let D=0;D<_.length;D++){let I=_[D],X=e.getContext(I,F);if(X!==null)return X}return null}try{let _={alpha:i,depth:n,stencil:o,antialias:a,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:f};if(e.addEventListener("webglcontextlost",R,!1),e.addEventListener("webglcontextrestored",Q,!1),w===null){let F=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&F.shift(),w=xe(F,_),w===null)throw xe(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}w.getShaderPrecisionFormat===void 0&&(w.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}let ye,de,he,Re,De,Ie,tt,mt,ht,E,y,H,Y,le,re,me,ge,_e,ae,L,K,V,ee;function ne(){ye=new bu(w),de=new uu(w,ye,r),ye.init(de),V=new sh(w,ye,de),he=new oh(w,ye,de),W[0]=w.BACK,Re=new wu(w),De=new Zu,Ie=new ah(w,ye,he,De,de,V,Re),tt=new fu(x),mt=new Su(x),ht=new Ds(w,de),ee=new lu(w,ye,ht,de),E=new Eu(w,ht,Re,ee),y=new Lu(w,E,ht,Re),ae=new Au(w),me=new hu(De),H=new qu(x,tt,mt,ye,de,ee,me),Y=new lh(De),le=new Qu(De),re=new th(ye,de),_e=new su(x,tt,he,y,s),ge=new nh(x,y,de),L=new cu(w,ye,Re,de),K=new Tu(w,ye,Re,de),Re.programs=H.programs,x.capabilities=de,x.extensions=ye,x.properties=De,x.renderLists=le,x.shadowMap=ge,x.state=he,x.info=Re}ne();let Ee=new Ro(x,w);this.xr=Ee,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){let _=ye.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){let _=ye.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(_){_!==void 0&&(B=_,this.setSize(N,O,!1))},this.getSize=function(_){return _.set(N,O)},this.setSize=function(_,F,D){if(Ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=_,O=F,e.width=Math.floor(_*B),e.height=Math.floor(F*B),D!==!1&&(e.style.width=_+"px",e.style.height=F+"px"),this.setViewport(0,0,_,F)},this.getDrawingBufferSize=function(_){return _.set(N*B,O*B).floor()},this.setDrawingBufferSize=function(_,F,D){N=_,O=F,B=D,e.width=Math.floor(_*D),e.height=Math.floor(F*D),this.setViewport(0,0,_,F)},this.getCurrentViewport=function(_){return _.copy(C)},this.getViewport=function(_){return _.copy(P)},this.setViewport=function(_,F,D,I){_.isVector4?P.set(_.x,_.y,_.z,_.w):P.set(_,F,D,I),he.viewport(C.copy(P).multiplyScalar(B).floor())},this.getScissor=function(_){return _.copy(U)},this.setScissor=function(_,F,D,I){_.isVector4?U.set(_.x,_.y,_.z,_.w):U.set(_,F,D,I),he.scissor(M.copy(U).multiplyScalar(B).floor())},this.getScissorTest=function(){return z},this.setScissorTest=function(_){he.setScissorTest(z=_)},this.setOpaqueSort=function(_){$=_},this.setTransparentSort=function(_){G=_},this.getClearColor=function(_){return _.copy(_e.getClearColor())},this.setClearColor=function(){_e.setClearColor.apply(_e,arguments)},this.getClearAlpha=function(){return _e.getClearAlpha()},this.setClearAlpha=function(){_e.setClearAlpha.apply(_e,arguments)},this.clear=function(_,F,D){let I=0;(_===void 0||_)&&(I|=w.COLOR_BUFFER_BIT),(F===void 0||F)&&(I|=w.DEPTH_BUFFER_BIT),(D===void 0||D)&&(I|=w.STENCIL_BUFFER_BIT),w.clear(I)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",R,!1),e.removeEventListener("webglcontextrestored",Q,!1),le.dispose(),re.dispose(),De.dispose(),tt.dispose(),mt.dispose(),y.dispose(),ee.dispose(),Ee.dispose(),Ee.removeEventListener("sessionstart",_t),Ee.removeEventListener("sessionend",vt),ie&&(ie.dispose(),ie=null),Mi.stop()};function R(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function Q(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;let _=Re.autoReset,F=ge.enabled,D=ge.autoUpdate,I=ge.needsUpdate,X=ge.type;ne(),Re.autoReset=_,ge.enabled=F,ge.autoUpdate=D,ge.needsUpdate=I,ge.type=X}function Ue(_){let F=_.target;F.removeEventListener("dispose",Ue),Te(F)}function Te(_){We(_),De.remove(_)}function We(_){let F=De.get(_).programs;F!==void 0&&F.forEach(function(D){H.releaseProgram(D)})}function at(_,F){_.render(function(D){x.renderBufferImmediate(D,F)})}this.renderBufferImmediate=function(_,F){ee.initAttributes();let D=De.get(_);_.hasPositions&&!D.position&&(D.position=w.createBuffer()),_.hasNormals&&!D.normal&&(D.normal=w.createBuffer()),_.hasUvs&&!D.uv&&(D.uv=w.createBuffer()),_.hasColors&&!D.color&&(D.color=w.createBuffer());let I=F.getAttributes();_.hasPositions&&(w.bindBuffer(w.ARRAY_BUFFER,D.position),w.bufferData(w.ARRAY_BUFFER,_.positionArray,w.DYNAMIC_DRAW),ee.enableAttribute(I.position),w.vertexAttribPointer(I.position,3,w.FLOAT,!1,0,0)),_.hasNormals&&(w.bindBuffer(w.ARRAY_BUFFER,D.normal),w.bufferData(w.ARRAY_BUFFER,_.normalArray,w.DYNAMIC_DRAW),ee.enableAttribute(I.normal),w.vertexAttribPointer(I.normal,3,w.FLOAT,!1,0,0)),_.hasUvs&&(w.bindBuffer(w.ARRAY_BUFFER,D.uv),w.bufferData(w.ARRAY_BUFFER,_.uvArray,w.DYNAMIC_DRAW),ee.enableAttribute(I.uv),w.vertexAttribPointer(I.uv,2,w.FLOAT,!1,0,0)),_.hasColors&&(w.bindBuffer(w.ARRAY_BUFFER,D.color),w.bufferData(w.ARRAY_BUFFER,_.colorArray,w.DYNAMIC_DRAW),ee.enableAttribute(I.color),w.vertexAttribPointer(I.color,3,w.FLOAT,!1,0,0)),ee.disableUnusedAttributes(),w.drawArrays(w.TRIANGLES,0,_.count),_.count=0},this.renderBufferDirect=function(_,F,D,I,X,Me){F===null&&(F=q);let ve=X.isMesh&&X.matrixWorld.determinant()<0,se=Go(_,F,I,X);he.setMaterial(I,ve);let Se=D.index,Pe=D.attributes.position;if(Se===null){if(Pe===void 0||Pe.count===0)return}else if(Se.count===0)return;let be=1;I.wireframe===!0&&(Se=E.getWireframeAttribute(D),be=2),(D.morphAttributes.position!==void 0||D.morphAttributes.normal!==void 0)&&ae.update(X,D,I,se),ee.setup(X,I,se,D,Se);let Ce,pe=L;Se!==null&&(Ce=ht.get(Se),pe=K,pe.setIndex(Ce));let Ot=Se!==null?Se.count:Pe.count,He=D.drawRange.start*be,ri=D.drawRange.count*be,bt=Me!==null?Me.start*be:0,yi=Me!==null?Me.count*be:1/0,ni=Math.max(He,bt),Je=Math.min(Ot,He+ri,bt+yi)-1,Ft=Math.max(0,Je-ni+1);if(Ft!==0){if(X.isMesh)I.wireframe===!0?(he.setLineWidth(I.wireframeLinewidth*J()),pe.setMode(w.LINES)):pe.setMode(w.TRIANGLES);else if(X.isLine){let it=I.linewidth;it===void 0&&(it=1),he.setLineWidth(it*J()),X.isLineSegments?pe.setMode(w.LINES):X.isLineLoop?pe.setMode(w.LINE_LOOP):pe.setMode(w.LINE_STRIP)}else X.isPoints?pe.setMode(w.POINTS):X.isSprite&&pe.setMode(w.TRIANGLES);if(X.isInstancedMesh)pe.renderInstances(ni,Ft,X.count);else if(D.isInstancedBufferGeometry){let it=Math.min(D.instanceCount,D._maxInstanceCount);pe.renderInstances(ni,Ft,it)}else pe.render(ni,Ft)}},this.compile=function(_,F){h=re.get(_),h.init(),g.push(h),_.traverseVisible(function(D){D.isLight&&D.layers.test(F.layers)&&(h.pushLight(D),D.castShadow&&h.pushShadow(D))}),h.setupLights(),_.traverse(function(D){let I=D.material;if(I)if(Array.isArray(I))for(let X=0;X<I.length;X++){let Me=I[X];vn(Me,_,D)}else vn(I,_,D)}),g.pop(),h=null};let ii=null;function Cr(_){ii&&ii(_)}function _t(){Mi.stop()}function vt(){Mi.start()}let Mi=new Kr;Mi.setAnimationLoop(Cr),typeof window!="undefined"&&Mi.setContext(window),this.setAnimationLoop=function(_){ii=_,Ee.setAnimationLoop(_),_===null?Mi.stop():Mi.start()},Ee.addEventListener("sessionstart",_t),Ee.addEventListener("sessionend",vt),this.render=function(_,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;_.autoUpdate===!0&&_.updateMatrixWorld(),F.parent===null&&F.updateMatrixWorld(),Ee.enabled===!0&&Ee.isPresenting===!0&&(Ee.cameraAutoUpdate===!0&&Ee.updateCamera(F),F=Ee.getCamera()),_.isScene===!0&&_.onBeforeRender(x,_,F,T),h=re.get(_,g.length),h.init(),g.push(h),Ae.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),te.setFromProjectionMatrix(Ae),fe=this.localClippingEnabled,oe=me.init(this.clippingPlanes,fe,F),d=le.get(_,m.length),d.init(),m.push(d),No(_,F,0,x.sortObjects),d.finish(),x.sortObjects===!0&&d.sort($,G),oe===!0&&me.beginShadows();let D=h.state.shadowsArray;ge.render(D,_,F),h.setupLights(),h.setupLightsView(F),oe===!0&&me.endShadows(),this.info.autoReset===!0&&this.info.reset(),_e.render(d,_);let I=d.opaque,X=d.transmissive,Me=d.transparent;I.length>0&&Dr(I,_,F),X.length>0&&Mh(I,X,_,F),Me.length>0&&Dr(Me,_,F),T!==null&&(Ie.updateMultisampleRenderTarget(T),Ie.updateRenderTargetMipmap(T)),_.isScene===!0&&_.onAfterRender(x,_,F),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1),ee.resetDefaultState(),b=-1,S=null,g.pop(),g.length>0?h=g[g.length-1]:h=null,m.pop(),m.length>0?d=m[m.length-1]:d=null};function No(_,F,D,I){if(_.visible===!1)return;if(_.layers.test(F.layers)){if(_.isGroup)D=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(F);else if(_.isLight)h.pushLight(_),_.castShadow&&h.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||te.intersectsSprite(_)){I&&k.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Ae);let ve=y.update(_),se=_.material;se.visible&&d.push(_,ve,se,D,k.z,null)}}else if(_.isImmediateRenderObject)I&&k.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Ae),d.push(_,null,_.material,D,k.z,null);else if((_.isMesh||_.isLine||_.isPoints)&&(_.isSkinnedMesh&&_.skeleton.frame!==Re.render.frame&&(_.skeleton.update(),_.skeleton.frame=Re.render.frame),!_.frustumCulled||te.intersectsObject(_))){I&&k.setFromMatrixPosition(_.matrixWorld).applyMatrix4(Ae);let ve=y.update(_),se=_.material;if(Array.isArray(se)){let Se=ve.groups;for(let Pe=0,be=Se.length;Pe<be;Pe++){let Ce=Se[Pe],pe=se[Ce.materialIndex];pe&&pe.visible&&d.push(_,ve,pe,D,k.z,Ce)}}else se.visible&&d.push(_,ve,se,D,k.z,null)}}let Me=_.children;for(let ve=0,se=Me.length;ve<se;ve++)No(Me[ve],F,D,I)}function Mh(_,F,D,I){if(ie===null){let se=a===!0&&de.isWebGL2===!0?hn:Ye;ie=new se(1024,1024,{generateMipmaps:!0,type:V.convert(kt)!==null?kt:It,minFilter:li,magFilter:Oe,wrapS:Qe,wrapT:Qe})}let X=x.getRenderTarget();x.setRenderTarget(ie),x.clear();let Me=x.toneMapping;x.toneMapping=Tt,Dr(_,D,I),x.toneMapping=Me,Ie.updateMultisampleRenderTarget(ie),Ie.updateRenderTargetMipmap(ie),x.setRenderTarget(X),Dr(F,D,I)}function Dr(_,F,D){let I=F.isScene===!0?F.overrideMaterial:null;if(D.isArrayCamera){let X=D.cameras;for(let Me=0,ve=X.length;Me<ve;Me++){let se=X[Me];he.viewport(C.copy(se.viewport)),h.setupLightsView(se);for(let Se=0,Pe=_.length;Se<Pe;Se++){let be=_[Se],Ce=be.object,pe=be.geometry,Ot=I===null?be.material:I,He=be.group;Ce.layers.test(se.layers)&&Uo(Ce,F,se,pe,Ot,He)}}}else for(let X=0,Me=_.length;X<Me;X++){let ve=_[X],se=ve.object,Se=ve.geometry,Pe=I===null?ve.material:I,be=ve.group;Uo(se,F,D,Se,Pe,be)}}function Uo(_,F,D,I,X,Me){if(_.onBeforeRender(x,F,D,I,X,Me),_.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),_.isImmediateRenderObject){let ve=Go(D,F,X,_);he.setMaterial(X),ee.reset(),at(_,ve)}else X.transparent===!0&&X.side===Et?(X.side=Ne,X.needsUpdate=!0,x.renderBufferDirect(D,F,I,X,_,Me),X.side=Vt,X.needsUpdate=!0,x.renderBufferDirect(D,F,I,X,_,Me),X.side=Et):x.renderBufferDirect(D,F,I,X,_,Me);_.onAfterRender(x,F,D,I,X,Me)}function vn(_,F,D){F.isScene!==!0&&(F=q);let I=De.get(_),X=h.state.lights,Me=h.state.shadowsArray,ve=X.state.version,se=H.getParameters(_,X.state,Me,F,D),Se=H.getProgramCacheKey(se),Pe=I.programs;I.environment=_.isMeshStandardMaterial?F.environment:null,I.fog=F.fog,I.envMap=(_.isMeshStandardMaterial?mt:tt).get(_.envMap||I.environment),Pe===void 0&&(_.addEventListener("dispose",Ue),Pe=new Map,I.programs=Pe);let be=Pe.get(Se);if(be!==void 0){if(I.currentProgram===be&&I.lightsStateVersion===ve)return Bo(_,se),be}else se.uniforms=H.getUniforms(_),_.onBuild(se,x),_.onBeforeCompile(se,x),be=H.acquireProgram(se,Se),Pe.set(Se,be),I.uniforms=se.uniforms;let Ce=I.uniforms;(!_.isShaderMaterial&&!_.isRawShaderMaterial||_.clipping===!0)&&(Ce.clippingPlanes=me.uniform),Bo(_,se),I.needsLights=Sh(_),I.lightsStateVersion=ve,I.needsLights&&(Ce.ambientLightColor.value=X.state.ambient,Ce.lightProbe.value=X.state.probe,Ce.directionalLights.value=X.state.directional,Ce.directionalLightShadows.value=X.state.directionalShadow,Ce.spotLights.value=X.state.spot,Ce.spotLightShadows.value=X.state.spotShadow,Ce.rectAreaLights.value=X.state.rectArea,Ce.ltc_1.value=X.state.rectAreaLTC1,Ce.ltc_2.value=X.state.rectAreaLTC2,Ce.pointLights.value=X.state.point,Ce.pointLightShadows.value=X.state.pointShadow,Ce.hemisphereLights.value=X.state.hemi,Ce.directionalShadowMap.value=X.state.directionalShadowMap,Ce.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ce.spotShadowMap.value=X.state.spotShadowMap,Ce.spotShadowMatrix.value=X.state.spotShadowMatrix,Ce.pointShadowMap.value=X.state.pointShadowMap,Ce.pointShadowMatrix.value=X.state.pointShadowMatrix);let pe=be.getUniforms(),Ot=Gt.seqWithValue(pe.seq,Ce);return I.currentProgram=be,I.uniformsList=Ot,be}function Bo(_,F){let D=De.get(_);D.outputEncoding=F.outputEncoding,D.instancing=F.instancing,D.skinning=F.skinning,D.morphTargets=F.morphTargets,D.morphNormals=F.morphNormals,D.numClippingPlanes=F.numClippingPlanes,D.numIntersection=F.numClipIntersection,D.vertexAlphas=F.vertexAlphas,D.vertexTangents=F.vertexTangents}function Go(_,F,D,I){F.isScene!==!0&&(F=q),Ie.resetTextureUnits();let X=F.fog,Me=D.isMeshStandardMaterial?F.environment:null,ve=T===null?x.outputEncoding:T.texture.encoding,se=(D.isMeshStandardMaterial?mt:tt).get(D.envMap||Me),Se=D.vertexColors===!0&&!!I.geometry&&!!I.geometry.attributes.color&&I.geometry.attributes.color.itemSize===4,Pe=!!I.geometry&&!!I.geometry.attributes.tangent,be=!!I.geometry&&!!I.geometry.morphAttributes.position,Ce=!!I.geometry&&!!I.geometry.morphAttributes.normal,pe=De.get(D),Ot=h.state.lights;if(oe===!0&&(fe===!0||_!==S)){let it=_===S&&D.id===b;me.setState(D,_,it)}let He=!1;D.version===pe.__version?(pe.needsLights&&pe.lightsStateVersion!==Ot.state.version||pe.outputEncoding!==ve||I.isInstancedMesh&&pe.instancing===!1||!I.isInstancedMesh&&pe.instancing===!0||I.isSkinnedMesh&&pe.skinning===!1||!I.isSkinnedMesh&&pe.skinning===!0||pe.envMap!==se||D.fog&&pe.fog!==X||pe.numClippingPlanes!==void 0&&(pe.numClippingPlanes!==me.numPlanes||pe.numIntersection!==me.numIntersection)||pe.vertexAlphas!==Se||pe.vertexTangents!==Pe||pe.morphTargets!==be||pe.morphNormals!==Ce)&&(He=!0):(He=!0,pe.__version=D.version);let ri=pe.currentProgram;He===!0&&(ri=vn(D,F,I));let bt=!1,yi=!1,ni=!1,Je=ri.getUniforms(),Ft=pe.uniforms;if(he.useProgram(ri.program)&&(bt=!0,yi=!0,ni=!0),D.id!==b&&(b=D.id,yi=!0),bt||S!==_){if(Je.setValue(w,"projectionMatrix",_.projectionMatrix),de.logarithmicDepthBuffer&&Je.setValue(w,"logDepthBufFC",2/(Math.log(_.far+1)/Math.LN2)),S!==_&&(S=_,yi=!0,ni=!0),D.isShaderMaterial||D.isMeshPhongMaterial||D.isMeshToonMaterial||D.isMeshStandardMaterial||D.envMap){let it=Je.map.cameraPosition;it!==void 0&&it.setValue(w,k.setFromMatrixPosition(_.matrixWorld))}(D.isMeshPhongMaterial||D.isMeshToonMaterial||D.isMeshLambertMaterial||D.isMeshBasicMaterial||D.isMeshStandardMaterial||D.isShaderMaterial)&&Je.setValue(w,"isOrthographic",_.isOrthographicCamera===!0),(D.isMeshPhongMaterial||D.isMeshToonMaterial||D.isMeshLambertMaterial||D.isMeshBasicMaterial||D.isMeshStandardMaterial||D.isShaderMaterial||D.isShadowMaterial||I.isSkinnedMesh)&&Je.setValue(w,"viewMatrix",_.matrixWorldInverse)}if(I.isSkinnedMesh){Je.setOptional(w,I,"bindMatrix"),Je.setOptional(w,I,"bindMatrixInverse");let it=I.skeleton;it&&(de.floatVertexTextures?(it.boneTexture===null&&it.computeBoneTexture(),Je.setValue(w,"boneTexture",it.boneTexture,Ie),Je.setValue(w,"boneTextureSize",it.boneTextureSize)):Je.setOptional(w,it,"boneMatrices"))}return(yi||pe.receiveShadow!==I.receiveShadow)&&(pe.receiveShadow=I.receiveShadow,Je.setValue(w,"receiveShadow",I.receiveShadow)),yi&&(Je.setValue(w,"toneMappingExposure",x.toneMappingExposure),pe.needsLights&&yh(Ft,ni),X&&D.fog&&Y.refreshFogUniforms(Ft,X),Y.refreshMaterialUniforms(Ft,D,B,O,ie),Gt.upload(w,pe.uniformsList,Ft,Ie)),D.isShaderMaterial&&D.uniformsNeedUpdate===!0&&(Gt.upload(w,pe.uniformsList,Ft,Ie),D.uniformsNeedUpdate=!1),D.isSpriteMaterial&&Je.setValue(w,"center",I.center),Je.setValue(w,"modelViewMatrix",I.modelViewMatrix),Je.setValue(w,"normalMatrix",I.normalMatrix),Je.setValue(w,"modelMatrix",I.matrixWorld),ri}function yh(_,F){_.ambientLightColor.needsUpdate=F,_.lightProbe.needsUpdate=F,_.directionalLights.needsUpdate=F,_.directionalLightShadows.needsUpdate=F,_.pointLights.needsUpdate=F,_.pointLightShadows.needsUpdate=F,_.spotLights.needsUpdate=F,_.spotLightShadows.needsUpdate=F,_.rectAreaLights.needsUpdate=F,_.hemisphereLights.needsUpdate=F}function Sh(_){return _.isMeshLambertMaterial||_.isMeshToonMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isShadowMaterial||_.isShaderMaterial&&_.lights===!0}this.getActiveCubeFace=function(){return u},this.getActiveMipmapLevel=function(){return p},this.getRenderTarget=function(){return T},this.setRenderTarget=function(_,F=0,D=0){T=_,u=F,p=D,_&&De.get(_).__webglFramebuffer===void 0&&Ie.setupRenderTarget(_);let I=null,X=!1,Me=!1;if(_){let se=_.texture;(se.isDataTexture3D||se.isDataTexture2DArray)&&(Me=!0);let Se=De.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(I=Se[F],X=!0):_.isWebGLMultisampleRenderTarget?I=De.get(_).__webglMultisampledFramebuffer:I=Se,C.copy(_.viewport),M.copy(_.scissor),j=_.scissorTest}else C.copy(P).multiplyScalar(B).floor(),M.copy(U).multiplyScalar(B).floor(),j=z;if(he.bindFramebuffer(w.FRAMEBUFFER,I)&&de.drawBuffers){let se=!1;if(_)if(_.isWebGLMultipleRenderTargets){let Se=_.texture;if(W.length!==Se.length||W[0]!==w.COLOR_ATTACHMENT0){for(let Pe=0,be=Se.length;Pe<be;Pe++)W[Pe]=w.COLOR_ATTACHMENT0+Pe;W.length=Se.length,se=!0}}else(W.length!==1||W[0]!==w.COLOR_ATTACHMENT0)&&(W[0]=w.COLOR_ATTACHMENT0,W.length=1,se=!0);else(W.length!==1||W[0]!==w.BACK)&&(W[0]=w.BACK,W.length=1,se=!0);se&&(de.isWebGL2?w.drawBuffers(W):ye.get("WEBGL_draw_buffers").drawBuffersWEBGL(W))}if(he.viewport(C),he.scissor(M),he.setScissorTest(j),X){let se=De.get(_.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+F,se.__webglTexture,D)}else if(Me){let se=De.get(_.texture),Se=F||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,se.__webglTexture,D||0,Se)}},this.readRenderTargetPixels=function(_,F,D,I,X,Me,ve){if(!(_&&_.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let se=De.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&ve!==void 0&&(se=se[ve]),se){he.bindFramebuffer(w.FRAMEBUFFER,se);try{let Se=_.texture,Pe=Se.format,be=Se.type;if(Pe!==qe&&V.convert(Pe)!==w.getParameter(w.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ce=be===kt&&(ye.has("EXT_color_buffer_half_float")||de.isWebGL2&&ye.has("EXT_color_buffer_float"));if(be!==It&&V.convert(be)!==w.getParameter(w.IMPLEMENTATION_COLOR_READ_TYPE)&&!(be===Nt&&(de.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Ce){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}w.checkFramebufferStatus(w.FRAMEBUFFER)===w.FRAMEBUFFER_COMPLETE?F>=0&&F<=_.width-I&&D>=0&&D<=_.height-X&&w.readPixels(F,D,I,X,V.convert(Pe),V.convert(be),Me):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{let Se=T!==null?De.get(T).__webglFramebuffer:null;he.bindFramebuffer(w.FRAMEBUFFER,Se)}}},this.copyFramebufferToTexture=function(_,F,D=0){let I=Math.pow(2,-D),X=Math.floor(F.image.width*I),Me=Math.floor(F.image.height*I),ve=V.convert(F.format);de.isWebGL2&&(ve===w.RGB&&(ve=w.RGB8),ve===w.RGBA&&(ve=w.RGBA8)),Ie.setTexture2D(F,0),w.copyTexImage2D(w.TEXTURE_2D,D,ve,_.x,_.y,X,Me,0),he.unbindTexture()},this.copyTextureToTexture=function(_,F,D,I=0){let X=F.image.width,Me=F.image.height,ve=V.convert(D.format),se=V.convert(D.type);Ie.setTexture2D(D,0),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,D.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,D.unpackAlignment),F.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,I,_.x,_.y,X,Me,ve,se,F.image.data):F.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,I,_.x,_.y,F.mipmaps[0].width,F.mipmaps[0].height,ve,F.mipmaps[0].data):w.texSubImage2D(w.TEXTURE_2D,I,_.x,_.y,ve,se,F.image),I===0&&D.generateMipmaps&&w.generateMipmap(w.TEXTURE_2D),he.unbindTexture()},this.copyTextureToTexture3D=function(_,F,D,I,X=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Me=_.max.x-_.min.x+1,ve=_.max.y-_.min.y+1,se=_.max.z-_.min.z+1,Se=V.convert(I.format),Pe=V.convert(I.type),be;if(I.isDataTexture3D)Ie.setTexture3D(I,0),be=w.TEXTURE_3D;else if(I.isDataTexture2DArray)Ie.setTexture2DArray(I,0),be=w.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,I.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,I.unpackAlignment);let Ce=w.getParameter(w.UNPACK_ROW_LENGTH),pe=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Ot=w.getParameter(w.UNPACK_SKIP_PIXELS),He=w.getParameter(w.UNPACK_SKIP_ROWS),ri=w.getParameter(w.UNPACK_SKIP_IMAGES),bt=D.isCompressedTexture?D.mipmaps[0]:D.image;w.pixelStorei(w.UNPACK_ROW_LENGTH,bt.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,bt.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,_.min.x),w.pixelStorei(w.UNPACK_SKIP_ROWS,_.min.y),w.pixelStorei(w.UNPACK_SKIP_IMAGES,_.min.z),D.isDataTexture||D.isDataTexture3D?w.texSubImage3D(be,X,F.x,F.y,F.z,Me,ve,se,Se,Pe,bt.data):D.isCompressedTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),w.compressedTexSubImage3D(be,X,F.x,F.y,F.z,Me,ve,se,Se,bt.data)):w.texSubImage3D(be,X,F.x,F.y,F.z,Me,ve,se,Se,Pe,bt),w.pixelStorei(w.UNPACK_ROW_LENGTH,Ce),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,pe),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ot),w.pixelStorei(w.UNPACK_SKIP_ROWS,He),w.pixelStorei(w.UNPACK_SKIP_IMAGES,ri),X===0&&I.generateMipmaps&&w.generateMipmap(be),he.unbindTexture()},this.initTexture=function(_){Ie.setTexture2D(_,0),he.unbindTexture()},this.resetState=function(){u=0,p=0,T=null,he.reset(),ee.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}var ch=new A,uh=new A,hh=new Le,Co=new br,xn=new Zt,Ar=class extends Fe{constructor(e=new je,t=new Kt){super();this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.isBufferGeometry)if(e.index===null){let t=e.attributes.position,i=[0];for(let n=1,o=t.count;n<o;n++)ch.fromBufferAttribute(t,n-1),uh.fromBufferAttribute(t,n),i[n]=i[n-1],i[n]+=ch.distanceTo(uh);e.setAttribute("lineDistance",new Xe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}raycast(e,t){let i=this.geometry,n=this.matrixWorld,o=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xn.copy(i.boundingSphere),xn.applyMatrix4(n),xn.radius+=o,e.ray.intersectsSphere(xn)===!1)return;hh.copy(n).invert(),Co.copy(e.ray).applyMatrix4(hh);let s=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=s*s,l=new A,f=new A,d=new A,h=new A,m=this.isLineSegments?2:1;if(i.isBufferGeometry){let g=i.index,v=i.attributes.position;if(g!==null){let u=Math.max(0,a.start),p=Math.min(g.count,a.start+a.count);for(let T=u,b=p-1;T<b;T+=m){let S=g.getX(T),C=g.getX(T+1);if(l.fromBufferAttribute(v,S),f.fromBufferAttribute(v,C),Co.distanceSqToSegment(l,f,h,d)>c)continue;h.applyMatrix4(this.matrixWorld);let j=e.ray.origin.distanceTo(h);j<e.near||j>e.far||t.push({distance:j,point:d.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}else{let u=Math.max(0,a.start),p=Math.min(v.count,a.start+a.count);for(let T=u,b=p-1;T<b;T+=m){if(l.fromBufferAttribute(v,T),f.fromBufferAttribute(v,T+1),Co.distanceSqToSegment(l,f,h,d)>c)continue;h.applyMatrix4(this.matrixWorld);let C=e.ray.origin.distanceTo(h);C<e.near||C>e.far||t.push({distance:C,point:d.clone().applyMatrix4(this.matrixWorld),index:T,face:null,faceIndex:null,object:this})}}}else i.isGeometry&&console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){let e=this.geometry;if(e.isBufferGeometry){let t=e.morphAttributes,i=Object.keys(t);if(i.length>0){let n=t[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=n.length;o<a;o++){let s=n[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=o}}}}else{let t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}};Ar.prototype.isLine=!0;var fh=new A,dh=new A,Pi=class extends Ar{constructor(e,t){super(e,t);this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.isBufferGeometry)if(e.index===null){let t=e.attributes.position,i=[];for(let n=0,o=t.count;n<o;n+=2)fh.fromBufferAttribute(t,n),dh.fromBufferAttribute(t,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+fh.distanceTo(dh);e.setAttribute("lineDistance",new Xe(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}};Pi.prototype.isLineSegments=!0;var ph=class extends Pi{constructor(e=10,t=10,i=4473924,n=8947848){i=new ue(i),n=new ue(n);let o=t/2,a=e/t,s=e/2,c=[],l=[];for(let h=0,m=0,g=-s;h<=t;h++,g+=a){c.push(-s,0,g,s,0,g),c.push(g,0,-s,g,0,s);let x=h===o?i:n;x.toArray(l,m),m+=3,x.toArray(l,m),m+=3,x.toArray(l,m),m+=3,x.toArray(l,m),m+=3}let f=new je;f.setAttribute("position",new Xe(c,3)),f.setAttribute("color",new Xe(l,3));let d=new Kt({vertexColors:!0,toneMapped:!1});super(f,d);this.type="GridHelper"}};var mh=class extends Pi{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],n=new je;n.setAttribute("position",new Xe(t,3)),n.setAttribute("color",new Xe(i,3));let o=new Kt({vertexColors:!0,toneMapped:!1});super(n,o);this.type="AxesHelper"}setColors(e,t,i){let n=new ue,o=this.geometry.attributes.color.array;return n.set(e),n.toArray(o,0),n.toArray(o,3),n.set(t),n.toArray(o,6),n.toArray(o,9),n.set(i),n.toArray(o,12),n.toArray(o,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};var Do=class extends je{constructor(){super();this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new this.constructor().copy(this)}toJSON(){let e=super.toJSON(this);return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};Do.prototype.isInstancedBufferGeometry=!0;var gh=new Le,xh=new Le,_n=[],Lr=new ke,Po=class extends ke{constructor(e,t,i){super(e,t);this.instanceMatrix=new Ge(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.frustumCulled=!1}copy(e){return super.copy(e),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let i=this.matrixWorld,n=this.count;if(Lr.geometry=this.geometry,Lr.material=this.material,Lr.material!==void 0)for(let o=0;o<n;o++){this.getMatrixAt(o,gh),xh.multiplyMatrices(i,gh),Lr.matrixWorld=xh,Lr.raycast(e,_n);for(let a=0,s=_n.length;a<s;a++){let c=_n[a];c.instanceId=o,c.object=this,t.push(c)}_n.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ge(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};Po.prototype.isInstancedMesh=!0;var Rr=class{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){let e=1e-6;return this.phi=Math.max(e,Math.min(Math.PI-e,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(st(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mn}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mn);var _h={type:"change"},Fo={type:"start"},Io={type:"end"},vh=class extends lt{constructor(e,t){super();t===void 0&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zt.ROTATE,MIDDLE:zt.DOLLY,RIGHT:zt.PAN},this.touches={ONE:jt.ROTATE,TWO:jt.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",ge),this._domElementKeyEvents=R},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(_h),i.update(),o=n.NONE},this.update=function(){let R=new A,Q=new dt().setFromUnitVectors(e.up,new A(0,1,0)),Ue=Q.clone().invert(),Te=new A,We=new dt,at=2*Math.PI;return function(){let Cr=i.object.position;R.copy(Cr).sub(i.target),R.applyQuaternion(Q),s.setFromVector3(R),i.autoRotate&&o===n.NONE&&N(M()),i.enableDamping?(s.theta+=c.theta*i.dampingFactor,s.phi+=c.phi*i.dampingFactor):(s.theta+=c.theta,s.phi+=c.phi);let _t=i.minAzimuthAngle,vt=i.maxAzimuthAngle;return isFinite(_t)&&isFinite(vt)&&(_t<-Math.PI?_t+=at:_t>Math.PI&&(_t-=at),vt<-Math.PI?vt+=at:vt>Math.PI&&(vt-=at),_t<=vt?s.theta=Math.max(_t,Math.min(vt,s.theta)):s.theta=s.theta>(_t+vt)/2?Math.max(_t,s.theta):Math.min(vt,s.theta)),s.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,s.phi)),s.makeSafe(),s.radius*=l,s.radius=Math.max(i.minDistance,Math.min(i.maxDistance,s.radius)),i.enableDamping===!0?i.target.addScaledVector(f,i.dampingFactor):i.target.add(f),R.setFromSpherical(s),R.applyQuaternion(Ue),Cr.copy(i.target).add(R),i.object.lookAt(i.target),i.enableDamping===!0?(c.theta*=1-i.dampingFactor,c.phi*=1-i.dampingFactor,f.multiplyScalar(1-i.dampingFactor)):(c.set(0,0,0),f.set(0,0,0)),l=1,d||Te.distanceToSquared(i.object.position)>a||8*(1-We.dot(i.object.quaternion))>a?(i.dispatchEvent(_h),Te.copy(i.object.position),We.copy(i.object.quaternion),d=!1,!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",K),i.domElement.removeEventListener("pointerdown",ht),i.domElement.removeEventListener("pointercancel",H),i.domElement.removeEventListener("wheel",me),i.domElement.removeEventListener("pointermove",E),i.domElement.removeEventListener("pointerup",y),i._domElementKeyEvents!==null&&i._domElementKeyEvents.removeEventListener("keydown",ge)};let i=this,n={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},o=n.NONE,a=1e-6,s=new Rr,c=new Rr,l=1,f=new A,d=!1,h=new ce,m=new ce,g=new ce,x=new ce,v=new ce,u=new ce,p=new ce,T=new ce,b=new ce,S=[],C={};function M(){return 2*Math.PI/60/60*i.autoRotateSpeed}function j(){return Math.pow(.95,i.zoomSpeed)}function N(R){c.theta-=R}function O(R){c.phi-=R}let B=function(){let R=new A;return function(Ue,Te){R.setFromMatrixColumn(Te,0),R.multiplyScalar(-Ue),f.add(R)}}(),$=function(){let R=new A;return function(Ue,Te){i.screenSpacePanning===!0?R.setFromMatrixColumn(Te,1):(R.setFromMatrixColumn(Te,0),R.crossVectors(i.object.up,R)),R.multiplyScalar(Ue),f.add(R)}}(),G=function(){let R=new A;return function(Ue,Te){let We=i.domElement;if(i.object.isPerspectiveCamera){let at=i.object.position;R.copy(at).sub(i.target);let ii=R.length();ii*=Math.tan(i.object.fov/2*Math.PI/180),B(2*Ue*ii/We.clientHeight,i.object.matrix),$(2*Te*ii/We.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(B(Ue*(i.object.right-i.object.left)/i.object.zoom/We.clientWidth,i.object.matrix),$(Te*(i.object.top-i.object.bottom)/i.object.zoom/We.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function P(R){i.object.isPerspectiveCamera?l/=R:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom*R)),i.object.updateProjectionMatrix(),d=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function U(R){i.object.isPerspectiveCamera?l*=R:i.object.isOrthographicCamera?(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/R)),i.object.updateProjectionMatrix(),d=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function z(R){h.set(R.clientX,R.clientY)}function W(R){p.set(R.clientX,R.clientY)}function te(R){x.set(R.clientX,R.clientY)}function oe(R){m.set(R.clientX,R.clientY),g.subVectors(m,h).multiplyScalar(i.rotateSpeed);let Q=i.domElement;N(2*Math.PI*g.x/Q.clientHeight),O(2*Math.PI*g.y/Q.clientHeight),h.copy(m),i.update()}function fe(R){T.set(R.clientX,R.clientY),b.subVectors(T,p),b.y>0?P(j()):b.y<0&&U(j()),p.copy(T),i.update()}function ie(R){v.set(R.clientX,R.clientY),u.subVectors(v,x).multiplyScalar(i.panSpeed),G(u.x,u.y),x.copy(v),i.update()}function Ae(){}function k(R){R.deltaY<0?U(j()):R.deltaY>0&&P(j()),i.update()}function q(R){let Q=!1;switch(R.code){case i.keys.UP:G(0,i.keyPanSpeed),Q=!0;break;case i.keys.BOTTOM:G(0,-i.keyPanSpeed),Q=!0;break;case i.keys.LEFT:G(i.keyPanSpeed,0),Q=!0;break;case i.keys.RIGHT:G(-i.keyPanSpeed,0),Q=!0;break}Q&&(R.preventDefault(),i.update())}function J(){if(S.length===1)h.set(S[0].pageX,S[0].pageY);else{let R=.5*(S[0].pageX+S[1].pageX),Q=.5*(S[0].pageY+S[1].pageY);h.set(R,Q)}}function w(){if(S.length===1)x.set(S[0].pageX,S[0].pageY);else{let R=.5*(S[0].pageX+S[1].pageX),Q=.5*(S[0].pageY+S[1].pageY);x.set(R,Q)}}function xe(){let R=S[0].pageX-S[1].pageX,Q=S[0].pageY-S[1].pageY,Ue=Math.sqrt(R*R+Q*Q);p.set(0,Ue)}function ye(){i.enableZoom&&xe(),i.enablePan&&w()}function de(){i.enableZoom&&xe(),i.enableRotate&&J()}function he(R){if(S.length==1)m.set(R.pageX,R.pageY);else{let Ue=Ee(R),Te=.5*(R.pageX+Ue.x),We=.5*(R.pageY+Ue.y);m.set(Te,We)}g.subVectors(m,h).multiplyScalar(i.rotateSpeed);let Q=i.domElement;N(2*Math.PI*g.x/Q.clientHeight),O(2*Math.PI*g.y/Q.clientHeight),h.copy(m)}function Re(R){if(S.length===1)v.set(R.pageX,R.pageY);else{let Q=Ee(R),Ue=.5*(R.pageX+Q.x),Te=.5*(R.pageY+Q.y);v.set(Ue,Te)}u.subVectors(v,x).multiplyScalar(i.panSpeed),G(u.x,u.y),x.copy(v)}function De(R){let Q=Ee(R),Ue=R.pageX-Q.x,Te=R.pageY-Q.y,We=Math.sqrt(Ue*Ue+Te*Te);T.set(0,We),b.set(0,Math.pow(T.y/p.y,i.zoomSpeed)),P(b.y),p.copy(T)}function Ie(R){i.enableZoom&&De(R),i.enablePan&&Re(R)}function tt(R){i.enableZoom&&De(R),i.enableRotate&&he(R)}function mt(){}function ht(R){i.enabled!==!1&&(S.length===0&&(i.domElement.setPointerCapture(R.pointerId),i.domElement.addEventListener("pointermove",E),i.domElement.addEventListener("pointerup",y)),V(R),R.pointerType==="touch"?_e(R):Y(R))}function E(R){i.enabled!==!1&&(R.pointerType==="touch"?ae(R):le(R))}function y(R){i.enabled!==!1&&(R.pointerType==="touch"?L():re(R),ee(R),S.length===0&&(i.domElement.releasePointerCapture(R.pointerId),i.domElement.removeEventListener("pointermove",E),i.domElement.removeEventListener("pointerup",y)))}function H(R){ee(R)}function Y(R){let Q;switch(R.button){case 0:Q=i.mouseButtons.LEFT;break;case 1:Q=i.mouseButtons.MIDDLE;break;case 2:Q=i.mouseButtons.RIGHT;break;default:Q=-1}switch(Q){case zt.DOLLY:if(i.enableZoom===!1)return;W(R),o=n.DOLLY;break;case zt.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enablePan===!1)return;te(R),o=n.PAN}else{if(i.enableRotate===!1)return;z(R),o=n.ROTATE}break;case zt.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(i.enableRotate===!1)return;z(R),o=n.ROTATE}else{if(i.enablePan===!1)return;te(R),o=n.PAN}break;default:o=n.NONE}o!==n.NONE&&i.dispatchEvent(Fo)}function le(R){if(i.enabled!==!1)switch(o){case n.ROTATE:if(i.enableRotate===!1)return;oe(R);break;case n.DOLLY:if(i.enableZoom===!1)return;fe(R);break;case n.PAN:if(i.enablePan===!1)return;ie(R);break}}function re(R){Ae(R),i.dispatchEvent(Io),o=n.NONE}function me(R){i.enabled===!1||i.enableZoom===!1||o!==n.NONE&&o!==n.ROTATE||(R.preventDefault(),i.dispatchEvent(Fo),k(R),i.dispatchEvent(Io))}function ge(R){i.enabled===!1||i.enablePan===!1||q(R)}function _e(R){switch(ne(R),S.length){case 1:switch(i.touches.ONE){case jt.ROTATE:if(i.enableRotate===!1)return;J(),o=n.TOUCH_ROTATE;break;case jt.PAN:if(i.enablePan===!1)return;w(),o=n.TOUCH_PAN;break;default:o=n.NONE}break;case 2:switch(i.touches.TWO){case jt.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;ye(),o=n.TOUCH_DOLLY_PAN;break;case jt.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;de(),o=n.TOUCH_DOLLY_ROTATE;break;default:o=n.NONE}break;default:o=n.NONE}o!==n.NONE&&i.dispatchEvent(Fo)}function ae(R){switch(ne(R),o){case n.TOUCH_ROTATE:if(i.enableRotate===!1)return;he(R),i.update();break;case n.TOUCH_PAN:if(i.enablePan===!1)return;Re(R),i.update();break;case n.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;Ie(R),i.update();break;case n.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;tt(R),i.update();break;default:o=n.NONE}}function L(R){mt(R),i.dispatchEvent(Io),o=n.NONE}function K(R){i.enabled!==!1&&R.preventDefault()}function V(R){S.push(R)}function ee(R){delete C[R.pointerId];for(let Q=0;Q<S.length;Q++)if(S[Q].pointerId==R.pointerId){S.splice(Q,1);return}}function ne(R){let Q=C[R.pointerId];Q===void 0&&(Q=new ce,C[R.pointerId]=Q),Q.set(R.pageX,R.pageY)}function Ee(R){let Q=R.pointerId===S[0].pointerId?S[1]:S[0];return C[Q.pointerId]}i.domElement.addEventListener("contextmenu",K),i.domElement.addEventListener("pointerdown",ht),i.domElement.addEventListener("pointercancel",H),i.domElement.addEventListener("wheel",me,{passive:!1}),this.update()}},ld=class extends vh{constructor(e,t){super(e,t);this.screenSpacePanning=!1,this.mouseButtons.LEFT=zt.PAN,this.mouseButtons.RIGHT=zt.ROTATE,this.touches.ONE=jt.PAN,this.touches.TWO=jt.DOLLY_ROTATE}};var cd=class{parse(e,t={}){let i=t.binary!==void 0?t.binary:!1,n=[],o=0;e.traverse(function(u){if(u.isMesh){let p=u.geometry;if(p.isBufferGeometry!==!0)throw new Error("THREE.STLExporter: Geometry is not of type THREE.BufferGeometry.");let T=p.index,b=p.getAttribute("position");o+=T!==null?T.count/3:b.count/3,n.push({object3d:u,geometry:p})}});let a,s=80;if(i===!0){let u=o*2+o*3*4*4+80+4,p=new ArrayBuffer(u);a=new DataView(p),a.setUint32(s,o,!0),s+=4}else a="",a+=`solid exported
`;let c=new A,l=new A,f=new A,d=new A,h=new A,m=new A;for(let u=0,p=n.length;u<p;u++){let T=n[u].object3d,b=n[u].geometry,S=b.index,C=b.getAttribute("position");if(S!==null)for(let M=0;M<S.count;M+=3){let j=S.getX(M+0),N=S.getX(M+1),O=S.getX(M+2);g(j,N,O,C,T)}else for(let M=0;M<C.count;M+=3){let j=M+0,N=M+1,O=M+2;g(j,N,O,C,T)}}return i===!1&&(a+=`endsolid exported
`),a;function g(u,p,T,b,S){c.fromBufferAttribute(b,u),l.fromBufferAttribute(b,p),f.fromBufferAttribute(b,T),S.isSkinnedMesh===!0&&(S.boneTransform(u,c),S.boneTransform(p,l),S.boneTransform(T,f)),c.applyMatrix4(S.matrixWorld),l.applyMatrix4(S.matrixWorld),f.applyMatrix4(S.matrixWorld),x(c,l,f),v(c),v(l),v(f),i===!0?(a.setUint16(s,0,!0),s+=2):(a+=`		endloop
`,a+=`	endfacet
`)}function x(u,p,T){d.subVectors(T,p),h.subVectors(u,p),d.cross(h).normalize(),m.copy(d).normalize(),i===!0?(a.setFloat32(s,m.x,!0),s+=4,a.setFloat32(s,m.y,!0),s+=4,a.setFloat32(s,m.z,!0),s+=4):(a+="	facet normal "+m.x+" "+m.y+" "+m.z+`
`,a+=`		outer loop
`)}function v(u){i===!0?(a.setFloat32(s,u.x,!0),s+=4,a.setFloat32(s,u.y,!0),s+=4,a.setFloat32(s,u.z,!0),s+=4):a+="			vertex "+u.x+" "+u.y+" "+u.z+`
`}}};var ud=class{constructor(e,t=512,i=512){this.colorMatrixLeft=new Ve().fromArray([.4561,-.0400822,-.0152161,.500484,-.0378246,-.0205971,.176381,-.0157589,-.00546856]),this.colorMatrixRight=new Ve().fromArray([-.0434706,.378476,-.0721527,-.0879388,.73364,-.112961,-.00155529,-.0184503,1.2264]);let n=new Rt(-1,1,1,-1,0,1),o=new fi,a=new Xt,s={minFilter:Ke,magFilter:Oe,format:qe},c=new Ye(t,i,s),l=new Ye(t,i,s),f=new ct({uniforms:{mapLeft:{value:c.texture},mapRight:{value:l.texture},colorMatrixLeft:{value:this.colorMatrixLeft},colorMatrixRight:{value:this.colorMatrixRight}},vertexShader:["varying vec2 vUv;","void main() {","	vUv = vec2( uv.x, uv.y );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join(`
`),fragmentShader:["uniform sampler2D mapLeft;","uniform sampler2D mapRight;","varying vec2 vUv;","uniform mat3 colorMatrixLeft;","uniform mat3 colorMatrixRight;","float lin( float c ) {","	return c <= 0.04045 ? c * 0.0773993808 :","			pow( c * 0.9478672986 + 0.0521327014, 2.4 );","}","vec4 lin( vec4 c ) {","	return vec4( lin( c.r ), lin( c.g ), lin( c.b ), c.a );","}","float dev( float c ) {","	return c <= 0.0031308 ? c * 12.92","			: pow( c, 0.41666 ) * 1.055 - 0.055;","}","void main() {","	vec2 uv = vUv;","	vec4 colorL = lin( texture2D( mapLeft, uv ) );","	vec4 colorR = lin( texture2D( mapRight, uv ) );","	vec3 color = clamp(","			colorMatrixLeft * colorL.rgb +","			colorMatrixRight * colorR.rgb, 0., 1. );","	gl_FragColor = vec4(","			dev( color.r ), dev( color.g ), dev( color.b ),","			max( colorL.a, colorR.a ) );","}"].join(`
`)}),d=new ke(new Ct(2,2),f);o.add(d),this.setSize=function(h,m){e.setSize(h,m);let g=e.getPixelRatio();c.setSize(h*g,m*g),l.setSize(h*g,m*g)},this.render=function(h,m){let g=e.getRenderTarget();h.updateMatrixWorld(),m.parent===null&&m.updateMatrixWorld(),a.update(m),e.setRenderTarget(c),e.clear(),e.render(h,a.cameraL),e.setRenderTarget(l),e.clear(),e.render(h,a.cameraR),e.setRenderTarget(null),e.render(o,n),e.setRenderTarget(g)},this.dispose=function(){c&&c.dispose(),l&&l.dispose(),d&&d.geometry.dispose(),f&&f.dispose()}}};var hd=class{constructor(e){let t=new Xt;t.aspect=.5;let i=new ce;this.setEyeSeparation=function(n){t.eyeSep=n},this.setSize=function(n,o){e.setSize(n,o)},this.render=function(n,o){n.updateMatrixWorld(),o.parent===null&&o.updateMatrixWorld(),t.update(o),e.getSize(i),e.autoClear&&e.clear(),e.setScissorTest(!0),e.setScissor(0,0,i.width/2,i.height),e.setViewport(0,0,i.width/2,i.height),e.render(n,t.cameraL),e.setScissor(i.width/2,0,i.width/2,i.height),e.setViewport(i.width/2,0,i.width/2,i.height),e.render(n,t.cameraR),e.setScissorTest(!1)}}};var fd=class{constructor(e){let t=new Rt(-1,1,1,-1,0,1),i=new fi,n=new Xt,o={minFilter:Ke,magFilter:Oe,format:qe},a=new Ye(512,512,o),s=new Ye(512,512,o),c=new ct({uniforms:{mapLeft:{value:a.texture},mapRight:{value:s.texture}},vertexShader:["varying vec2 vUv;","void main() {","	vUv = vec2( uv.x, uv.y );","	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join(`
`),fragmentShader:["uniform sampler2D mapLeft;","uniform sampler2D mapRight;","varying vec2 vUv;","void main() {","	vec2 uv = vUv;","	if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {","		gl_FragColor = texture2D( mapLeft, uv );","	} else {","		gl_FragColor = texture2D( mapRight, uv );","	}","}"].join(`
`)}),l=new ke(new Ct(2,2),c);i.add(l),this.setSize=function(f,d){e.setSize(f,d);let h=e.getPixelRatio();a.setSize(f*h,d*h),s.setSize(f*h,d*h)},this.render=function(f,d){f.updateMatrixWorld(),d.parent===null&&d.updateMatrixWorld(),n.update(d),e.setRenderTarget(a),e.clear(),e.render(f,n.cameraL),e.setRenderTarget(s),e.clear(),e.render(f,n.cameraR),e.setRenderTarget(null),e.render(i,t)}}};export{da as ACESFilmicToneMapping,oi as AddEquation,ca as AddOperation,Cd as AdditiveAnimationBlendMode,Sn as AdditiveBlending,Sa as AlphaFormat,ia as AlwaysDepth,fs as AlwaysStencilFunc,ud as AnaglyphEffect,mh as AxesHelper,Ne as BackSide,cs as BasicDepthPacking,pd as BasicShadowMap,Ge as BufferAttribute,je as BufferGeometry,ga as ByteType,fa as CineonToneMapping,Qe as ClampToEdgeWrapping,ue as Color,ai as CubeReflectionMapping,Ei as CubeRefractionMapping,si as CubeUVReflectionMapping,lr as CubeUVRefractionMapping,yn as CullFaceBack,zo as CullFaceFront,dd as CullFaceFrontBack,Oo as CullFaceNone,ko as CustomBlending,pa as CustomToneMapping,Bd as DecrementStencilOp,Od as DecrementWrapStencilOp,fr as DepthFormat,dr as DepthStencilFormat,io as DirectionalLight,Et as DoubleSide,Ko as DstAlphaFactor,Qo as DstColorFactor,ep as DynamicCopyUsage,qd as DynamicDrawUsage,Jd as DynamicReadUsage,na as EqualDepth,kd as EqualStencilFunc,ar as EquirectangularReflectionMapping,sr as EquirectangularRefractionMapping,Vo as FlatShading,Cs as Float16BufferAttribute,Xe as Float32BufferAttribute,Gh as Float64BufferAttribute,Nt as FloatType,Vt as FrontSide,ip as GLSL1,jn as GLSL3,mr as GammaEncoding,aa as GreaterDepth,oa as GreaterEqualDepth,Yd as GreaterEqualStencilFunc,Wd as GreaterStencilFunc,ph as GridHelper,kt as HalfFloatType,Zn as HemisphereLight,Ud as IncrementStencilOp,Gd as IncrementWrapStencilOp,Do as InstancedBufferGeometry,Po as InstancedMesh,Uh as Int16BufferAttribute,Bh as Int32BufferAttribute,Fh as Int8BufferAttribute,_a as IntType,bd as InterpolateDiscrete,Ed as InterpolateLinear,Td as InterpolateSmooth,zd as InvertStencilOp,Or as KeepStencilOp,ra as LessDepth,or as LessEqualDepth,Hd as LessEqualStencilFunc,Vd as LessStencilFunc,Ar as Line,Kt as LineBasicMaterial,Pi as LineSegments,$e as LinearEncoding,Ke as LinearFilter,vd as LinearMipMapLinearFilter,_d as LinearMipMapNearestFilter,li as LinearMipmapLinearFilter,ma as LinearMipmapNearestFilter,ua as LinearToneMapping,ls as LogLuvEncoding,Md as LoopOnce,Sd as LoopPingPong,yd as LoopRepeat,Ea as LuminanceAlphaFormat,ba as LuminanceFormat,zt as MOUSE,ld as MapControls,Le as Matrix4,wn as MaxEquation,ke as Mesh,no as MeshPhongMaterial,Tn as MinEquation,ur as MirroredRepeatWrapping,la as MixOperation,En as MultiplyBlending,Fi as MultiplyOperation,Oe as NearestFilter,xd as NearestMipMapLinearFilter,gd as NearestMipMapNearestFilter,Rn as NearestMipmapLinearFilter,Ln as NearestMipmapNearestFilter,ta as NeverDepth,jd as NeverStencilFunc,Mt as NoBlending,Tt as NoToneMapping,Rd as NormalAnimationBlendMode,bi as NormalBlending,sa as NotEqualDepth,Xd as NotEqualStencilFunc,Fe as Object3D,hs as ObjectSpaceNormalMap,Yo as OneFactor,Jo as OneMinusDstAlphaFactor,$o as OneMinusDstColorFactor,Ir as OneMinusSrcAlphaFactor,Zo as OneMinusSrcColorFactor,vh as OrbitControls,Pr as PCFShadowMap,jo as PCFSoftShadowMap,fd as ParallaxBarrierEffect,Ze as PerspectiveCamera,Ct as PlaneBufferGeometry,Ct as PlaneGeometry,Mn as REVISION,us as RGBADepthPacking,qe as RGBAFormat,Da as RGBAIntegerFormat,Ha as RGBA_ASTC_10x10_Format,ja as RGBA_ASTC_10x5_Format,Va as RGBA_ASTC_10x6_Format,ka as RGBA_ASTC_10x8_Format,Wa as RGBA_ASTC_12x10_Format,Xa as RGBA_ASTC_12x12_Format,Fa as RGBA_ASTC_4x4_Format,Ia as RGBA_ASTC_5x4_Format,Na as RGBA_ASTC_5x5_Format,Ua as RGBA_ASTC_6x5_Format,Ba as RGBA_ASTC_6x6_Format,Ga as RGBA_ASTC_8x5_Format,Oa as RGBA_ASTC_8x6_Format,za as RGBA_ASTC_8x8_Format,Ya as RGBA_BPTC_Format,On as RGBA_ETC2_EAC_Format,Bn as RGBA_PVRTC_2BPPV1_Format,Un as RGBA_PVRTC_4BPPV1_Format,Dn as RGBA_S3TC_DXT1_Format,Pn as RGBA_S3TC_DXT3_Format,Fn as RGBA_S3TC_DXT5_Format,Br as RGBDEncoding,gr as RGBEEncoding,Ta as RGBEFormat,ci as RGBFormat,Ca as RGBIntegerFormat,Ur as RGBM16Encoding,Nr as RGBM7Encoding,Pa as RGB_ETC1_Format,Gn as RGB_ETC2_Format,Nn as RGB_PVRTC_2BPPV1_Format,In as RGB_PVRTC_4BPPV1_Format,Cn as RGB_S3TC_DXT1_Format,La as RGFormat,Ra as RGIntegerFormat,wa as RedFormat,Aa as RedIntegerFormat,ha as ReinhardToneMapping,cr as RepeatWrapping,Nd as ReplaceStencilOp,Wo as ReverseSubtractEquation,os as SRGB8_ALPHA8_ASTC_10x10_Format,is as SRGB8_ALPHA8_ASTC_10x5_Format,rs as SRGB8_ALPHA8_ASTC_10x6_Format,ns as SRGB8_ALPHA8_ASTC_10x8_Format,as as SRGB8_ALPHA8_ASTC_12x10_Format,ss as SRGB8_ALPHA8_ASTC_12x12_Format,qa as SRGB8_ALPHA8_ASTC_4x4_Format,Za as SRGB8_ALPHA8_ASTC_5x4_Format,Ka as SRGB8_ALPHA8_ASTC_5x5_Format,Ja as SRGB8_ALPHA8_ASTC_6x5_Format,Qa as SRGB8_ALPHA8_ASTC_6x6_Format,$a as SRGB8_ALPHA8_ASTC_8x5_Format,es as SRGB8_ALPHA8_ASTC_8x6_Format,ts as SRGB8_ALPHA8_ASTC_8x8_Format,cd as STLExporter,fi as Scene,xa as ShortType,md as SmoothShading,Fr as SrcAlphaFactor,ea as SrcAlphaSaturateFactor,qo as SrcColorFactor,$d as StaticCopyUsage,zn as StaticDrawUsage,Kd as StaticReadUsage,Xt as StereoCamera,hd as StereoEffect,tp as StreamCopyUsage,Zd as StreamDrawUsage,Qd as StreamReadUsage,Ho as SubtractEquation,bn as SubtractiveBlending,jt as TOUCH,Gr as TangentSpaceNormalMap,Fd as TriangleFanDrawMode,Pd as TriangleStripDrawMode,Dd as TrianglesDrawMode,An as UVMapping,Mr as Uint16BufferAttribute,yr as Uint32BufferAttribute,Ih as Uint8BufferAttribute,Nh as Uint8ClampedBufferAttribute,It as UnsignedByteType,Ni as UnsignedInt248Type,Ii as UnsignedIntType,va as UnsignedShort4444Type,Ma as UnsignedShort5551Type,ya as UnsignedShort565Type,hr as UnsignedShortType,Si as VSMShadowMap,A as Vector3,sd as WebGLRenderer,Ld as WrapAroundEnding,wd as ZeroCurvatureEnding,Xo as ZeroFactor,Ad as ZeroSlopeEnding,Id as ZeroStencilOp,pr as sRGBEncoding};
