// index.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// Purpose:
//   Page Specific Functionality: index.html
//
// History:
//   2016/06/27: 0.5.1: enhanced STL import, adding support for MM colors by Z3 Dev
//                      added local storage by AA
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// --- Dependencies
// none

// --- Global Variables

// --- Global Functions

var me = document.location.toString().match(/^file:/)?'web-offline':'web-online'; // me: {cli, web-offline, web-online}

var browser = 'unknown';
if(navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)/i))
  browser = RegExp.$1.toLowerCase();

var showEditor = true;
var remoteUrl = './remote.pl?url=';
//var remoteUrl = './remote.php?url=';

//console.log('me: ['+me+']');
//console.log('browser: ['+browser+']');

$(document).ready(function() {
    createExamples();
    createOptions();

    $("#menu").height($(window).height());       // initial height

    $('#editFrame').height($(window).height());
    $(window).resize(function() {                // adjust the relevant divs
        $("#menu").height($(window).height());
        $("#menuHandle").css({top: '45%'});
        $("#editFrame").height($(window).height());
      });
    setTimeout( function(){$('#menu').css('left','-280px');},3000); // -- hide slide-menu after 3secs

    $('#menu').mouseleave(function() {
        $('#examples').css('height',0); $('#examples').hide();
        $('#options').css('height',0); $('#options').hide();
      });

    $("#editHandle").click(function() {
        if ($("#editFrame").width() == 0) {
          $("#editFrame").css("width",'40%');
          $("#editHandle").attr('src',"imgs/editHandleIn.png");
        } else {
          $("#editFrame").css("width",'0px');
          $("#editHandle").attr('src',"imgs/editHandleOut.png");
        }
      });

  // -- Examples
    $('#examplesTitle').click(function() {
        $('#examples').css('height','auto');
        $('#examples').show();
        $('#options').css('height',0);
        $('#options').hide();
      });
    $('#examples').mouseleave(function() {
        $('#examples').css('height',0);
        $('#examples').hide();
      });

  // -- Options
    $('#optionsTitle').click(function() {
        $('#options').css('height','auto');
        $('#options').show();
        $('#examples').css('height',0);
        $('#examples').hide();
      });
    $('#options').mouseleave(function() {
        $('#options').css('height',0);
        $('#options').hide();
      });
    getOptions();

    //$('#optionsForm').submit(function() {
    //   // save to cookie
    //   $('#optionsForm').hide();
    //   return false;
    //});
    $('#optionsForm').change(function() {
      // save to cookie
        saveOptions();
      });

    $('#plate').change(function() {
        if($('#plate').val()=='custom') {
          $('#customPlate').show();
        } else {
          $('#customPlate').hide();
        }
      });
  });

