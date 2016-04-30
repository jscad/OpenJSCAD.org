// ui-editor.js
//
// == OpenJSCAD.org, Copyright (c) 2013-2016, Licensed under MIT License
//
// Editor Functionality
//
// History:
//   2016/02/02: 0.4.0: GUI refactored, functionality split up into more files, mostly done by Z3 Dev

// --- Dependencies
// gProcessor var
// #editor element

// --- Global Variables
var gEditor = null;

// See http://ace.ajax.org/#nav=howto
function setUpEditor(divname) {
  if (divname === undefined) { divname = 'editor'; }
  if (document.getElementById(divname) === null) return;

  gEditor = ace.edit(divname);
  gEditor.$blockScrolling = Infinity;
  gEditor.getSession().setMode("ace/mode/javascript");
  //gEditor.setTheme("ace/theme/ambiance");
  //gEditor.setTheme("ace/theme/chaos");
  gEditor.setTheme("ace/theme/chrome");
  //gEditor.setTheme("ace/theme/clouds");
  //gEditor.setTheme("ace/theme/cobalt");
  //gEditor.setTheme("ace/theme/dawn"); // nice
  //gEditor.setTheme("ace/theme/dreamweaver");
  //gEditor.setTheme("ace/theme/eclipse");
  //gEditor.setTheme("ace/theme/github");
  //gEditor.setTheme("ace/theme/idle_fingers");
  //gEditor.setTheme("ace/theme/katzenmilch");
  //gEditor.setTheme("ace/theme/kr_theme");
  //gEditor.setTheme("ace/theme/kuroir");
  //gEditor.setTheme("ace/theme/merbivore");
  //gEditor.setTheme("ace/theme/mono_industrial");
  //gEditor.setTheme("ace/theme/monokai");
  //gEditor.setTheme("ace/theme/pastel_on_dark");
  //gEditor.setTheme("ace/theme/solarized_dark");
  //gEditor.setTheme("ace/theme/solarized_light");
  //gEditor.setTheme("ace/theme/terminal");
  //gEditor.setTheme("ace/theme/textmate");
  //gEditor.setTheme("ace/theme/tomorrow");
  //gEditor.setTheme("ace/theme/tomorrow_night");
  //gEditor.setTheme("ace/theme/tomorrow_night_blue");
  //gEditor.setTheme("ace/theme/tomorrow_night_bright");
  //gEditor.setTheme("ace/theme/tomorrow_night_eighties");
  //gEditor.setTheme("ace/theme/twilight");
  //gEditor.setTheme("ace/theme/vibrant_ink");
  //gEditor.setTheme("ace/theme/xcode");

// enable special keystrokes
  gEditor.commands.addCommand({
       name: 'setJSCAD',
       bindKey: { win: 'Shift-Return', mac: 'Shift-Return' },
       exec: function(editor) {
          var src = editor.getValue();
          if(src.match(/^\/\/\!OpenSCAD/i)) {
             editor.getSession().setMode("ace/mode/scad");
          // FIXME test for the global function first
             src = openscadOpenJscadParser.parse(src);
          } else {
             editor.getSession().setMode("ace/mode/javascript");
          }
          if (gProcessor !== null) {
            gProcessor.setJsCad(src);
          }
       },
    });
  gEditor.commands.addCommand({
       name: 'viewerReset',
       bindKey: { win: 'Ctrl-Return', mac: 'Command-Return' },
       exec: function(editor) {
          if (gProcessor !== null) {
            gProcessor.viewer.reset();
          }
       },
    });
}

function putSourceInEditor(src,fn) {
  if (gEditor !== null) {
    gEditor.setValue(src, -1);
    if(src.match(/^\/\/!OpenSCAD/i)) {
      gEditor.getSession().setMode("ace/mode/scad");
    } else {
      gEditor.getSession().setMode("ace/mode/javascript");
    }
  }
}

function getSourceFromEditor() {
  if (gEditor !== null) {
    return gEditor.getValue();
  }
  return '';
}

