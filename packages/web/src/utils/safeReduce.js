
const safeReduce = (state, reducer, input) => {
  try {
    return reducer(state, input)
  } catch (error) {
    return Object.assign({error})
  }
}
