var Windows3DPrinting = {};

(function () {
    "use strict";

    function onTaskRequested(eventArgs) {
        console.log("Print task requested.");
    }

    function print3D() {
        var print3DManager = Windows.Graphics.Printing3D.Print3DManager.getForCurrentView();

        print3DManager.showPrintUIAsync().done(function () {
            console.log("Print UI shown.");
        }, function(error) {
            console.error("Error printing: " + error);
        });
    }

    Windows3DPrinting.initialize = function(statusButtons) {
        if (typeof Windows === "undefined") {
            return;
        }

        var print3DManager = Windows.Graphics.Printing3D.Print3DManager;

        print3DManager.addEventListener("taskrequested", onTaskRequested);

        var printButton = document.createElement("button");
        printButton.appendChild(document.createTextNode("Print"));
        printButton.onclick = print3D;

        statusButtons.appendChild(printButton);
    }
})();

