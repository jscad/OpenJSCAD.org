// NOTE: this is merely temporary as the echo() function will likely be deprecated soon
function main () {
  echo('hi I am outputing some text')
  return [
    sphere({r: 10, fn: 18}).translate([15, -25, 0])
  ]
}
