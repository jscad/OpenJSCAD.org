import { Geom2, Geom3, Geometry } from '@jscad/modeling/src/geometries/types'
import { Entity } from './entity'

export = entitiesFromSolids;
/**
 * Convert the given solids into renderable entities.
 * Each 'solid' (V2 geometry) is converted to a WEBGL renderable 'geometry'.
 * The resulting entities are passed as properities to the render.
 * @param {Object} options - options for construction
 * @param {Array} [options.color] - color for rendering, if the solid does not provide a color
 * @param {Boolean} [options.smoothNormals=true] - smooth the normals of 3d solids, rendering a smooth surface
 * @returns {Array} an array of renderable entities
 */
declare function entitiesFromSolids(options: { color?: number[]; smoothNormals?: boolean }, ...solids:Geom2[] | Geom3[]): Entity[];
