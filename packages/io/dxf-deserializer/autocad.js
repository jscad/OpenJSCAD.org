/*
AutoCAD Constants

## License

Copyright (c) 2017 Z3 Development https://github.com/z3dev

All code released under MIT license
*/

//
// translate group codes to names for use as object attributes
//
const dxfTLA = [
  [0, 'etyp'], [1, 'text'], [2, 'name'], [3, 'nam1'],
  [5, 'hdle'], [6, 'ltyp'], [7, 'lsty'], [8, 'lnam'], [9, 'vari'],
  [10, 'pptx'], [11, 'sptx'], [12, 'tptx'], [13, 'fptx'],
  [20, 'ppty'], [21, 'spty'], [22, 'tpty'], [23, 'fpty'],
  [30, 'pptz'], [31, 'sptz'], [32, 'tptz'], [33, 'fptz'],
  [38, 'elev'], [39, 'lthk'],
  [40, 'swid'], [41, 'ewid'], [42, 'bulg'], [43, 'cwid'],
  [48, 'lscl'],
  [50, 'ang0'], [51, 'ang1'],
  [60, 'visb'], [62, 'cnmb'],
  [67, 'spac'],
  [70, 'lflg'], [71, 'fvia'], [72, 'fvib'], [73, 'fvic'], [74, 'fvid'],
  [75, 'cflg'],
  [90, 'vlen'], [91, 'slen'], [92, 'plen'], [93, 'flen'], [94, 'elen'],
  [95, 'clen'],
  [100, 'sbnm'],
  [210, 'etrx'],
  [220, 'etry'],
  [230, 'etrz']
]

const dxfMap = new Map(dxfTLA)

const getTLA = (group) => dxfMap.get(group)

/*
 * AutoCAD Drawing Units
 */
const drawingUnits = [
  [0, 'none'],
  [1, 'inches'],
  [2, 'feet'],
  [3, 'miles'],
  [4, 'millimeters'],
  [5, 'centimeters'],
  [6, 'meters'],
  [7, 'kilometers'],
  [8, 'microinches'],
  [9, 'mils'],
  [10, 'yards'],
  [11, 'angstroms'],
  [12, 'nanometers'],
  [13, 'microns'],
  [14, 'decimeters'],
  [15, 'dekameters'],
  [16, 'hectometers'],
  [17, 'gigameters'],
  [18, 'astrounits'],
  [19, 'lightyears'],
  [20, 'parsecs']
]

const BYBLOCK = 0
const BYLAYER = 256

module.exports = {
  drawingUnits,
  BYBLOCK,
  BYLAYER,
  getTLA
}
