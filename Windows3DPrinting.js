var Windows3DPrinting = {};

(function () {
    "use strict";
    var cadProcessor = null,
        intSize = 4,
        floatSize = 8,
        indexStride = 7,
        taskRequestedAdded = false,
        modelPackage = null; // the model package created in createModelPackageAsync()

    function createMesh(vertexList) {
        /// <summary>Creates a mesh and sets it vertex list</summary>
        /// <param name="vertexList">List of vertex object</param>
        /// <returns type="Windows.Graphics.Printing3D.Printing3DMesh"></returns>
        var printing3D = Windows.Graphics.Printing3D;

        var mesh = new printing3D.Printing3DMesh();

        mesh.createVertexPositions(floatSize * 3 * vertexList.length);

        var buffer = mesh.getVertexPositions();

        var index = 0;

        var dataWriter = new Float64Array(buffer);

        vertexList.forEach(function (vertex) {
            dataWriter[index] = vertex.pos.x;
            index++;
            dataWriter[index] = vertex.pos.y;
            index++;
            dataWriter[index] = vertex.pos.z;
            index++;
        });

        mesh.vertexCount = vertexList.length;

        var desc = {
            format: printing3D.Printing3DBufferFormat.r32G32B32Float,
            stride: 3
        };

        mesh.vertexPositionsDescription = desc;

        return mesh;
    }

    function setMeshIndices(indices, mesh) {
        /// <summary>Set the mesh indices</summary>
        /// <param name="indices">the list of triangle indices</param>
        /// <param name="mesh" type="Windows.Graphics.Printing3D.Printing3DMesh">the mesh</param>

        var printing3D = Windows.Graphics.Printing3D,
            description = {
                format: printing3D.Printing3DBufferFormat.r32G32B32UInt,
                stride: indexStride
            };

        mesh.triangleIndicesDescription = description;

        mesh.createTriangleIndices(intSize * indices.length);

        var buffer = mesh.getTriangleIndices();

        var dataWriter = new Uint32Array(buffer);

        indices.forEach(function (index, indexPos) {
            dataWriter[indexPos] = index;
        });

        mesh.indexCount = indices.length / indexStride;
    }

    function identity() {
        var identityMatrix = {};

        identityMatrix.m11 = 1.0;
        identityMatrix.m12 = 0.0;
        identityMatrix.m13 = 0.0;
        identityMatrix.m14 = 0.0;
        identityMatrix.m21 = 0.0;
        identityMatrix.m22 = 1.0;
        identityMatrix.m23 = 0.0;
        identityMatrix.m24 = 0.0;
        identityMatrix.m31 = 0.0;
        identityMatrix.m32 = 0.0;
        identityMatrix.m33 = 1.0;
        identityMatrix.m34 = 0.0;
        identityMatrix.m41 = 0.0;
        identityMatrix.m42 = 0.0;
        identityMatrix.m43 = 0.0;
        identityMatrix.m44 = 1.0;

        return identityMatrix;
    }

    function createComponent(mesh, model) {
        var printing3D = Windows.Graphics.Printing3D;

        var component = new printing3D.Printing3DComponent();

        component.mesh = mesh;

        model.components.append(component);

        var componentWithMatrix = new printing3D.Printing3DComponentWithMatrix();

        componentWithMatrix.component = component;

        componentWithMatrix.matrix = identity();

        return componentWithMatrix;
    }

    function setMaterial(model) {
        var printing3D = Windows.Graphics.Printing3D;
        var materialGroup = new printing3D.Printing3DBaseMaterialGroup(1);
        var material = new printing3D.Printing3DBaseMaterial();

        material.name = printing3D.Printing3DBaseMaterial.Pla;

        var colrMat = new printing3D.Printing3DColorMaterial();

        colrMat.value = 16768768;

        material.color = colrMat;

        materialGroup.bases.append(material);

        model.material.baseGroups.append(materialGroup);
    }

    function createModelPackageAsync() {
        if (cadProcessor.currentObject === null) {
            var message = "Wait for model to generate before printing.";
            var messageDialog = new Windows.UI.Popups.MessageDialog(message, "Print Model");

            messageDialog.showAsync();

            return false;
        }

        var printing3D = Windows.Graphics.Printing3D;

        var model = new printing3D.Printing3DModel();

        model.unit = printing3D.Printing3DModelUnit.millimeter;

        setMaterial(model);

        var triangles = cadProcessor.currentObject.toTriangles();

        var vertices = [];
        var indices = [];

        // Create a vertex list and index list for the triangles
        triangles.forEach(function(triangle) {
            triangle.vertices.forEach(function(vertex) {
                var index = vertices.indexOf(vertex);

                if (index === -1) {
                    index = vertices.push(vertex) - 1;
                }

                indices.push(index);
            });
            indices.push(0);
            indices.push(0);
            indices.push(0);
            indices.push(0);
        });

        var mesh = createMesh(vertices);

        setMeshIndices(indices, mesh);

        model.meshes.append(mesh);

        console.log("Created mesh with " + indices.length + " indices and " + vertices.length + " vertices.");

        var component = createComponent(mesh, model);

        model.build.components.append(component);

        return model.repairAsync()
            .then(function (repairResult) {
                modelPackage = new printing3D.Printing3D3MFPackage();

                return modelPackage.saveModelToPackageAsync(model);
            });
    }

    function printHandler(args) {
        /// <summary>Create the Print package</summary>
        /// <param name="args" type="Windows.Graphics.Printing3D.Print3DTaskSourceRequestedArgs">the 3D print task source requested arguments</param>
        args.setSource(modelPackage);
    }

    function onPrintRequestCompleted(args) {
        console.log("Print request completed: " + args);
    }

    function onPrintRequestSubmitting(args) {
        console.log("Print request submitting: " + args);
    }

    function onTaskRequested(eventArgs) {
        ///<summary>Print task requested</summary>
        ///<param name="eventArgs" type="Windows.Graphics.Printing3D.Print3DTaskRequestedEventArgs">the 3D print task requested event arguments</param>

        var request = eventArgs.request;

        console.log("Print task requested.");

        var task = request.createTask("OpenJSCAD Model", "", printHandler);

        task.addEventListener("completed", onPrintRequestCompleted);
        task.addEventListener("submitting", onPrintRequestSubmitting);
    }

    function print3D() {
        ///<summary>Start a 3D Print on Windows 10</summary>

        var printing3D = Windows.Graphics.Printing3D;

        var print3DManager = printing3D.Print3DManager.getForCurrentView();

        if (!taskRequestedAdded) {
            print3DManager.addEventListener("taskrequested", onTaskRequested);
            taskRequestedAdded = true;
        }
        
        createModelPackageAsync().then(function() {
            return printing3D.Print3DManager.showPrintUIAsync();
        }).done(function() {
            console.log("Print UI shown.");
        }, function(error) {
            var messageDialog = new Windows.UI.Popups.MessageDialog(error.message, "Error Printing");

            messageDialog.showAsync();
        });
    }

    function addButton(parent) {
        ///<summary>Add the print button</summary>
        var printButton = document.createElement("button");
        printButton.setAttribute("style", "position:absolute; left:5px; bottom:5px;");
        var icon = document.createElement("span");
        icon.setAttribute("style", "font-family: Segoe MDL2 Assets; font-size:24pt;");
        icon.appendChild(document.createTextNode(""));//"&#xE2F7;"));
        printButton.appendChild(icon);
        printButton.appendChild(document.createElement("br"));
        printButton.appendChild(document.createTextNode("Print"));
        printButton.onclick = print3D;

        parent.appendChild(printButton);
    }

    Windows3DPrinting.initialize = function (processor) {
        /// <summary>Add the 3D print button if running on Windows 10 as a 
        /// hosted web app.</summary>
        if (typeof Windows === "undefined") {
            // this should only run inside a Windows 10 hosted web app.
            return;
        }

        MSApp.clearTemporaryWebDataAsync();

        cadProcessor = processor;

        addButton(processor.statusbuttons);
    }

    Windows3DPrinting.downloadModel = function (openJscad) {
        /// <summary>Download and launch the .STL file</summary>
        /// <param name="openJscad">the OpenJSCAD object</param>

        var extension = openJscad.selectedFormatInfo().extension;
        var filename = "output." + extension;
        var that = openJscad;
        that.hasOutputFile = true;
        that.enableItems();
        that.downloadOutputFileLink.innerHTML = that.downloadLinkTextForCurrentObject();
        that.downloadOutputFileLink.onclick = function () {
            var blob = that.currentObjectToBlob();
            var inputStream = blob.msDetachStream();

            var current = Windows.Storage.ApplicationData.current;
            var tempFileStream;

            var picker = new Windows.Storage.Pickers.FileSavePicker();
            picker.defaultFileExtension = ".stl";
            picker.suggestedFileName = filename;
            picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.objects3D;
            picker.settingsIdentifer = "Save Location";
            picker.fileTypeChoices.insert("STL Files", [".stl"]);
            var storageFile;

            picker.pickSaveFileAsync()
            .then(function (pickedFile) {
                if (pickedFile == null) {
                    return null;
                }

                storageFile = pickedFile;
                return storageFile.openAsync(Windows.Storage.FileAccessMode.readWrite);
            })
            .then(function (outputStream) {
                if (outputStream == null) {
                    return null;
                }

                var raStream = Windows.Storage.Streams.RandomAccessStream;
                return raStream.copyAndCloseAsync(inputStream, outputStream);
            })
            .then(function () {
                if (storageFile != null) {
                    Windows.System.Launcher.launchFileAsync(storageFile);

                }
            });

        }
        if (that.onchange) that.onchange();
    }
})();

