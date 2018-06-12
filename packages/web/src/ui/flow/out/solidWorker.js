const makeOutput = ({sources}) => {
  const requestSolidRecompute$ = sources.state$
    .filter(state => state.design.mainPath !== '')
    .map(state => state.design)
    .skipRepeatsWith(function (state, previousState) {
      const sameParameterValues = JSON.stringify(state.parameterValues) === JSON.stringify(previousState.parameterValues)
      // FIXME: do more than just check source !! if there is a change in any file (require tree)
      // it should recompute
      const sameSource = JSON.stringify(state.source) === JSON.stringify(previousState.source)
      const sameMainPath = JSON.stringify(state.mainPath) === JSON.stringify(previousState.mainPath)
      const sameFiles = JSON.stringify(state.filesAndFolders) === JSON.stringify(previousState.filesAndFolders)
      return sameParameterValues && sameSource && sameMainPath && sameFiles
    })
    .map(function (design) {
      const {source, mainPath, parameterValues, filesAndFolders} = design
      const options = {vtreeMode: design.vtreeMode, lookup: design.lookup, lookupCounts: design.lookupCounts}

      return {cmd: 'generate', source, mainPath, parameterValuesOverride: parameterValues, options, filesAndFolders}
    })
  return requestSolidRecompute$
}

module.exports = makeOutput
