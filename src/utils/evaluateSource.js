'use strict'
const path = require('path')

function evaluateSource (modelingHelpers, CAG, mainParams, src) {
  /*
  //FIXME : should we be using this one instead ?
    var processor = new OpenJsCad.Processor(); //FIXME  : cannot be used , refers to browser only things like 'document etc'
  */

  const mainFunction = `main(_getParameterDefinitions(${JSON.stringify(mainParams)}))`
  const fullSrc = `${src}\n${modelingHelpers}\n${mainFunction}\n`
  //console.log('mainFunction', mainFunction)
  var csgObject = eval(fullSrc) // FIXME : this needs to be gone ASAP !! hence need to change OpenjScad.processor
  //auto extrude CAG
  if (csgObject.length) {
    var ouput = csgObject[0] instanceof CAG ? csgObject[0].extrude({offset: [0, 0, 0.1]}) : csgObject[0]

    for (var i = 1; i < csgObject.length; i++) {
      const current = csgObject[i] instanceof CAG ? csgObject[i].extrude({offset: [0, 0, 0.1]}) : csgObject[i]
      ouput = ouput.unionForNonIntersecting(current)
    }
    csgObject = ouput
  }

  return csgObject
}

module.exports = evaluateSource
