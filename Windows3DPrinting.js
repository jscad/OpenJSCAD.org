var Windows3DPrinting = {};

(function () {
    "use strict";
    var cadProcessor = null,
        intSize = 4,
        floatSize = 8;

    function getVertices(triangles) {
        var printing3D = Windows.Graphics.Printing3D,
            mesh = new printing3D.Printing3DMesh();

        mesh.createVertexPositions(floatSize * 3 * triangles.length);
        var buffer = mesh.getVertexPositions();

        var index = 0;

        var dataWriter = new Float64Array(buffer);
        triangles.forEach(function (triangle) {
            triangle.vertices.forEach(function(vertex) {
                dataWriter[index] = vertex.pos.x;
                index++;
                dataWriter[index] = vertex.pos.y;
                index++;
                dataWriter[index] = vertex.pos.z;
                index++;
            });
        });

        mesh.vertexCount = triangles.length * 3;

        return mesh;
    }

    function getIndices(triangles, mesh) {
        var printing3D = Windows.Graphics.Printing3D;
        var description = {
            format: printing3D.Printing3DBufferFormat.R32G32B32A32Float,
            stride: 7
        };

        mesh.indexCount = triangles.length * 3;

        mesh.vertexPositionsDescription = description;

        mesh.createTriangleIndices(intSize * description.stride * mesh.indexCount);

        var buffer = mesh.getTriangleIndices();

        var dataWriter = new Float64Array(buffer);

        triangles.forEach(function(triangle, index) {
            dataWriter[index * 3] = triangle.x;
            dataWriter[1 + index * 3] = triangle.y;
            dataWriter[2 + index * 3] = triangle.z;
            dataWriter[3 + index * 3] = 0;
            dataWriter[4 + index * 3] = 0;
            dataWriter[5 + index * 3] = 0;
            dataWriter[6 + index * 3] = 0;
        });
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

    function printHandler(args) {
        var Printing3D = Windows.Graphics.Printing3D;

        var modelPackage = new Printing3D.Printing3D3MFPackage();

        var model = new Printing3D.Printing3DModel();

        model.unit = Printing3D.Printing3DModelUnit.Millimeter;

        var materialGroup = new Printing3D.Printing3DBaseMaterialGroup(0);
        var material = new Printing3D.Printing3DBaseMaterial();

        material.name = Printing3D.Printing3DBaseMaterial.Pla;

        materialGroup.bases.append(material);

        model.material.baseGroups.append(materialGroup);

        var component = new Printing3D.Printing3DComponent();

        var triangles = cadProcessor.currentObject.toTriangles();
                
        var mesh = getVertices(triangles);

        getIndices(triangles, mesh);

        model.meshes.append(mesh);

        component.mesh = mesh;

        model.components.append(component);

        var componentWithMatrix = new Printing3D.Printing3DComponentWithMatrix();

        componentWithMatrix.component = component;

        componentWithMatrix.matrix = identity();

        model.build.components.append(componentWithMatrix);

        modelPackage.saveModelToPackageAsync(model).then(function() {
            args.setSource(modelPackage);
        });
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
        cadProcessor = processor;

        var printButton = document.createElement("button");
        printButton.setAttribute("style", "position:absolute; left:5px; bottom:5px;");
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

