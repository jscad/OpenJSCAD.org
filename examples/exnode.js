var cad = require('../cadlib');

inc('./lumber.js');

function board(n) {
  return [
    color('yellow', _2x4().rotateY(210).translate([0,n*24,0]))
  ]
}

cad.renderFile(board(0), 'boards.stl');
