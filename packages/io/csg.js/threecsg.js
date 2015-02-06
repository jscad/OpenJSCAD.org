/*
    adapted from THREE.CSG
    @author Chandler Prall <chandler.prall@gmail.com> http://chandler.prallfamily.com

    Wrapper for Evan Wallace's CSG library (https://github.com/evanw/csg.js/)
    Provides CSG capabilities for Three.js models.

    Provided under the MIT License

*/
THREE.CSG = {
    // convert CSG object to three.js mesh.
    fromCSG: function(csg, defaultColor) {

        var i, j, vertices, face,
            three_geometry = new THREE.Geometry(),
            polygons = csg.toPolygons();

        if ( !CSG ) {
            throw 'CSG library not loaded. Please get a copy from https://github.com/evanw/csg.js';
        }

        // dict of different THREE.Colors in mesh
        var colors = {};
        // list of different opacities used by polygons
        var opacities = [];
        var materialIdx, opacity, colorKey, polyColor, color;

        polygons.forEach(function(polygon) {
            // polygon shared null? -> defaultColor, else extract color
            var vertices = polygon.vertices.map(function(vertex) {
                return this.getGeometryVertex(three_geometry, vertex.pos);
            }, this);

            if ( vertices[0] === vertices[vertices.length - 1] ) {
                vertices.pop( );
            }

            polyColor = polygon.shared.color ?
                polygon.shared.color.slice() :
                defaultColor.slice();
            opacity = polyColor.pop();

            // one material per opacity (color not relevant)
            // collect different opacity values in opacities
            // point to current polygon opacity with materialIdx
            var opacityIdx = opacities.indexOf(opacity);
            if (opacityIdx > -1) {
                materialIdx = opacityIdx;
            } else {
                opacities.push(opacity);
                materialIdx = opacities.length - 1;
            }

            // for each different color, create a color object
            var colorKey = polyColor.join("_");
            if (!(colorKey in colors)) {
                color = new THREE.Color();
                color.setRGB.apply(color, polyColor);
                colors[colorKey] = color;
            }

            // create a mesh face using color (not opacity~material)
            for (var k = 2; k < vertices.length; k++) {
                face = new THREE.Face3( vertices[0], vertices[k-1], vertices[k],
                    new THREE.Vector3().copy(polygon.plane.normal),
                    colors[colorKey], materialIdx );
                face.materialIdx = materialIdx;
                three_geometry.faces.push( face );
            }
        }, this);

        // for each opacity in array, create a matching material
        // (color are on faces, not materials)
        var materials = opacities.map(function(opa) {
            // trigger wireframe if opa == 0
            var asWireframe = (opa == 0);
            // if opacity == 0, this is just a wireframe
            var phongMaterial = new THREE.MeshPhongMaterial({
                opacity: opa || 1,
                wireframe: asWireframe,
                transparent: opa != 1 && opa != 0,
                vertexColors: THREE.FaceColors
            });
            // (force black wireframe)
            // if (asWireframe) {
            //     phongMaterial.color = 'black';
            // }
            if (opa > 0 && opa < 1) {
                phongMaterial.depthWrite = false;
            }
            return phongMaterial;
        });
        // now, materials is array of materials matching opacities - color not defined yet

        var colorMesh = new THREE.Mesh(three_geometry, new THREE.MeshFaceMaterial(materials));

        // pass back bounding sphere radius (or 0 if empty object)
        three_geometry.computeBoundingSphere();
        var boundLen = three_geometry.boundingSphere.radius +
            three_geometry.boundingSphere.center.length() || 0;

        var phongWireframeMaterial = new THREE.MeshPhongMaterial({
            wireframe: true,
            transparent: false,
            color:'black'
        });
        var wireframe = new THREE.Mesh(three_geometry, phongWireframeMaterial);

        // return result;
        return {
            colorMesh: colorMesh,
            wireframe: wireframe,
            boundLen: boundLen
        };
    },

    getGeometryVertex: function (geometry, vertex_position) {
        // var i;
        // // If Vertex already exists
        // // once required this should be done with the BSP info
        // for ( i = 0; i < geometry.vertices.length; i++ ) {
        //  if ( geometry.vertices[i].x === vertex_position.x &&
        //      geometry.vertices[i].y === vertex_position.y &&
        //      geometry.vertices[i].z === vertex_position.z ) {
        //      return i;
        //  }
        // }
        geometry.vertices.push(new THREE.Vector3( vertex_position.x, vertex_position.y, vertex_position.z ) );
        return geometry.vertices.length - 1;
    }
};