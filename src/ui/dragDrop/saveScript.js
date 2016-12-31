export function saveScript (memFs, filename, source) {
  // console.log("saveScript("+filename+","+source+")")
  memFs[filename] = {name: filename, source}
  return memFs
}
