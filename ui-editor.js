var gCurrentFile = null;
var gProcessor = null;
var editor = null;

var gCurrentFiles = [];       // linear array, contains files (to read)
var gMemFs = [];              // associated array, contains file content in source gMemFs[i].{name,source}
var gMemFsCount = 0;          // async reading: count of already read files
var gMemFsTotal = 0;          // async reading: total files to read (Count==Total => all files read)
var gMemFsChanged = 0;        // how many files have changed
var gRootFs = [];             // root(s) of folders

var _includePath = './';

$(document).ready(function() {
   // -- http://ace.ajax.org/#nav=howto
   editor = ace.edit("editor");
   editor.setTheme("ace/theme/chrome");
   //document.getElementById('ace_gutter').style.background = 'none';
   editor.getSession().setMode("ace/mode/javascript");
   editor.getSession().on('change', function(e) {
      ;
   });
   ['Shift-Return'].forEach(function(key) {
      editor.commands.addCommand({
         name: 'myCommand',
         bindKey: { win: key, mac: key },
         exec: function(editor) {
            var src = editor.getValue();
            if(src.match(/^\/\/\!OpenSCAD/i)) {
               editor.getSession().setMode("ace/mode/scad");
               src = openscadOpenJscadParser.parse(src);
            } else {
               editor.getSession().setMode("ace/mode/javascript");
            }
            gMemFs = [];
            gProcessor.setJsCad(src);
         },
      });
   });
   if(0) {     // for reload when drag'n'dropped file(s) ([Reload] equivalent)
      viewer.onkeypress = function(evt) {
         if(evt.shiftKey&&evt.keyCode=='13') {   // Shift + Return
            superviseFiles({forceReload:true});
         }
      };
   }
   
   gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"));
   setupDragDrop();
   //gProcessor.setDebugging(debugging); 
   if(me=='web-online') {    // we are online, fetch first example
      //    gProcessor.setJsCad(editor.getValue());

      if(document.URL.match(/#(http:\/\/\S+)$/)||
         document.URL.match(/#(https:\/\/\S+)$/)) {   // remote file referenced, e.g. http://openjscad.org/#http://somewhere/something.ext
         var u = RegExp.$1;
         var xhr = new XMLHttpRequest();
         //echo("fetching",u);
         xhr.open("GET",'./remote.pl?url='+u,true);
         if(u.match(/\.(stl|gcode)$/i)) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");    // our pseudo binary retrieval (works with Chrome)
         }
         status("Fetching "+u+" <img id=busy src='imgs/busy.gif'>");
         xhr.onload = function() {
            //echo(this.responseText);
            var data = JSON.parse(this.responseText);
            //echo(data.url,data.filename,data.file);
            fetchExample(data.file,data.url);
            document.location = document.URL.replace(/#.*$/,'#');       // this won't reload the entire web-page
         }
         xhr.send(); 

      } else if(document.URL.match(/#(examples\/\S+)$/)) {    // local example, e.g. http://openjscad.org/#examples/example001.jscad
         var fn = RegExp.$1;
         fetchExample(fn);
         document.location = document.URL.replace(/#.*$/,'#');

      } else {
         fetchExample('examples/'+ex[0].file);
      }
   } else {
      gProcessor.setJsCad(editor.getValue());
   }
});

function fetchExample(fn,url) {
   gMemFs = []; gCurrentFiles = [];

   $('#editor').show();

   if(fn.match(/\.[^\/]+$/)) {     // -- has extension
      ;                                  // -- we could already check if valid extension (later)
   } else {                              // -- folder referenced
      if(!fn.match(/\/$/))
         fn += "/";      // add tailing /
      fn += 'main.jscad';
   }

   //echo("checking gMemFs");
   //if(gMemFs[fn]) {
   //   console.log("found locally:",gMemFs[i].name);
   //}
   if(1) {     // doesn't work off-line yet
      var xhr = new XMLHttpRequest();
      xhr.open("GET", fn, true);
      if(fn.match(/\.(stl|gcode)$/i)) {
         xhr.overrideMimeType("text/plain; charset=x-user-defined");    // our pseudo binary retrieval (works with Chrome)
      }
      status("Loading "+fn+" <img id=busy src='imgs/busy.gif'>");
      xhr.onload = function() {
         var source = this.responseText;
         var editorSource = source;
         var asyncComputation = false;
         var path = fn;

         _includePath = path.replace(/\/[^\/]+$/,'/');

         editor.getSession().setMode("ace/mode/javascript");
         if(fn.match(/\.jscad$/i)||fn.match(/\.js$/i)) {
            status("Processing "+fn+" <img id=busy src='imgs/busy.gif'>");
            //if(url) editorSource = "// Remote retrieved <"+url+">\n"+editorSource;
            putSourceInEditor(editorSource,fn);
            gProcessor.setJsCad(source,fn);

         } else if(fn.match(/\.scad$/i)) {
            status("Converting "+fn+" <img id=busy src='imgs/busy.gif'>");
            editorSource = source;
            //if(url) editorSource = "// Remote retrieved <"+url+">\n"+editorSource;
            if(!editorSource.match(/^\/\/!OpenSCAD/i)) {
               editorSource = "//!OpenSCAD\n"+editorSource;
            }
            source = openscadOpenJscadParser.parse(editorSource);
            if(0) {
               source = "// OpenJSCAD.org: scad importer (openscad-openjscad-translator) '"+fn+"'\n\n"+source;
            }
            editor.getSession().setMode("ace/mode/scad");
            putSourceInEditor(editorSource,fn);
            gProcessor.setJsCad(source,fn);

         } else if(fn.match(/\.(stl|obj|amf|gcode)$/i)) {
            status("Converting "+fn+" <img id=busy src='imgs/busy.gif'>");
            if(!fn.match(/\.amf/)) {
               // import STL/OBJ/AMF via Worker() (async computation) as it takes quite some time
               // RANT: the whole Blob() & Worker() is anything but a clean concept, mess over mess:
               //       for example, to pass a DOM variable to worker via postMessage may create a circular reference
               //       as the data is serialized, e.g. you cannot pass document and in the Worker access document.window.
               //       Dear Google / JavaScript developers: don't make JS unuseable with this mess!
               var blobURL = new Blob([document.querySelector('#conversionWorker').textContent]);
               // -- the messy part coming here:
               //var url = window.URL; url = url.replace(/#.*$/,''); url = url.createObjectURL(blobURL);
               var worker = new Worker(window.webkitURL!==undefined?window.webkitURL.createObjectURL(blobURL):window.URL.createObjectURL(blobURL));
               //var worker = new Worker(window.URL.createObjectURL(blobURL));
               worker.onmessage = function(e) {    // worker finished
                  var data = e.data;
                  //echo("worker end:",data.source,data.filename);
                  if(e.url) data.source = "// Remote retrieve <"+e.url+">\n"+data.source;
                  putSourceInEditor(data.source,data.filename);
                  gProcessor.setJsCad(data.source,data.filename);
               };
               var u = document.location.href;
               u = u.replace(/#.*$/,'');
               u = u.replace(/\?.*$/,'');
               worker.postMessage({me: me, version: version, url: u, remote: url, source: source, filename: fn }); // start worker
               asyncComputation = true;

            } else {       // async (disabled)
               status("Converting "+fn+" <img id=busy src='imgs/busy.gif'>");
               fn.match(/\.(stl|obj|amf|gcode)$/i);
               var type = RegExp.$1;
               if(type=='obj') {
                  editorSource = source = parseOBJ(source,fn);
               } else if(type=='amf') {
                  editorSource = source = parseAMF(source,fn);
               } else if(type=='gcode') {
                  editorSource = source = parseGCode(source,fn);
               } else {
                  editorSource = source = parseSTL(source,fn);
               }
               //if(url) editorSource = source = "// Remote retrieved <"+url+">\n"+editorSource;
               putSourceInEditor(source,fn);
            }
            if(!asyncComputation) {
               gProcessor.setJsCad(source,fn);
            }
         }
      }
      xhr.send();
   }
}

function putSourceInEditor(src,fn) {
   editor.setValue(src); 
   editor.clearSelection();
   editor.navigateFileStart();

   previousFilename = fn;
   previousScript = src;
   gPreviousModificationTime = "";
}