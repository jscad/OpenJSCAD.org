// ********************
// The design to render.
// This file is used in both demo.es.html and demo.html to show that
// nothing has to be changed by modeling when once changes used API from common global
// (demo.html) to ES6 Module (demo.es.html)
// ********************
import {
    intersect, subtract,
    cube, cuboid, line, sphere, star,
    colorize
} from './jscad-modeling.es.js';


export const main = (parameters) => {
    parameters = {scale: 1}
    const logo = [
        colorize([1.0, 0.4, 1.0], subtract(
            cube({ size: 300 }),
            sphere({ radius: 200 })
        )),
        colorize([1.0, 1.0, 0], intersect(
            sphere({ radius: 130 }),
            cube({ size: 210 })
        ))
    ]

    const transpCube = colorize([1, 0, 0, 0.25], cuboid({ size: [100 * parameters.scale, 100, 210 + (200 * parameters.scale)] }))
    const star2D = star({ vertices: 8, innerRadius: 300, outerRadius: 400 })
    const line2D = colorize([1.0, 0, 0], line([[260, 260], [-260, 260], [-260, -260], [260, -260], [260, 260]]))
    // some colors are intentionally without alpfa channel to test geom2ToGeometries will add alpha channel
    const colorChange = [
        [1, 0, 0, 1],
        [1, 0.5, 0],
        [1, 0, 1],
        [0, 1, 0],
        [0, 0, 0.7]
    ]
    star2D.outlines.forEach((outline, i) => {
        outline.color = colorChange[i % colorChange.length]
    })

    return [star2D, line2D, transpCube, ...logo]
}
// HACK... export the results of the design to global space
window.shapes = main()