var ex = [
  { file:'logo.jscad', title: 'OpenJSCAD.org Logo' },
  { file:'logo.amf', title: 'OpenJSCAD.org Logo', type: 'AMF' },

  { file:'example001.jscad', title: 'Sphere with cutouts', spacing: true },
  { file:'example001.scad', title: 'Sphere with cutouts', type: 'OpenSCAD' },
  { file:'example002.jscad', title: 'Cone with cutouts' },
  { file:'example002.scad', title: 'Cone with cutouts', type: 'OpenSCAD' },
  { file:'example003.jscad', title: 'Cube with cutouts' },
  { file:'example003.scad', title: 'Cube with cutouts', type: 'OpenSCAD' },
  // { file:'example004.jscad', title: 'Cube minus sphere' },
  { file:'example005.jscad', title: 'Pavillon' },

  //{ file:'cnc-cutout.jscad', title: 'CNC Corner Cutouts', new: true, spacing: true },

  // { file:'bunch-cubes.jscad', title: 'Bunch of Cubes', new: true },
  { file:'lookup.jscad', title: 'Lookup()', spacing: true },
  { file:'expand.jscad', title: 'Expand()' },
  { file:'rectangular_extrude.jscad', title: 'Rectangular_extrude()' },
  { file:'linear_extrude.jscad', title: 'Linear_extrude()' },
  { file:'rotate_extrude.jscad', title: 'Rotate_extrude()' },
  { file:'polyhedron.jscad', title: 'Polyhedron()' },
  { file:'hull.jscad', title: 'Hull()' },
  { file:'chain_hull.jscad', title: 'Chain_hull()' },
  { file:'torus.jscad', title: 'Torus()' },

  { file:'text.jscad', title: 'Vector_text()', spacing: true },

  { file:'transparency.jscad', title: 'Transparency', spacing: true },
  { file:'transparency.amf', title: 'Transparency', type: 'AMF' },
  { file:'transparency2.jscad', title: 'Transparency 2' },

  { file:'slices/double-screw.jscad', title: 'SolidFromSlices(): Double Screw', spacing: true },
  { file:'slices/four2three.jscad', title: 'SolidFromSlices(): 4 to 3' },
  { file:'slices/four2three-round.jscad', title: 'SolidFromSlices(): 4 to 3 round' },
  { file:'slices/spring.jscad', title: 'SolidFromSlices(): Spring' },
  { file:'slices/tor.jscad', title: 'SolidFromSlices(): Tor (multi-color)' },
  { file:'slices/rose.jscad', title: 'SolidFromSlices(): Rose Curve' },

  { file:'servo.jscad', title: 'Interactive Params: Servo Motor', wrap: true },
  { file:'gear.jscad', title: 'Interactive Params: Gear' },
  { file:'s-hook.jscad', title: 'Interactive Params: S Hook' },
  { file:'grille.jscad', title: 'Interactive Params: Grille' },
  { file:'axis-coupler.jscad', title: 'Interactive Params: Axis Coupler' },
  { file:'lamp-shade.jscad', title: 'Interactive Params: Lamp Shade' },
  { file:'celtic-knot-ring.jscad', title: 'Interactive Params: Celtic Knot Ring' },
  { file:'stepper-motor.jscad', title: 'Interactive Params: Stepper Motor' },
  { file:'iphone4-case.jscad', title: 'Interactive Params: iPhone4 Case' },
  { file:'name_plate.jscad', title: 'Interactive Params: Name Plate' },
  { file:'balloons.jscad', title: 'Interactive Params: Balloons', new: true },

  { file:'globe.jscad', title: 'Include(): Globe', spacing: true },
  { file:'platonics/', title: 'Recursive Include(): Platonics' },

  { file:'babypanda2.svg', title: 'SVG Image: Baby Panda', spacing: true, new: true },

  { file:'3d_sculpture-VernonBussler.stl', title: '3D Model: 3D Sculpture (Vernon Bussler)', type: 'STL', spacing: true },
  { file:'frog-OwenCollins.stl', title: '3D Model: Frog (Owen Collins)', type: 'STL' },
  { file:'thing_7-Zomboe.stl', title: '3D Model: Thing 7 / Flower (Zomboe)', type: 'STL' },
  // { file:'organic_flower-Bogoboy23.stl', title: '3D Model: Organic Flower (Bogoboy23)', type: 'STL' }, // all wrong normals!!
  { file:'yoda-RichRap.stl', title: '3D Model: Yoda (RichRap)', type: 'STL' },
  { file:'feathers_mcgraw.stl', title: '3D Model: Feathers Mcgraw (q1g0ng)', type: 'STL', new: true },
  // { url:'http://pastebin.com/raw.php?i=wJLctyAQ', title: 'OpenJSCAD.org Logo', type:'Remote JSCAD' }
  // { file:'treefrog-Jerrill.stl', title: '3D Model: Treefrog (Jerrill)', type: 'STL' },    // nice frog, yet slow
  // { file:'klein_bottle-DizingOf.stl', title: '3D Model: Klein Bottle (DizingOf)', type: 'STL' } // too slow, over 400k triangles, huge memory consumption
];

function createExamples() {
  if(me=='web-online') {
     var wrap = 26;
     var colp = 100/Math.floor(ex.length/wrap+1)+"%";
     var src = '<table width=100%><tr><td widthx='+colp+' valign=top>';
     for(var i=0; i<ex.length; i++) {
        if(ex[i].wrap) {
           src += '</td><td class="examplesSeparator" widthx='+colp+' valign=top>';
        }
        if(ex[i].spacing) src += "<p/>";
        src += "<li><a href='#' onclick='fetchExample(\"examples/"+ex[i].file+"\"); return false;'>"+ex[i].title+"</a>\n";
        if(ex[i].type) src += " <span class=type>("+ex[i].type+")</span></a>";
        if(ex[i].new) src += " <span class=newExample>new</span></a>";
     }
     src += "</td></tr></table>";
     $('#examples').html(src);
  } else {
     // examples off-line won't work yet as XHR is used
     $('#examples').html("You are offline, drag'n'drop the examples from your installation");
  }
};

var options = [ 'renderCode', 'author', 'license' ];
var metakeys = [ 'author', 'license' ];

function saveOptions() {
  for(var k in options) {
    k = options[k];
    setCookie(k,$('#'+k).val());
    if(metakeys[k]) metadata[k] = options[k];
  }
};

function getOptions() {
  for(var k in options) {
    k = options[k];
    if(getCookie(k)) $('#'+k).val(getCookie(k))
  }
};

function createOptions() {
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
};

var gProcessor = null;

