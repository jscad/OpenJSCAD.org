/// Windows 10 Hosted Web App support
/// Created by Michael S. Scherotter
/// Forked from OpenJSCAD.org
/// Source available on https://github.com/mscherotter/OpenJSCAD.org 
/// Updated 2015-12-03
/// Features
/// - Windows 10 November Update (TH2)
/// - Direct 3D Printing
/// - Download .stl and open in 3D Builder (default .stl handler)
/// - .jscad file activation

var Windows3DPrinting = {};

(function() {
    "use strict";
    var cadProcessor = null,
        intSize = 4,
        floatSize = 8,
        indexStride = 7,
        taskRequestedAdded = false,
        modelPackage = null, // the model package created in createModelPackageAsync()
        jscadFile = null,
        fileDateModified = null; 

    function isTh2(){
        /// <summary>Is Windows Threshold 2 (November 2015 Update)?</summary>
        /// <returns type="bool">true if running Windows TH2 (November 2015 Update)</returns>

        var apiInformation = Windows.Foundation.Metadata.ApiInformation,
            universalApiContract = "Windows.Foundation.UniversalApiContract";

        return apiInformation.isApiContractPresent(universalApiContract, 2);
    }

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

        vertexList.forEach(function(vertex) {
            dataWriter[index] = vertex.pos.x;
            index++;
            dataWriter[index] = vertex.pos.y;
            index++;
            dataWriter[index] = vertex.pos.z;
            index++;
        });

        mesh.vertexCount = vertexList.length;

        var desc = {
            format: printing3D.Printing3DBufferFormat.printing3DDouble,
            stride: 3
        };

        mesh.vertexPositionsDescription = desc;

        return mesh;
    }

    function createMeshTH(vertexList) {
        /// <summary>Creates a mesh and sets it vertex list</summary>
        /// <param name="vertexList">List of vertex object</param>
        /// <returns type="Windows.Graphics.Printing3D.Printing3DMesh"></returns>
        var printing3D = Windows.Graphics.Printing3D;

        var mesh = new printing3D.Printing3DMesh();

        mesh.createVertexPositions(floatSize * 3 * vertexList.length);

        var buffer = mesh.getVertexPositions();

        var index = 0;

        var dataWriter = new Float64Array(buffer);

        vertexList.forEach(function(vertex) {
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
                format: printing3D.Printing3DBufferFormat.printing3DUInt,
                stride: 3
            };

        mesh.triangleIndicesDescription = description;

        mesh.createTriangleIndices(intSize * indices.length);

        var buffer = mesh.getTriangleIndices();

        var dataWriter = new Uint32Array(buffer);

        indices.forEach(function(index, indexPos) {
            dataWriter[indexPos] = index;
        });

        mesh.indexCount = indices.length / 3;
    }

    function setMeshIndicesTh(indices, mesh) {
        /// <summary>Set the mesh indices</summary>
        /// <param name="indices">the list of triangle indices</param>
        /// <param name="mesh" type="Windows.Graphics.Printing3D.Printing3DMesh">the mesh</param>

        var printing3D = Windows.Graphics.Printing3D,
            description = {
                format: printing3D.Printing3DBufferFormat.r32G32B32UInt,
                stride: indexStride
            };

        mesh.triangleIndicesDescription = description;

        mesh.createTriangleIndices(intSize * description.stride * indices.length);

        var buffer = mesh.getTriangleIndices();

        var dataWriter = new Uint32Array(buffer);

        indices.forEach(function(index, indexPos) {
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

    function isColor(value) {
        return (value.a === this.a &&
            value.r === this.r &&
            value.g === this.g &&
            value.b === this.b);
    }

    function addColorMaterial(model, id, color) {
        var printing3D = Windows.Graphics.Printing3D;
        var materialGroup = new printing3D.Printing3DBaseMaterialGroup(id);

        var material = new printing3D.Printing3DBaseMaterial();

        material.name = printing3D.Printing3DBaseMaterial.Pla;

        var colrMat = new printing3D.Printing3DColorMaterial();

        colrMat.color = color;

        material.color = colrMat;

        materialGroup.bases.append(material);

        model.material.baseGroups.append(materialGroup);
    }

    function setMaterial(model, triangles) {
        var printing3D = Windows.Graphics.Printing3D;

        var colorMap = [];

        colorMap.push(Windows.UI.ColorHelper.fromArgb(255, 255, 0, 255));

        addColorMaterial(model, 1, colorMap[0]);

        triangles.forEach(function (triangle) {
            if (triangle.shared === null) {
                return;
            }
            if (triangle.shared.color === null) {
                return;
            }
            var color = Windows.UI.ColorHelper.fromArgb(
                triangle.shared.color[3] * 255,
                triangle.shared.color[0] * 255,
                triangle.shared.color[1] * 255,
                triangle.shared.color[2] * 255);

            if (colorMap.filter(isColor, color).length === 0) {

                colorMap.push(color);

                addColorMaterial(model, colorMap.length, color);
            }
        });

        return colorMap;
    }

    function setMaterialTH(model) {
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

    function setMaterialIndices(mesh, materialIndices) {
        ///<summary>Set the material indices</summary>
        var printing3D = Windows.Graphics.Printing3D,
            description = {
                format: printing3D.Printing3DBufferFormat.printing3DUInt,
                stride: 4
            };

        mesh.triangleMaterialIndicesDescription = description;
        mesh.createTriangleMaterialIndices(intSize * 4 * mesh.indexCount);

        var buffer = mesh.getTriangleMaterialIndices();

        var dataWriter = new Uint32Array(buffer);

        var count = 0;

        for (var index = 0; index < materialIndices.length; index++) {
            // for each triangle
            dataWriter[count] = materialIndices[index]; // this is the color index
            count++;
            dataWriter[count] = 0;
            count++;
            dataWriter[count] = 0;
            count++;
            dataWriter[count] = 0;
            count++;
        }
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

        var triangles = cadProcessor.currentObject.toTriangles();

        var colorMap = [];

        if (isTh2()) {
            colorMap = setMaterial(model, triangles);
        } else {
            setMaterialTH(model);
        }

        var vertices = [];
        var indices = [];
        var materialIndices = [];

        // Create a vertex list and index list for the triangles
        triangles.forEach(function(triangle) {
            triangle.vertices.forEach(function(vertex) {
                var index = vertices.indexOf(vertex);

                if (index === -1) {
                    index = vertices.push(vertex) - 1;
                }

                indices.push(index);
            });

            if (!isTh2()) {
                indices.push(0);
                indices.push(0);
                indices.push(0);
                indices.push(0);
            }

            var triangleColor = 1;

            if (triangle.shared === null || triangle.shared.color === null) {
                triangleColor = 1;
            } else {
                var color = Windows.UI.ColorHelper.fromArgb(
                    triangle.shared.color[3] * 255,
                    triangle.shared.color[0] * 255,
                    triangle.shared.color[1] * 255,
                    triangle.shared.color[2] * 255);

                for (var i = 0; i < colorMap.length; i++) {
                    if (colorMap[i].a === color.a &&
                        colorMap[i].r === color.r && 
                        colorMap[i].g === color.g &&
                        colorMap[i].b === color.b) {

                        triangleColor = i + 1;
                        break;
                    }
                }
            }

            materialIndices.push(triangleColor);
        });

        var mesh;

        if (isTh2()) {
            mesh = createMesh(vertices);
        } else {
            mesh = createMeshTH(vertices);
        }

        if (isTh2()) {
            setMeshIndices(indices, mesh);
            setMaterialIndices(mesh, materialIndices);
        } else {
            setMeshIndicesTh(indices, mesh);
        }

        model.meshes.append(mesh);

        console.log("Created mesh with " + indices.length + " indices and " + vertices.length + " vertices.");

        var component = createComponent(mesh, model);

        model.build.components.append(component);

        var mode = Windows.Graphics.Printing3D.Printing3DMeshVerificationMode.findAllErrors;

        return mesh.verifyAsync(mode).then(function(verificationResult) {
            return model.repairAsync();
        }, function(verificationResult) {
            return model.repairAsync();
        }).then(function() {
                modelPackage = new printing3D.Printing3D3MFPackage();

                return modelPackage.saveModelToPackageAsync(model);
            },
            function(repairError) {
                console.error("Error repairing model (typical in Windows TH2): " + repairError);

                modelPackage = new printing3D.Printing3D3MFPackage();

                return modelPackage.saveModelToPackageAsync(model);
            });
}

    function printHandler(args) {
        /// <summary>Create the Print package</summary>
        /// <param name="args" type="Windows.Graphics.Printing3D.Print3DTaskSourceRequestedArgs">the 3D print task source requested arguments</param>
        args.setSource(modelPackage);
    }

    function onTaskRequested(eventArgs) {
        ///<summary>Print task requested</summary>
        ///<param name="eventArgs" type="Windows.Graphics.Printing3D.Print3DTaskRequestedEventArgs">the 3D print task requested event arguments</param>

        var request = eventArgs.request;

        console.log("Print task requested.");

        var task = request.createTask("OpenJSCAD Model", "", printHandler);

        //task.addEventListener("completed", onPrintRequestCompleted);
        //task.addEventListener("submitting", onPrintRequestSubmitting);
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
        printButton.setAttribute("style", "position:absolute; left:5px; bottom:5px; font-size:7pt;");
        var icon = document.createElement("span");
        icon.setAttribute("style", "font-family: Segoe MDL2 Assets; font-size:24pt;");
        icon.appendChild(document.createTextNode(""));//"&#xE2F7;"));
        printButton.appendChild(icon);
        printButton.appendChild(document.createElement("br"));
        printButton.appendChild(document.createTextNode("3D Print"));
        printButton.onclick = print3D;

        parent.appendChild(printButton);

        var fileDropZone = document.getElementById("filedropzone");

        if (fileDropZone != null) {
            fileDropZone.style.marginLeft = "60px";
        }
    }

    function loadFileAsync(file) {
        console.log("Reading file " + file.path);

        /// <summary>Put the text of the first file into the editor</summary>
        /// <param name="files" type="array">array of Windows.Storage.StorageFile objects</param>
        jscadFile = file;
        var fileIo = Windows.Storage.FileIO,
            sourceCode;

        return fileIo.readTextAsync(jscadFile).then(function (text) {
            console.log("Getting basic properties...");
            sourceCode = text;

            return jscadFile.getBasicPropertiesAsync();
        }).then(function (basicProperties) {
            console.log("returning async data...");
            fileDateModified = basicProperties.dateModified;

            return {
                source: sourceCode,
                filename: jscadFile.name
            };
        });
    }

    function onFocus() {
        ///<summary>The window got the focus so check to see if the file has changed</summary>
        
        if (jscadFile == null) {
            return;
        }

        //todo: we should check the "Auto Reload" checkbox before doing this.

        jscadFile.getBasicPropertiesAsync().then(function(basicProperties) {
            var dateModified = basicProperties.dateModified;

            if (dateModified === fileDateModified) {
                return null;
            }
            fileDateModified = dateModified;

            var fileIo = Windows.Storage.FileIO;

            return fileIo.readTextAsync(jscadFile);
        }).then(function (text) {
            if (text === null) {
                return;
            }

            putSourceInEditor(text, jscadFile.name);
        });
    }

    function addFileActivation() {
        /// <summary>Add a file activation event</summary>

        window.addEventListener("focus", onFocus);
    }

    Windows3DPrinting.activateFileAsync = function () {
        ///<summary>Activate a file and return a promise when the file was activated</summary>

        if (document.location.search.indexOf("?token=") === 0) {
            var token = document.location.search.substr(7),
                futureAccessList = Windows.Storage.AccessCache.StorageApplicationPermissions.futureAccessList;

            console.log("Activated file token ", token);

            return futureAccessList.getItemAsync(token).then(function (file) {
                console.log("Activating file ", file.path);
                futureAccessList.remove(token);

                return loadFileAsync(file);
            });
        }
    }

    Windows3DPrinting.initialize = function (processor) {
        /// <summary>Add the 3D print button if running on Windows 10 as a 
        /// hosted web app.</summary>
        if (typeof Windows === "undefined") {

            if (navigator.userAgent.indexOf("Windows NT 10.0") > 0) {
                // Display the Windows 10 Badge only when running on Windows 10                
                document.getElementById("Windows10Badge").style.display = "block";
            }
            // this should only run inside a Windows 10 hosted web app.
            return;
        }

        MSApp.clearTemporaryWebDataAsync();

        cadProcessor = processor;

        addButton(processor.statusbuttons);

        addFileActivation();
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
            var current = Windows.Storage.ApplicationData.current;
            var tempFileStream;

            var picker = new Windows.Storage.Pickers.FileSavePicker();

            picker.defaultFileExtension = ".stl";
            picker.suggestedFileName = filename;
            try {
                picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.objects3D;
            } catch (error) {
                // there is an bug in Windows 10 TH2 that causes this error
                picker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;

            }
            picker.settingsIdentifer = "Save Location";
            picker.fileTypeChoices.insert("3MF Files", [".3mf"]);
            picker.fileTypeChoices.insert("STL Files", [".stl"]);
            picker.fileTypeChoices.insert("3D Files", [".3mf", ".stl"]);

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

                    if (storageFile.fileType === ".stl") {

                        var blob = that.currentObjectToBlob();
                        var inputStream = blob.msDetachStream();

                        var raStream = Windows.Storage.Streams.RandomAccessStream;
                        return raStream.copyAndCloseAsync(inputStream, outputStream);
                    } else if (storageFile.fileType === ".3mf") {
                        return createModelPackageAsync()
                            .then(function() {
                                return modelPackage.saveAsync();
                            })
                            .then(function(inputStream) {
                                var raStream = Windows.Storage.Streams.RandomAccessStream;
                                return raStream.copyAndCloseAsync(inputStream, outputStream);
                            });
                    }

                    return null;
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

