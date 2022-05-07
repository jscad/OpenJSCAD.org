export function flatten (arr, entities) {
  if (entities instanceof Array) {
    entities.forEach(ent => flatten(arr, ent))
  } else {
    arr.push(entities)
  }
  return arr
}
