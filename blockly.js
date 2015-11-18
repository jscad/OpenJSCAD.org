var Blockly = {};

(function() {
    "use strict";

    var cadProcessor;

    function openBlockly() {
        var height = window.outerHeight;
        var width = window.outerWidth * 0.4;
        var left = window.screenX + (window.outerWidth * 0.6);
        var top = window.screenY - (window.outerHeight - window.innerHeight);

        var specs = "height=" + height + ",width=" + width + ", left=" + left + ", top=" + top;

        var newWindow = window.open("blockly/index.html", "_blank", specs);

        //console.log(window.document.location.href);

        //var viewId = MSApp.getViewId(newWindow);
    }

    function receiveMessage(event) {
        console.log("Received message from " + event.origin + ": " + event.data);

        var windowLocation = window.document.location.href;

        if (windowLocation.indexOf(event.origin) !== 0) {
            return;
        }

        var script = "// Model from Blockly\n\nfunction main() {\n    return " + event.data + ";\n}";

        putSourceInEditor(script, "Blockly");

        cadProcessor.setJsCad(script);
    }

    function addButton() {
        ///<summary>Add the Blockly button</summary>

        var blocklyButton = document.createElement("button");
        blocklyButton.setAttribute("style", "position:absolute; right:40%; top:0px; width:78px; height:40px; padding:2px");
        var img = document.createElement("img");
        img.setAttribute("src", "imgs/blockly.png");
        img.setAttribute("alt", "Create solid modeling code with block programming.");
        img.setAttribute("width", 72);
        img.setAttribute("height", 34);
        blocklyButton.appendChild(img);
        blocklyButton.onclick = openBlockly;

        var parent = document.body;
        parent.appendChild(blocklyButton);
    }

    Blockly.initialize = function (processor) {
        cadProcessor = processor;

        addButton(parent);

        window.addEventListener("message", receiveMessage, false);
    }
})();