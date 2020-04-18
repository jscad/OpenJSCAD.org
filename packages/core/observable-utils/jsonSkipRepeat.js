const jsonSkipRepeat = (state, previousState) => {
  return JSON.stringify(state) === JSON.stringify(previousState)
}
