<img src="doc/logo.png" width=256 align=right>
<h1>OpenJSCAD.org</h1>

<b>Version 0.010</b> (ALPHA)

<b>OpenJSCAD.org</b> is a more up-to-date <a href="http://joostn.github.com/OpenJsCad/">OpenJsCAD</a> frontend where you can edit .jscad files either locally or online via JS editor (built-in).
A few functions are available to make the transition from <a href="http://openscad.org/">OpenSCAD</a> to OpenJSCAD easier (<a href="https://github.com/Spiritdude/OpenSCAD.jscad">OpenSCAD.jscad</a> built-in),
as well CLI (command-line interface) for server-side computations with NodeJS.

<h2>Installation</h2>

<b>Immediate Use</b>: No installation, go to <b><a href="http://openjscad.org">OpenJSCAD.org</a></b>

<b>Local Web Use:</b>
<pre>
% git clone https://github.com/Spiritdude/OpenJSCAD.org
% cd OpenJSCAD.org
% make install
</pre>

and then access the files via local web-site and your web-browser. 

<b>Local CLI Use:</b>

For CLI (command-line interface) rendering install <a href="http://nodejs.org/">NodeJS</a> as well, e.g. <tt>apt-get install nodejs</tt> and then test it:
<pre>
% cd examples/
% openjscad example005.jscad                         # -- creates example005.stl as default
% openjscad example001.jscad -o test.stl
% openjscad example001.scad -o example001scad.jscad  # -- convert .scad into .jscad
% openjscad frog.stl -o test.jscad                   # -- convert .stl into .jscad
</pre>

Note: on some systems the NodeJS executable is <tt>node</tt> or <tt>nodejs</tt> (default), edit <tt>openjscad</tt> first line to reflect this.

<h2>History</h2>
<ul>
<li>2013/03/22: 0.010: leave .scad file intact, and translate on-the-fly
<li>2013/03/20: 0.009: OpenSCAD .scad syntax support included via <a href="https://github.com/garyhodgson/openscad-openjscad-translator">openscad-openjscad-translator</a> module, on web and cli; and experimental .stl import support (binary & ascii)
<li>2013/03/15: 0.008: circle(), square(), polygon() partially and linear_extrude() implemented (openscad-like)
<li>2013/03/14: 0.007: integrating jQuery for new features; draggable hint window
<li>2013/03/12: 0.006: included examples available in the web-frontend direct
<li>2013/03/12: 0.005: supporting webgui parameters as of original OpenJsCad (see examples/example030.jscad)
<li>2013/03/11: 0.004: openscad.js: many improvements, more OpenSCAD-like functions
<li>2013/03/10: 0.003: solidify the functionality (few bug fixes)
<li>2013/03/10: 0.001: initial version
</ul>

<h2>Todo</h2>
<ul>
<li> 3d primitive: <b>torus()</b>
<li> <del>OpenSCAD .scad support for both Web-GUI and CLI</del> (done)
<li> <b>include()</b> for Web-GUI and CLI to include libraries and modules
<li> save from built-in editor to local
<li> <del>complete 2D primitives and transformations</del> (done)
<li> implementation of <del><b>linear_extrude()</b></del> (done), <b>rotate_extrude()</b> (parameter compatible to OpenSCAD or very close so)
<li> example of platonic solids (in progress, requires include())
<li> simple 2D/3D text
<li> 3d operation: hull()
<li> processing/progress bar (0..100%), perhaps even visual progress seen in the model direct
<li> <del>STL importer</del> (done) & AMF importer / exporter
<li> integration into <a href="https://github.com/Spiritdude/RepRapCloud">RepRap Cloud</a> as first stage of the workflow
</ul>

<h2>Documentation</h2>
<ul>
<li><b><a href="https://github.com/Spiritdude/OpenJSCAD.org/wiki/User-Guide">OpenJSCAD User & Programming Guide</a></b>
</ul>

<h2>Screenshots</h2>

Simple JSCAD example (example000.jscad):
<img src="doc/sshot-01.png">

More sophisticated JSCAD example, fully object-oriented (OO) programmed with interactive parameters (example031.jscad):
<img src="doc/sshot-03-illu.png">

Import of STL models:
<img src="doc/sshot-04.png">

<h2>See Also</h2>
<ul>
<li><a href="http://joostn.github.com/OpenJsCad/">OpenJsCAD</a>, inspiration of this project and the following below
<li><a href="http://garyhodgson.github.com/openscad.net/">OpenSCAD.net</a>, another place of inspiration
<li><a href="http://kaosat-dev.github.com/CoffeeSCad/">CoffeeSCad</a>, JavaScript simplified (no more {}), very active development
<li><a href="http://rsmith.home.xs4all.nl/software/py-stl-stl2pov.html">stl2pov</a> tool to convert .stl to .pov, and then render via <a href="http://povray.org">PovRay.org</a>
</ul>


That's all for now,

Rene K. Mueller<br>
initial version 2013/03/10, updated 2013/03/21
