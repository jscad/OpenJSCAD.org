function evaluateSource (helperFunctions, CAG, mainParams, src) {
  /*
  //FIXME : should we be using this one instead ?
    var processor = new OpenJsCad.Processor();
  processor.setStatus("Initialized.");

  // convert the file list
  var src = fs.readFileSync(inPath,"UTF8");

  // process the script
  processor.setJsCad(src, inPath);

  var objects = processor.currentObject;

  // UNION the objects if necessary

  // convert to the requested format
  var object = objects;
  var outPath = './junk.stl';
  var outFormat = 'stla';
  var out = processor.convertToBlob(object,outFormat);
  */
  // console.log("render jscad to "+outputFormat)
  // console.log(JSON.stringify(gMainParam))
  const fullSrc = `${src}\n${helperFunctions}\nmain(_getParameterDefinitions(${JSON.stringify(mainParams)}))\n`
  let csgObject = eval(fullSrc)
  //auto extrude CAG
  if (csgObject.length) {
    let ouput = csgObject[0] instanceof CAG ? csgObject[0].extrude({offset: [0, 0, 0.1]}) : csgObject[0]

    for (let i = 1; i < csgObject.length; i++) {
      let current = csgObject[i] instanceof CAG ? csgObject[i].extrude({offset: [0, 0, 0.1]}) : csgObject[i]
      ouput = ouput.unionForNonIntersecting(current)
    }
    csgObject = ouput
  }

  return csgObject
}

module.exports = evaluateSource
