// title      : Transparency 2
// author     : Rene K. Mueller
// license    : MIT License
// description: showing transparent objects
// file       : transparency2.jscad

function main() {
   return [
      difference(
         sphere(2),
         union(
            cylinder({h: 6, center: true}),
            cylinder({h: 6, center: true}).rotateY(90),
            cylinder({h: 6, center: true}).rotateX(90)
         )
      ).scale(10),
      union(
         cylinder({h: 6, center: true}),
         cylinder({h: 6, center: true}).rotateY(90),
         cylinder({h: 6, center: true}).rotateX(90)
      ).scale(10).setColor(1,1,0,0.5)
   ];
}
