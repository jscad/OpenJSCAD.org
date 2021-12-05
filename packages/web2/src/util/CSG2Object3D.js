export function CSG2Object3D (THREE) {
  const {
    MeshPhongMaterial,
    LineBasicMaterial,
    BufferGeometry,
    BufferAttribute,
    Mesh,
    InstancedMesh,
    Line,
    LineSegments,
    Color
  } = THREE

  const flatShading = true
  const materials = {
    mesh: {
      def: new MeshPhongMaterial({ color: 0x0084d1, flatShading }),
      make: (params) => new MeshPhongMaterial({ flatShading, ...params })
    },
    line: {
      def: new LineBasicMaterial({ color: 0x0000ff }),
      make: ({ color, opacity, transparent }) =>
        new LineBasicMaterial({ color, opacity, transparent })
    },
    lines: null
  }
  materials.lines = materials.line

  function _CSG2Object3D (obj) {
    const { vertices, indices, color } = obj
    let { transforms } = obj

    const materialDef = materials[obj.type || 'mesh']
    if (!materialDef) { console.error('material not found for type ', obj.type, obj)}
    let material = materialDef.def
    const isInstanced = obj.type === 'instances'
    if (color && !isInstanced) {
      const c = color
      material = materialDef.make({
        color: _CSG2Object3D.makeColor(color),
        flatShading,
        opacity: c[3] === undefined ? 1 : c[3],
        transparent: c[3] !== 1 && c[3] !== undefined
      })
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(vertices, 3))

    let mesh
    switch (obj.type || 'mesh') {
      case 'mesh':
        geo.setIndex(new BufferAttribute(indices, 1))
        mesh = new Mesh(geo, material)
        break
      case 'instances':
        geo.setIndex(new BufferAttribute(indices, 1))
        mesh = new InstancedMesh(
          geo,
          materials.mesh.make({ color: 0x0084d1 })
        )
        transforms = null
        break
      case 'line':
        mesh = new Line(geo, material)
        break
      case 'lines':
        mesh = new LineSegments(geo, material)
        break
    }
    if (transforms && !isInstanced) mesh.applyMatrix4({ elements: transforms })
    return mesh
  }

  _CSG2Object3D.makeColor = (c) => new Color(c[0], c[1], c[2])
  _CSG2Object3D.materials = materials

  return _CSG2Object3D
}
