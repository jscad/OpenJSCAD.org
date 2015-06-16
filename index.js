var version = '0.023 (2015/02/14)';
//$(function() { $("#parametersdiv").draggable(); }); // doesn't work well, disabled
var me = document.location.toString().match(/^file:/)?'web-offline':'web-online'; // me: {cli, web-offline, web-online}
var browser = 'unknown';
if(navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)/i))
   browser = RegExp.$1.toLowerCase();

$(document).ready(function() {
   $("#menu").height($(window).height());       // initial height

   $(window).resize(function() {                // adjust the relevant divs
      $("#menu").height($(window).height());
      $("#menuHandle").css({top: '45%'});
   });
   setTimeout( function(){$('#menu').css('left','-280px');},3000); // -- hide slide-menu after 3secs

   $('#menu').mouseleave(function() {
      $('#examples').css('height',0); $('#examples').hide(); 
      $('#options').css('height',0); $('#options').hide(); 
   });

   // -- Examples
   $('#examplesTitle').click(function() {
      $('#examples').css('height','auto'); 
      $('#examples').show(); 
      $('#options').css('height',0); $('#options').hide(); 
   });
   $('#examples').mouseleave(function() {
      $('#examples').css('height',0); $('#examples').hide(); 
   });

   // -- Options 
   // $('#optionsTitle').click(function() {
   //    $('#options').css('height','auto'); $('#options').show(); 
   //    $('#examples').css('height',0); $('#examples').hide(); 
   // });
   // $('#options').mouseleave(function() {
   //    $('#options').css('height',0); $('#options').hide(); 
   // });
   // getOptions();

   // //$('#optionsForm').submit(function() {
   // //   // save to cookie
   // //   $('#optionsForm').hide();
   // //   return false;
   // //});
   // $('#optionsForm').change(function() {
   //    // save to cookie
   //    saveOptions();
   // });
   
   $('#plate').change(function() {
      if($('#plate').val()=='custom') {
         $('#customPlate').show();
      } else {
         $('#customPlate').hide();
      }
   });
});


// ---------------------------------------------------------------------------------------------------------
// Examples

