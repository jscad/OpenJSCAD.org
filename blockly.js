var Blockly = {};

(function() {
    "use strict";

    var cadProcessor,
        isShown = false,
        script = null;

    function showBlockly() {
        var blockly = document.getElementById("blockly");

        if (isShown) {
            blockly.style.display = "none";
        } else {
            blockly.style.display = "block";
        }

        isShown = !isShown;
    }

    function openBlockly() {
        var height = window.outerHeight;
        var width = window.outerWidth * 0.4;
        var left = window.screenX + (window.outerWidth * 0.6);
        var top = window.screenY - (window.outerHeight - window.innerHeight);

        var specs = "resizable=yes,height=" + height + ",width=" + width + ", left=" + left + ", top=" + top;

       var newWindow = window.open("blockly/index.html", "_blank", specs);
    }

    function receiveMessage(event) {
        console.log("Received message from " + event.origin + ": " + event.data);

        var windowLocation = window.document.location.href;

        if (windowLocation.indexOf(event.origin) !== 0) {
            return;
        }

        var header = "// Model from Block Coding\n\n";

        // the extrudeText() helper function
        var extrudeText = "function extrudeText(text, width, height){\n    var l = vector_text(0, 0, text);\n    var o = [];\n    l.forEach(function(pl) {\n        o.push(rectangular_extrude(pl, {w: width, h: height}));\n    });\n\n    return union(o);\n}\n\n";

        if (event.data.indexOf("extrudeText") === -1) {
            script = header + event.data;
        } else {
            // extrudeText() is used in the code
            script = header + extrudeText + event.data;
        }

        Blockly.updateCode();
    }

    Blockly.updateCode = function() {
        if (script != null) {
            putSourceInEditor(script, "Blockly");

            cadProcessor.setJsCad(script);
        }
    }

    Blockly.newWindow = function() {
        showBlockly();
        openBlockly();
    }

    function addButton() {
        ///<summary>Add the Blockly button</summary>

        var blocklyButton = document.createElement("button");
        blocklyButton.setAttribute("id", "BlocklyButton");
        blocklyButton.setAttribute("style", "position:absolute; right:40%; top:0px; width:78px; height:40px; padding:2px");
        var img = document.createElement("img");
        img.setAttribute("src", "imgs/blockly.png");
        img.setAttribute("alt", "Create solid modeling code with block programming.");
        img.setAttribute("width", 72);
        img.setAttribute("height", 34);
        blocklyButton.appendChild(img);
        blocklyButton.onclick = showBlockly;//openBlockly;

        var parent = document.body;
        parent.appendChild(blocklyButton);
    }

    Blockly.initialize = function (processor) {
        cadProcessor = processor;

        addButton(parent);

        window.addEventListener("message", receiveMessage, false);
    }
})();