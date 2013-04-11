// title: Transparency 2
// author: Rene K. Mueller
// description: showing transparent objects

function main() {
   return [
      difference(
         sphere(2),
         union(
            cylinder({h: 6, center: [true,true,true]}),
            cylinder({h: 6, center: [true,true,true]}).rotateY(90),
            cylinder({h: 6, center: [true,true,true]}).rotateX(90)
         )
      ).scale(10),
      union(
         cylinder({h: 6, center: [true,true,true]}),
         cylinder({h: 6, center: [true,true,true]}).rotateY(90),
         cylinder({h: 6, center: [true,true,true]}).rotateX(90)
      ).scale(10).setColor(1,1,0,0.5)
   ];
}


