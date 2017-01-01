import fs from 'fs'
import vm from 'vm'

export default function include (scad, fn) {
  let includes = []
  // console.log(arguments.callee.caller,"include:"+fn)
  if (0) {
    // var script = vm.createScript(fs.readFileSync(fn),fn)
    // script.runInThisContext()
    var script = vm.runInThisContext(fs.readFileSync(fn), fn)
    return script
  } else if (0) {
    includes.push(fn)
  } else {
    var src = fs.readFileSync(fn, {encoding: 'utf8'})
    // console.log("include: ",src)
    var r
    try {
      r = eval(src + scad)
    } catch(e) {
      if (e instanceof SyntaxError) {
        console.log(e.message)
      }
    }
    return r
  }
}
