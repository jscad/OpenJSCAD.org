# Shape3
  - [ ] clone :
    * [ ] should it point to the source geometry or clone it ?
    * [x] docstrings
  - [ ] connectTo :
    * [ ] finish brainstorm of properties
    * [ ] implement new properties
    * [ ] finish brainstorm of connectors
    * [ ] implement new connectors
    * [ ] finish connectTo
    * [ ] docstrings
  - [ ] csgFeatures :
    * [ ] keep or remove ?
    * [ ] docstrings
  - [ ] cutByPlane :
    * [ ] rethink : can we find a way to use an infinite plane ?
        * currently uses extrusion of a cube on a plane fit to size
        * eliminate need to use extrusion ?
    * [ ] docstrings
  - [x] difference
    * [x] implementation
    * [x] docstrings
  - [ ] equals
    * [ ] implementation : add checks for properties ? 
    * [x] docstrings
  - [ ] expand
    * [ ] implementation : review and rewrite
    * [ ] docstrings
  - [ ] hull
    * [ ] implementation : TODO
    * [ ] docstrings
  - [x] intersection
    * [x] implementation
    * [x] docstrings
  - [ ] invert
    * [ ] implementation : determine how we deal with negative space
    * [ ] docstrings
  - [x] measureArea
    * [x] implementation
    * [x] docstrings
  - [x] measureBounds
    * [x] implementation
    * [x] docstrings
  - [x] measureVolume
    * [x] implementation
    * [x] docstrings
  - [ ] minkowsky
    * [ ] implementation : TODO
    * [ ] docstrings
  - [x] mirror
    * [x] implementation
    * [x] docstrings
  - [x] mirrorX
    * [x] implementation
    * [x] docstrings
  - [x] mirrorY
    * [x] implementation
    * [x] docstrings
  - [x] mirrorZ
    * [x] implementation
    * [x] docstrings
  - [x] project
    * [x] implementation
    * [x] docstrings
  - [ ] rotate
    * [ ] implementation: clarify deg vs rad and if what type of rotation system we want
    * [x] docstrings
  - [ ] rotateEuler
    * [ ] implementation: do we need this ?
    * [ ] docstrings
  - [x] rotateX
    * [x] implementation
    * [x] docstrings
  - [x] rotateY
    * [x] implementation
    * [x] docstrings
  - [x] rotateZ
    * [x] implementation
    * [x] docstrings
  - [x] scale
    * [x] implementation
    * [x] docstrings
  - [ ] section
    * [ ] implementation : finish / update the implementation
    * [ ] docstrings
  - [ ] setColor
    * [ ] implementation : do we keep this ? in what form ?
    * [ ] docstrings
  - [ ] toCompactBinary
    * [ ] implementation : do we keep this ? in what form ?
    * [ ] docstrings
  - [ ] toString
    * [ ] implementation : do we keep this ? in what form ?
    * [ ] docstrings
  - [x] toTriangles
    * [x] implementation : do we keep this ? in what form ?
    * [x] docstrings
  - [ ] transform
    * [ ] implementation : 99 % done, but we need to handle clone() specifics
    * [x] docstrings
  - [x] union
    * [x] implementation
    * [x] docstrings

# Geom3

# Shape2
  - [ ] chainHull :
    * [ ] implementation: review & update
    * [ ] docstrings
  - [ ] clone :
    * [ ] implementation: should it point to the source geometry or clone it ?
    * [x] docstrings
  - [x] create :
    * [x] implementation
    * [x] docstrings
  - [x] difference :
    * [x] implementation
    * [x] docstrings
  - [ ] equals :
    * [ ] implementation: todo: how to deal with properties
    * [x] docstrings
  - [x] expand :
    * [x] implementation: implement / upgrade
    * [x] docstrings
  - [ ] fromCompactBinary :
    * [ ] implementation: review, update, see if this should not be the standard data structure
    * [ ] docstrings
  - [ ] fromCurves :
    * [ ] implementation: implement
    * [ ] docstrings
  - [ ] fromObject :
    * [ ] implementation: is this still needed ??
    * [ ] docstrings
  - [ ] fromPath2 :
    * [ ] implementation: is this too close to fromCurves ?
    * [ ] docstrings
  - [ ] fromPoints :
    * [ ] implementation: review & upgrade
    * [ ] docstrings
  - [ ] fromSides : TODO : ELIMINATE, sides are not used as such anymore ! use fromPoints, fromCurves etc
  - [x] hull :
    * [x] implementation
    * [x] docstrings
  - [x] intersection :
    * [x] implementation
    * [x] docstrings
  - [ ] linearExtrude :
    * [ ] implementation: review & upgrade
    * [ ] docstrings
  - [x] measureArea :
    * [x] implementation
    * [x] docstrings
  - [x] measureBounds :
    * [x] implementation
    * [ ] docstrings: almost complete, save for the return type
# Geom2
