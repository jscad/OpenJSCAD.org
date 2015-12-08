// Create an worker (thread) for converting various formats to JSCAD
//
// See worker-conversion.js for the conversion process
//
function createConversionWorker() {
  var w = new Worker('js/worker-conversion.js');
// when the worker finishes
// - put the converted source into the editor
// - save the converted source into the cache (gMemFs)
// - set the converted source into the processor (viewer)
  w.onmessage = function(e) {
      if (e.data instanceof Object) {
        var data = e.data;
        if ('filename' in data && 'source' in data) {
          //console.log("editor"+data.source+']');
          putSourceInEditor(data.source,data.filename);
        }
        if ('filename' in data && 'converted' in data) {
          //console.log("processor: "+data.filename+" ["+data.converted+']');
          if ('cache' in data && data.cache == true) {
            saveScript(data.filename,data.converted);
          }
          gProcessor.setJsCad(data.converted,data.filename);
        }
      }
    };
  return w;
};

