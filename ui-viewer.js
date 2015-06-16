// --- Dependencies:
// * OpenJSCad.Processor
// * #viewerContext element

// --- Init
$(document).ready(function() {
   gProcessor = new OpenJsCad.Processor(document.getElementById("viewerContext"));
   //gProcessor.setDebugging(debugging);
});

// --- Public API
var gProcessor = null;