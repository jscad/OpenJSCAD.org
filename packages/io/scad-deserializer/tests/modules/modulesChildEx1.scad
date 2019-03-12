module lineup(num, space) {
  for (i = [0 : num-1])
    translate([ space*i, 0, 0 ]) child(0);
}

lineup(2, 65) sphere(30);