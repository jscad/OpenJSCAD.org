var Windows3DPrinting = {};

(function () {
    "use strict";
    var processor = null;

    function printHandler(args) {
        var modelPackage = new Windows.Graphics.Printing3D.Printing3D3MFPackage();

        var stl = processor.currentObject.toStlString();

        console.log("STL: " + stl);

        args.setSource(modelPackage);
    }

    function onPrintRequestCompleted(args) {
        console.log("Print request completed: " + args);
    }

    function onPrintRequestSubmitting(args) {
        console.log("Print request submitting: " + args);
    }

    function onTaskRequested(eventArgs) {
        var request = eventArgs.request;

        console.log("Print task requested.");

        var task = request.createTask("OpenJSCAD Model", "", printHandler);

        task.addEventListener("completed", onPrintRequestCompleted);
        task.addEventListener("submitting", onPrintRequestSubmitting);
    }

    function print3D() {
        var print3DManager = Windows.Graphics.Printing3D.Print3DManager.getForCurrentView();

        print3DManager.addEventListener("taskrequested", onTaskRequested);

        Windows.Graphics.Printing3D.Print3DManager.showPrintUIAsync().done(function () {
            console.log("Print UI shown.");
        }, function(error) {
            console.error("Error printing: " + error);
        });
    }

    Windows3DPrinting.initialize = function (processor) {
        if (typeof Windows === "undefined") {
            // this should only run inside a Windows 10 hosted web app.
            return;
        }

        MSApp.clearTemporaryWebDataAsync();

        var statusButtons = processor.statusbuttons;
        processor = processor;

        var printButton = document.createElement("button");
        var icon = document.createElement("span");
        icon.setAttribute("style", "font-family: Segoe MDL2 Assets; font-size:24pt;");
        icon.appendChild(document.createTextNode(""));//"&#xE2F7;"));
        printButton.appendChild(icon);
        printButton.appendChild(document.createElement("br"));
        printButton.appendChild(document.createTextNode("Print"));
        printButton.onclick = print3D;

        statusButtons.appendChild(printButton);
    }
})();

