# Shapes and geometries format understood by all renderers

Both must be immutable. An advanced mode will be considered with mutability that is controlled in some way (viewer needs to know what is changed, and also mutations may be forced via commands to help to simplify or optimize the viewer).

Format for the different types of geometries needs to be defined to be then supported in each renderer. Not all features in the format will be required to be implemented, but in case some features are not supported by some renderer, it needs to be put in a feature support table.

Main goal is to use ArrayBuffers because they are transferable, and because all 3 rendering engines also use them internally, and will likely have same format/layout because those buffers end-up in GPU.

## requirements for worker
Due to implementation differences it is important for worker to generate ouput a bit differently for specific viewer.

###  `forceIndex` - force indices data gen
it is beneficial to leave this optional, as webgpu renderer might fill indices in gpu or in other cases shader can be made
to work without indices.

 - threejs works even without (check if tehy are generated on the fly, then might be ok to also do it in the worker)
 - babylon uses indices data, and may not have support for working without indices

### `forceColors4` force 4 channel in colors (per vertex)
 - regl always uses 4 channels data in colors buffer
 - babylon always uses 4 channels data in colors buffer
 - threejs uses 4 channels when alpha enabled, 3 channels otherwise

## Geometry

Geometry holds basic data about a shape (points in space and how they are connected to represent a shape). 

- `type` - `lines|mesh`
- `id` - id of the geometry
- `vertices` - vertex data
- `indices` - indices pointing to vertex data

## Shape

Shape is a wrapper around a geo

- `id` - id of the shape
- `transform` - 4x4 transformation matrix for displaying and easier reuse
- `isTransparent` - if not set, alpha channel in color/colors will be ignored
- `color` - single color  for all 
- `colors` - buffer with color for each segment (preferred over color when both are present)
- `geometry` - geometry information (that will be transformed during display)

## Shape updates and view settings (TODO spec/impl)

Shape itself is lightweight (even with color per vertex, can reuse the colors if unchanged) so just sending a whole new scene could be fine.

In a context of an UI for 3d modeling it is useful to temporarily change view settings for a shape, group of shapes or whole scene. Although the provided shapes must be immutable to avoid issues with different parts of code causing unexpected issues, a kind of mutable state is needed for fast updates. This  will be done via `updateShape` and `resetShape` method. Since original shape is immutable, those overrides will be tracked separately and then can be purged via reset.

- `visible` - true by default
- `opacity` - update shape to use specific opacity
- `color` - color override (for highlight, etc.)
- `addTransform` - apply transform to the initial transform
- `transform`  - use instead of existing transform


## Shape: line segments `type:lines`
_*Continuous lines require less points to be rendered, but they can be rendered with line segments, so that geometry will be skipped (for now at least, if not completely)_

Line segments are first and very basic geometry that is needed to display the grid and XYZ axes.

## Shape: 3d mesh `type:mesh`