$(document).ready(function() {
  var ex = [
  { file:'logo.jscad', title: 'OpenJSCAD.org Logo' },
  { file:'logo.amf', title: 'OpenJSCAD.org Logo', type: 'AMF', new: true },

  { file:'example001.jscad', title: 'Sphere with cutouts', spacing: true },
  { file:'example001.scad', title: 'Sphere with cutouts', type: 'OpenSCAD' },
  { file:'example002.jscad', title: 'Cone with cutouts' },
  { file:'example002.scad', title: 'Cone with cutouts', type: 'OpenSCAD' },
  { file:'example003.jscad', title: 'Cube with cutouts' },
  { file:'example003.scad', title: 'Cube with cutouts', type: 'OpenSCAD' },
  // { file:'example004.jscad', title: 'Cube minus sphere' },
  { file:'example005.jscad', title: 'Pavillon' },
  // { file:'center.jscad', title: 'Centers of Primitives' },

  // { file:'bunch-cubes.jscad', title: 'Bunch of Cubes', new: true }, 
  { file:'lookup.jscad', title: 'Lookup()', spacing: true },
  { file:'expand.jscad', title: 'Expand()' },
  { file:'rectangular_extrude.jscad', title: 'Rectangular_extrude()' },
  { file:'linear_extrude.jscad', title: 'Linear_extrude()' },
  { file:'rotate_extrude.jscad', title: 'Rotate_extrude()' },
  { file:'polyhedron.jscad', title: 'Polyhedron()' },
  { file:'hull.jscad', title: 'Hull()', new: true },
  { file:'chain_hull.jscad', title: 'Chain_hull()', new: true },
  { file:'torus.jscad', title: 'Torus()' },

  { file:'text.jscad', title: 'Vector_text()', new: true, spacing: true },

  { file:'transparency.jscad', title: 'Transparency', new: true, spacing: true },
  { file:'transparency.amf', title: 'Transparency', type: 'AMF', new: true },
  { file:'transparency2.jscad', title: 'Transparency 2', new: true },

  { file:'slices/double-screw.jscad', title: 'SolidFromSlices(): Double Screw', new: true, spacing: true },
  { file:'slices/four2three.jscad', title: 'SolidFromSlices(): 4 to 3', new: true },
  { file:'slices/four2three-round.jscad', title: 'SolidFromSlices(): 4 to 3 round', new: true },
  { file:'slices/spring.jscad', title: 'SolidFromSlices(): Spring', new: true },
  { file:'slices/tor.jscad', title: 'SolidFromSlices(): Tor (multi-color)', new: true },
  { file:'slices/rose.jscad', title: 'SolidFromSlices(): Rose Curve', new: true },

  { file:'servo.jscad', title: 'Interactive Params: Servo Motor', wrap: true },
  { file:'gear.jscad', title: 'Interactive Params: Gear' },
  { file:'s-hook.jscad', title: 'Interactive Params: S Hook' },
  { file:'grille.jscad', title: 'Interactive Params: Grille' },
  { file:'axis-coupler.jscad', title: 'Interactive Params: Axis Coupler' },
  { file:'lamp-shade.jscad', title: 'Interactive Params: Lamp Shade' },
  { file:'celtic-knot-ring.jscad', title: 'Interactive Params: Celtic Knot Ring' },
  { file:'stepper-motor.jscad', title: 'Interactive Params: Stepper Motor' },
  { file:'iphone4-case.jscad', title: 'Interactive Params: iPhone4 Case' },
  { file:'name_plate.jscad', title: 'Interactive Params: Name Plate', new: true },
  { file:'globe.jscad', title: 'Globe', new: true },

  { file:'platonics/', title: 'Recursive Include(): Platonics', new: true, spacing: true },

  { file:'3d_sculpture-VernonBussler.stl', title: '3D Model: 3D Sculpture (Vernon Bussler)', type: 'STL', spacing: true },
  { file:'frog-OwenCollins.stl', title: '3D Model: Frog (Owen Collins)', type: 'STL' },  
  { file:'thing_7-Zomboe.stl', title: '3D Model: Thing 7 / Flower (Zomboe)', type: 'STL' },  
  // { file:'organic_flower-Bogoboy23.stl', title: '3D Model: Organic Flower (Bogoboy23)', type: 'STL' }, // all wrong normals!!
  { file:'yoda-RichRap.stl', title: '3D Model: Yoda (RichRap)', type: 'STL' },
  // { url:'http://pastebin.com/raw.php?i=wJLctyAQ', title: 'OpenJSCAD.org Logo', type:'Remote JSCAD' }
  // { file:'treefrog-Jerrill.stl', title: '3D Model: Treefrog (Jerrill)', type: 'STL' },    // nice frog, yet slow 
  // { file:'klein_bottle-DizingOf.stl', title: '3D Model: Klein Bottle (DizingOf)', type: 'STL' } // too slow, over 400k triangles, huge memory consumption
  ];
  if(me=='web-online') {
     var wrap = 26;
     var colp = 100/Math.floor(ex.length/wrap+1)+"%";
     var src = '<table width=100%><tr><td widthx="+colp+" valign=top>';
     //src += "<img id=examplesHandle src=\"imgs/menuHandleHU.png\">";
     //src += '<b>Examples:</b>';
     for(var i=0; i<ex.length; i++) {
        if(ex[i].wrap) {
           src += "</td><td class=examplesSeparator widthx="+colp+" valign=top>";
        }
        if(ex[i].spacing) src += "<p/>";
        src += "<li><a href=# onclick='fetchExample(\"examples/"+ex[i].file+"\"); return false;'>"+ex[i].title+"</a>\n";
        if(ex[i].type) src += " <span class=type>("+ex[i].type+")</span></a>";
        if(ex[i].new) src += " <span class=newExample>new</span></a>";
        //src += "<li><a href='examples/"+ex[i].file+"\'>"+ex[i].title+"</a>\n";
     }
     src += "</td></tr></table>";
     $('#examples').html(src);
  } else {
     // examples off-line won't work yet as XHR is used
     $('#examples').html("You are offline, drag'n'drop the examples from your installation");
  }
});


