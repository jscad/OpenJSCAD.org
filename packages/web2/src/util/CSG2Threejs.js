export function CSG2Threejs (THREE) {
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
      make: params => new MeshPhongMaterial({ flatShading, ...params })
    },
    line: {
      def: new LineBasicMaterial({ color: 0x0000ff }),
      make: params =>
        new LineBasicMaterial(params)
    },
    lines: null
  }
  materials.lines = materials.line

  function _CSG2Threejs (obj) {
    const { vertices, indices, normals, color, colors, isTransparent = false, opacity } = obj
    let { transforms } = obj
    const objType = obj.type || 'mesh'

    const materialDef = materials[objType]
    if (!materialDef) { console.error('material not found for type ', objType, obj) }
    let material = materialDef.def
    const isInstanced = obj.type === 'instances'
    if ((color || colors) && !isInstanced) {
      const c = color || colors
      const opts = {
        vertexColors: !!colors,
        opacity: c[3] === undefined ? 1 : c[3],
        transparent: (color && c[3] !== 1 && c[3] !== undefined) || isTransparent
      }
      if (opacity) opts.opacity = opacity
      if (!colors) opts.color = _CSG2Threejs.makeColor(color)
      material = materialDef.make(opts)
      if (opacity) {
        console.log('opacity', opacity)
        material.transparent = true
        material.opacity = opacity
      }
      console.log('opts', opts)
    }

    const geo = new BufferGeometry()
    geo.setAttribute('position', new BufferAttribute(vertices, 3))
    if (indices) geo.setIndex(indices)
    if (normals) geo.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
    if (colors) geo.setAttribute('color', new THREE.BufferAttribute(colors, isTransparent ? 4 : 3))

    let mesh
    switch (objType) {
      case 'mesh':
        mesh = new Mesh(geo, material)
        break
      case 'instances':
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
        // https://threejs.org/docs/#api/en/materials/LineBasicMaterial
        mesh = new LineSegments(geo, material)
        break
    }
    if (transforms && !isInstanced) mesh.applyMatrix4({ elements: transforms })
    return mesh
  }

  _CSG2Threejs.makeColor = (c) => new Color(c[0], c[1], c[2])
  _CSG2Threejs.materials = materials

  return _CSG2Threejs
}
