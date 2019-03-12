module house(roof="flat",paint=[1,0,0]){
  color(paint)
  if(roof=="flat"){
    translate([0,-1,0])
    cube();
  } else if(roof=="pitched"){
    rotate([90,0,0])
    linear_extrude(height=1)
    polygon(points=[[0,0],[0,1],[0.5,1.5],[1,1],[1,0]],paths=[ [0,1,2,3,4] ]);
  } else if(roof=="domical"){
    translate([0,-1,0])
    union(){
      translate([0.5,0.5,1]) sphere(r=0.5,$fn=20);
      cube();   
    }
  }
}

union(){
  house();
  translate([2,0,0]) house("pitched");
  translate([4,0,0]) house("domical",[0,1,0]);
  translate([6,0,0]) house(roof="pitched",paint=[0,0,1]);
  translate([8,0,0]) house(paint=[0,0,0],roof="pitched");
  translate([10,0,0]) house(roof="domical");
  translate([12,0,0]) house(paint=[0,0.5,0.5]);
}