// ---------------------------------------------------------------------------------------------------------
// Options form (currently disabled)

/*
{
   var options = [ 'renderCode', 'author', 'license' ];
   var metakeys = [ 'author', 'license' ];
   saveOptions = function() {
      for(var k in options) {
         k = options[k];
         //echo("setting "+k);
         setCookie(k,$('#'+k).val());
         if(metakeys[k]) metadata[k] = options[k];
      }
   }
   getOptions = function() {
      for(var k in options) {
         k = options[k];
         //echo("getting "+k);
         if(getCookie(k)) $('#'+k).val(getCookie(k))
      }
   }
   
   var src = '';
   src += "<form id=optionsForm onsubmit='saveOptions(); return false'>";
   src += "<div class=optionGroup><b>Your Identity / Full Name & Email</b><br/>";
   src += "<input id=author type=text name=author size=30><div class=optionInfo>Applies when you export AMF (sets metadata)</div></div>";

   var licenseOptions = {
      "Public Domain": "Public Domain", 
      "CC BY": "Creative Commons CC BY", 
      "CC BY-ND": "Creative Commons CC BY-ND", 
      "CC BY-NC": "Creative Commons CC BY-NC", 
      "CC BY-SA": "Creative Commons CC BY-SA", 
      "CC BY-NC-SA": "Creative Commons CC BY-NC-SA", 
      "CC BY-NC-ND": "Creative Commons CC BY-NC-ND", 
      "MIT": "MIT License", 
      "GPLv2": "GPLv2", 
      "GPLv3": "GPLv3", 
      "Copyright": "Copyright",
   };
   src += "<div class=optionGroup><b>Default License</b><br/>";
   src += "<select id=license name=license>";
   for(var k in licenseOptions) {
      src += "<option value='"+k+"'>"+licenseOptions[k];
      src += "<br/>";
   }
   src += "</select><div class=optionInfo>Applies when you export AMF (sets metadata)</div></div>\n";

   if(0) {
      var renderCodeOptions = {
         shiftReturn: "SHIFT+RETURN", 
         auto: "Automatic"
      };
      src += "<div class=optionGroup><b>Render Code</b></br>";
      src += "<select id=renderCode name=renderCode>";
      for(var k in renderCodeOptions) {
         src += "<option value='"+k+"'>"+renderCodeOptions[k];
      }
      src += "</select></div>";
   }
   if(1) {
      var plateOptions = {
         "200x200": "200mm x 200mm",
         "150x150": "150mm x 150mm",
         "100x100": "100mm x 100mm",
         "custom": "Custom",
         "none": "None",
      };
      src += "<div class=optionGroup><b>Plate</b></br>";
      src += "<select id=plate name=plate>";
      for(var k in plateOptions) {
         src += "<option value='"+k+"'>"+plateOptions[k];
      }
      src += "</select><br/>";
      src += "<div style='display: none' id=customPlate>Custom: <input type=text id=plateCustomX name=plateCustomX size=4 value='125'> x <input type=text id=plateCustomY name=plateCustomY size=4 value='125'> [mm]</div>";
      src += "</div>";
      
   }
   if(1) {
      var themeOptions = {
         "bright": "Bright",
         "dark": "Dark",
      };
      src += "<div class=optionGroup><b>Theme</b></br>";
      src += "<select id=theme name=theme>";
      for(var k in themeOptions) {
         src += "<option value='"+k+"'>"+themeOptions[k];
      }
      src += "</select><br/>";
      src += "</div>";
   }
   
   src += "</form>";
   $('#options').html(src);
}

// ---------------------------------------------------------------------------------------------------------

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function deleteCookie(name) {
    createCookie(name, "", -1);
}
*/