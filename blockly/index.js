(function () {
    "use strict";

    var workspace = null;

    function updateSource() {
        ///<summary>Post a message with the code to the main window.</summary>

        var code = Blockly.JavaScript.workspaceToCode(workspace);

        try {
            if (typeof window.opener === "undefined") {
                window.parent.postMessage(code, "*");
            } else {
                window.opener.postMessage(code, "*");
            }
            console.log("Posted code: " + code);
        } catch (error) {
        }
    }

    function saveWorkspace() {
        ///<summary>Save the workspace to roaming storage to the filename in 
        /// the Filename edit box.</summary>

        var storage = Windows.Storage,
            filename = document.getElementById("Filename"),
            desiredName = filename.value,
            roamingFolder = storage.ApplicationData.current.roamingFolder,
            openOfExists = storage.CreationCollisionOption.openIfExists;

        roamingFolder.createFolderAsync("BlockCoding", openOfExists)
        .then(function (folder) {
            return folder.createFileAsync(desiredName, openOfExists);
        }).then(function (file) {
            var dom = Blockly.Xml.workspaceToDom(workspace);
            var contents = Blockly.Xml.domToText(dom);

            filename.value = file.name;

            return storage.FileIO.writeTextAsync(file, contents);
        }).then(function() {
            loadFiles();
        });
    }

    function addFile(filename, displayName) {
        ///<summary>Add a file to the load file select list</summary>

        var fileOpenSelect = document.getElementById("FileOpenSelect"),
            option = document.createElement("option");

        option.setAttribute("value", filename);
        option.appendChild(document.createTextNode(displayName));

        fileOpenSelect.appendChild(option);
    }

    function loadFiles() {
        ///<summary>Load the files into the select list</summary>

        var storage = Windows.Storage;

        storage.ApplicationData.current.roamingFolder.createFolderAsync("BlockCoding", storage.CreationCollisionOption.openIfExists).then(function (folder) {
            return folder.getFilesAsync();
        }).then(function (files) {
            var fileOpenSelect = document.getElementById("FileOpenSelect");

            while (fileOpenSelect.childElementCount > 0) {
                fileOpenSelect.removeChild(fileOpenSelect.item(0));
            }

            addFile("", "New file");

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                addFile(file.name, file.displayName);
            }
        });
    }

    function onSelectFile() {
        ///<summary>Open the selected file</summary>

        var filename = this.options[this.selectedIndex].value,
            storage = Windows.Storage,
            openIfExisting = storage.CreationCollisionOption.openIfExists,
            roamingFolder = storage.ApplicationData.current.roamingFolder;

        workspace.clear();

        if (filename === "") {
            var xml = '<xml><block type="cad_model" deletable="false" movable="false"></block></xml>';

            Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(xml));

            return;
        } 

        roamingFolder.createFolderAsync("BlockCoding", openIfExisting)
        .then(function(folder) {
            return folder.getFileAsync(filename);
        })
        .then(function (file) {
            var filenameBox = document.getElementById("Filename");

            filenameBox.value = file.displayName;

            return storage.FileIO.readTextAsync(file);
        }).then(function (text) {
            var dom = Blockly.Xml.textToDom(text);

            Blockly.Xml.domToWorkspace(workspace, dom);
        });
    }

    function addFileButtons() {
        ///<summary>Add the file buttons if running on Windows</summary>
        document.getElementById("UpdateCodeButton").onclick = updateSource;

        if (typeof Windows !== "undefined") {
            console.log("Adding file buttons...");

            document.getElementById("WindowsButtons").style.display = "block";

            var saveButton = document.getElementById("SaveButton");

            saveButton.onclick = saveWorkspace;

            var fileOpenSelect = document.getElementById("FileOpenSelect");

            fileOpenSelect.addEventListener("change", onSelectFile);

            loadFiles();
        } else {
            document.getElementById("WindowsButtons").style.display = "none";
        }
    }

    function initialize() {
        ///<summary>Initialize the Blockly div and add the buttons</summary>
        var blocklyArea = document.getElementById('blocklyArea');
        var blocklyDiv = document.getElementById('blocklyDiv');
        workspace = Blockly.inject(blocklyDiv,
        {
            media: 'media/',
            toolbox: document.getElementById('toolbox'),
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            }
        });

        window.setTimeout(function () {
            BlocklyStorage.restoreBlocks(workspace);
            if (workspace.topBlocks_.length === 0) {
                var xml = '<xml><block type="cad_model" deletable="false" movable="false"></block></xml>';
                Blockly.Xml.domToWorkspace(workspace, Blockly.Xml.textToDom(xml));
            }
        }, 0);

        BlocklyStorage.backupOnUnload();

        var onresize = function () {
            // Compute the absolute coordinates and dimensions of blocklyArea.
            var element = blocklyArea;
            var x = 0;
            var y = 0;
            do {
                x += element.offsetLeft;
                y += element.offsetTop;
                element = element.offsetParent;
            } while (element);
            // Position blocklyDiv over blocklyArea.
            blocklyDiv.style.left = x + 'px';
            blocklyDiv.style.top = y + 'px';
            blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
            blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
        };
        window.addEventListener('resize', onresize, false);
        onresize();
        addFileButtons();
    }

    initialize();

})();
