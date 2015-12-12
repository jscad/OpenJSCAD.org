(function() {
    "use strict";

    var isMenuShown = false;

    function initialize() {
        //var menuButton = document.getElementById("menuButton");

        $("#menuButton").click(function() {
            if (isMenuShown) {
                $("#dropDownMenu").slideUp();
            } else {
                $("#dropDownMenu").slideDown();
            }

            isMenuShown = !isMenuShown;
        });

        $("#3DViewItem").click(function () {
            $("#blockly").hide();
            $("#editor").hide();
            $("#dropDownMenu").slideUp();
            $("#3DViewItem").addClass("selectedMenuItem");
            $("#JavascriptCodingItem").removeClass("selectedMenuItem");
            $("#BlockCodingItem").removeClass("selectedMenuItem");
            isMenuShown = false;
        });
        $("#JavascriptCodingItem").click(function () {
            $("#blockly").hide();
            $("#editor").show();
            $("#dropDownMenu").slideUp();
            $("#JavascriptCodingItem").addClass("selectedMenuItem");
            $("#3DViewItem").removeClass("selectedMenuItem");
            $("#BlockCodingItem").removeClass("selectedMenuItem");
            isMenuShown = false;
        });

        $("#BlockCodingItem").click(function () {
            $("#blockly").show();
            $("#editor").hide();
            $("#dropDownMenu").slideUp();
            $("#BlockCodingItem").addClass("selectedMenuItem");
            $("#3DViewItem").removeClass("selectedMenuItem");
            $("#JavascriptCodingItem").removeClass("selectedMenuItem");
            isMenuShown = false;
        });

        setTimeout(function() {
            $("#editor").hide();
        }, 1000);
    }

    $(document).ready(initialize);
})();