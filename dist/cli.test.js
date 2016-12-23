'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// NOTE : use   // --inspect --debug-brk to debug node commands in chrome
//FIXME: tests are basic 'is the output file there, how  big is it' for now, actual checks are needed !!
_ava2.default.afterEach.always(function (t) {
  // this runs after each test and other test hooks, even if they failed
  //remove created file
  try {
    _fs2.default.unlinkSync(t.context.outputPath);
  } catch (err) {}
});

_ava2.default.beforeEach(function (t) {
  var jscadPath = '../dist/cli';
  t.context = {
    jscadPath: _path2.default.resolve(__dirname, jscadPath)
  };
});

(0, _ava2.default)('jscad (basic, input file only)', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var expPath = _path2.default.resolve(__dirname, '../examples/logo.stl');
  t.context = { outputPath: expPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath;
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(expPath));
  t.deepEqual(_fs2.default.statSync(expPath).size, 326185); // is this cross platform ?
});

(0, _ava2.default)('jscad with parameters', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/name_plate.jscad');
  var outputPath = 'JustMe_Geek_name_plate.amf';
  var expPath = outputPath;
  t.context = { outputPath: outputPath };
  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' --name "Just Me" --title "Geek" -o ' + outputPath + ' ';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(expPath));
  t.deepEqual(_fs2.default.statSync(expPath).size, 575987); // is this cross platform ?
});

(0, _ava2.default)('jscad to stl (ascii)', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var outputPath = 'test.stl';
  var expPath = 'test.stl';
  t.context = { outputPath: outputPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' -o ' + outputPath + ' ';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(expPath));
  t.deepEqual(_fs2.default.statSync(expPath).size, 326185); // is this cross platform ?
});

(0, _ava2.default)('jscad to stl(binary)', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var outputPath = 'test.stl';
  var expPath = _path2.default.resolve(__dirname, '../examples/logo-binary.stl');
  t.context = { outputPath: outputPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' -o ' + outputPath + ' -of stlb';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(outputPath));
  //t.deepEqual(fs.readFileSync(expPath), fs.readFileSync(outputPath))
  t.deepEqual(_fs2.default.statSync(outputPath).size, 70284); // is this cross platform ?
});

(0, _ava2.default)('jscad to amf', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/logo.jscad');
  var outputPath = 'test.amf';
  var expPath = outputPath;
  t.context = { outputPath: outputPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' -o ' + outputPath + ' -of amf';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(outputPath));
  t.deepEqual(_fs2.default.statSync(outputPath).size, 385246); // is this cross platform ?
});

(0, _ava2.default)('jscad to amf(with transparency)', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/transparency.jscad');
  var outputPath = 'test.amf';
  var expPath = outputPath;
  t.context = { outputPath: outputPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' -o ' + outputPath + ' -of amf';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(expPath));
  t.deepEqual(_fs2.default.statSync(outputPath).size, 240108); // is this cross platform ?
});

//FIXME: DXF not working
/*test('jscad to dxf', t => {
  const inputPath = path.resolve(__dirname, '../examples/cnc-cutout.jscad')
  const outputPath = 'test.dxf'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of dxf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

//FIXME: svg not working
test('jscad to svg', t => {
  const inputPath = path.resolve(__dirname, '../examples/example001.jscad')
  const outputPath = 'test.svg'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of svg`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})*/

(0, _ava2.default)('openscad to stl (ascii)', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/example001.scad');
  var outputPath = 'test.stl';
  var expPath = 'test.stl';
  t.context = { outputPath: outputPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' -o ' + outputPath + ' ';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(expPath));
  t.deepEqual(_fs2.default.statSync(outputPath).size, 515365); // is this cross platform ?
});

(0, _ava2.default)('openscad to stl(binary)', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/example001.scad');
  var outputPath = 'test.stl';
  //const expPath = path.resolve(__dirname, '../examples/logo-binary.stl')
  t.context = { outputPath: outputPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' -o ' + outputPath + ' -of stlb';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(outputPath));
  //t.deepEqual(fs.readFileSync(expPath), fs.readFileSync(outputPath))
  t.deepEqual(_fs2.default.statSync(outputPath).size, 91884); // is this cross platform ?
});

(0, _ava2.default)('openscad to amf', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/example001.scad');
  var outputPath = 'test.amf';
  var expPath = outputPath;
  t.context = { outputPath: outputPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' -o ' + outputPath + ' -of amf';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(expPath));
  t.deepEqual(_fs2.default.statSync(outputPath).size, 554920); // is this cross platform ?
});

(0, _ava2.default)('openscad to openjscad', function (t) {
  var jscadPath = t.context.jscadPath;
  var inputPath = _path2.default.resolve(__dirname, '../examples/example001.scad');
  var outputPath = 'test.jscad';
  var expPath = outputPath;
  t.context = { outputPath: outputPath };

  var cmd = 'node ' + jscadPath + ' ' + inputPath + ' -o ' + outputPath + ' -of jscad';
  (0, _child_process.execSync)(cmd, { stdio: [0, 1, 2] });
  t.deepEqual(true, _fs2.default.existsSync(expPath));
  t.deepEqual(_fs2.default.statSync(outputPath).size, 876); // is this cross platform ?
});