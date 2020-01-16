const omit = (obj, blacklist) => {
  return Object.keys(obj)
    .filter((key) => blacklist.indexOf(key) < 0)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {})
}

module.exports = { omit }