$(document).ready(function() {
    // Show all exceptions to the user:
    OpenJsCad.AlertUserOfUncaughtExceptions();

    gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"));
    setUpEditor();
    setupDragDrop();

    //gProcessor.setDebugging(debugging);
    if (me !== 'cli' && localStorage.editorContent && localStorage.editorContent.length) {
      putSourceInEditor(localStorage.editorContent, "MyDesign.jscad");
      gProcessor.setJsCad(localStorage.editorContent, "MyDesign.jscad");
      gProcessor.setStatus('Loaded source from browser storage');
    } 
    else if (me=='web-online') {    // we are online, fetch first example
      docUrl = document.URL;
      params = {};
      docTitle = '';
      if((!docUrl.match(/#(https?:\/\/\S+)$/)) && (!docUrl.match(/#(examples\/\S+)$/))) {
        if(possibleParams = docUrl.split("&")) {
          //console.log(possibleParams);
          for (i = 0; i < possibleParams.length; ++i) {
            //console.log("looping over: "+possibleParams[i]);
            if(match = possibleParams[i].match(/^.*#?param\[([^\]]+)\]=(.*)$/i)) {
              //console.log("matched parameter: key="+decodeURIComponent(match[1])+", val="+decodeURIComponent(match[2])+"");
              params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
            }
            else if(match = possibleParams[i].match(/^.*#?showEditor=false$/i)) {
              //console.log("not showing editor.");
              showEditor = false;
              $('#editor').hide();
            }
            else if(match = possibleParams[i].match(/^.*#?fetchUrl=(.*)$/i)) {
              //console.log("matched fetchUrl="+match[1]);
              urlParts = document.URL.match(/^([^#]+)#/);
              // derive an old-style URL for compatibility's sake
              docUrl = urlParts[1] + "#" + decodeURIComponent(match[1]);
            }
            else if(match = possibleParams[i].match(/^.*#?title=(.*)$/i)) {
              //console.log("matched title="+decodeURIComponent(match[1]));
              docTitle = decodeURIComponent(match[1]);
            }
          }
          //console.log(params,docUrl,docTitle);
        }
      }
      if(docUrl.match(/#(https?:\/\/\S+)$/)) {   // remote file referenced, e.g. http://openjscad.org/#http://somewhere/something.ext
        var u = RegExp.$1;
        var xhr = new XMLHttpRequest();
        xhr.open("GET",remoteUrl+u,true);
        if(u.match(/\.(stl|gcode)$/i)) {
          xhr.overrideMimeType("text/plain; charset=x-user-defined");    // our pseudo binary retrieval (works with Chrome)
        }
        gProcessor.setStatus("Fetching "+u+" <img id=busy src='imgs/busy.gif'>");
        xhr.onload = function() {
          var data = JSON.parse(this.responseText);
          fetchExample(data.file,data.url);
          document.location = docUrl.replace(/#.*$/,'#');       // this won't reload the entire web-page
        }
        xhr.send();
      }
      else if(docUrl.match(/#(examples\/\S+)$/)) {    // local example, e.g. http://openjscad.org/#examples/example001.jscad
        var fn = RegExp.$1;
        fetchExample(fn);
        document.location = docUrl.replace(/#.*$/,'#');
      } else {
        fetchExample('examples/'+ex[0].file);
      }
    } else {
      gProcessor.setJsCad(getSourceFromEditor(),"example.jscad");
    }
  });

function fetchExample(fn,url) {
  gMemFs = [];

  if(showEditor) { // FIXME test for the element
    $('#editor').show();
  } else {
    $('#editor').hide();
  }

  if(fn.match(/\.[^\/]+$/)) {     // -- has extension
    ;                                  // -- we could already check if valid extension (later)
  } else {                              // -- folder referenced
    if(!fn.match(/\/$/))
      fn += "/";      // add tailing /
    fn += 'main.jscad';
  }

  if(1) {     // doesn't work off-line yet
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fn, true);
    if(fn.match(/\.(stl|gcode)$/i)) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined");    // our pseudo binary retrieval (works with Chrome)
    }
    gProcessor.setStatus("Loading "+fn+" <img id=busy src='imgs/busy.gif'>");
    xhr.onload = function() {
        var source = this.responseText;
        var editorSource = source;
        var path = fn;

        _includePath = path.replace(/\/[^\/]+$/,'/');

         gProcessor.setStatus("Converting "+fn+" <img id=busy src='imgs/busy.gif'>");
         var worker = OpenJsCad.createConversionWorker();
         var u = gProcessor.baseurl;
      // NOTE: cache: false is set to allow evaluation of 'include' statements
         worker.postMessage({baseurl: u, source: source, filename: fn, cache: false});
      };
      xhr.send();
  }
};

