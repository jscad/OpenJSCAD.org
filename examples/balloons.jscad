// title      : Balloons
// author     : Z3 Dev
// license    : MIT License
// description: multiple balloons, testing new parameters
// file       : balloons.jscad

function getParameterDefinitions() { 
  return [ 
    { name: 'balloon', type: 'group', caption: 'Balloons' }, 
    { name: 'checkbox', type: 'checkbox', checked: true, initial: '20', caption: 'Big?' }, 
    { name: 'color', type: 'color', initial: '#FFB431', caption: 'Color?' }, 
    { name: 'count', type: 'slider', initial: 3, min: 2, max: 10, step: 1, caption: 'How many?' }, 
    { name: 'friend', type: 'group', caption: 'Friend' }, 
    { name: 'name', type: 'text', initial: '', size: 20, maxLength: 20, caption: 'Name?', placeholder: '20 characters' }, 
    { name: 'date',  type: 'date', initial: '', min: '1915-01-01', max: '2015-12-31', caption: 'Birthday?', placeholder: 'YYYY-MM-DD' }, 
    { name: 'age', type: 'int', initial: 20, min: 1, max: 100, step: 1, caption: 'Age?' }, 
    ]; 
} 

// Example of all interactive parameters
// By Z3 Development 2015.10.13

function text(m,h,w) {
// render the text
    var o = [];  // list of 3D objects
    var l = vector_text(0,0,m);  // line segments for each character
    l.forEach(function(s) {                // process the line segments
            o.push(rectangular_extrude(s,{w: w,h: h}));
        }
    );
// center the message
    m = union(o);
    var b = m.getBounds();
    var x = 0 - b[0].x - ((b[1].x - b[0].x)/2);
    var y = 0 - b[0].y - ((b[1].y - b[0].y)/2);
    var z = 0 - b[0].z - ((b[1].z - b[0].z)/2);
    return m.translate([x,y,z]);
}

function balloons(p) {
// balloon, centered, colored, embossed
    var b = CSG.sphere( {center: [0,0,0], radius: p.b_radius, resolution: p.resolution} );
    var t = text(p.age.toString(),2,2).rotateX(90);
    var x = t.getBounds();
    x = Math.max(Math.abs(x[0].x),Math.abs(x[0].z));
    var y = p.b_radius;
    var z = (p.b_radius*0.70)/x;
    t = t.scale([z,y,z]);
    b = b.subtract(t);
    if ('b_color' in p) {
      b = b.setColor(p.b_color);
    }

    var i = 0;
    var o = [];
    var sa = 360 * Math.random(); // starting angle
    var a = 360 / p.count;
    for (i = 0; i < p.count; i++) {
        var angle = Math.floor(sa + (a*i)) % 360;
    // balloon
        var x = Math.cos(angle*Math.PI/180) * p.b_radius;
        var y = Math.sin(angle*Math.PI/180) * p.b_radius;
        var z = p.b_radius * 4 + (50 * Math.random());
        var b1 = b.translate([x,y,z]);
    // rope
        z = z - p.b_radius + 2;
        var r = CSG.cylinder({start: [0,0,0], end: [x,y,z], radius: 0.5, resolution: 12});
        r = r.setColor([0,0,0]);
        
        b1 = b1.union(r);
        o.push(b1)
    }
    return union(o);
}

function salutation(p) {
// create a message
    var m = "Happy Birthday";
    if(p.name.length > 0) {
        m = m + ", " + p.name;
    }
    m = m + "!";
    return text(m,2,2).scale(0.5);
}

function main( p ) {
    p.resolution = 32;
// use the checkbox to determine the size of the sphere
    p.b_radius = 10;
    if(p.checkbox !== false) {
        p.b_radius = parseInt(p.checkbox);
    }
// use the color chooser to determine the color of the sphere
    if(p.color.length == 7) {
      var r = parseInt('0x'+p.color.slice(1,3))/255;
      var g = parseInt('0x'+p.color.slice(3,5))/255;
      var b = parseInt('0x'+p.color.slice(5,7))/255;
      p.b_color = [r,g,b];
    }
// create balloons
    var a = balloons(p);
// create a message
    var s = salutation(p).translate([0,-10,0]);
    if (p.date.length > 0) {
      var d = text(p.date,2,2).scale(0.5).translate([0,-25,0]);
      s = s.union(d);
    }

    return a.union([s]);
}

