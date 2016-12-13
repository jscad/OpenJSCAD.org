export function saveScript (filename, source) {
  // console.log("saveScript("+filename+","+source+")")
  gMemFs[filename] = {name: filename, source}
}
