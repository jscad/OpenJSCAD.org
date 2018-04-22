const most = require('most')

function makeReactions (state$, actions$, sinks) {
  const {store} = sinks

  const settingsStorage = state => {
    const {themeName, design, locale, shortcuts} = state
    const {name, mainPath, vtreeMode, paramDefinitions, paramDefaults, paramValues} = design
    return {
      themeName,
      locale,
      shortcuts,
      design: {
        name,
        mainPath,
        vtreeMode,
        parameters: {
          paramDefinitions,
          paramDefaults,
          paramValues
        }
      },
      viewer: {
        axes: {show: state.viewer.axes.show},
        grid: {show: state.viewer.grid.show}
        // autorotate: {enabled: state.viewer.controls.autoRotate.enabled}
      },
      autoReload: state.autoReload,
      instantUpdate: state.instantUpdate
    }
  }
  store(
    most.mergeArray([
      // initial request for localstorage data
      most.just({type: 'read', target: 'settings'}),
      // output settings to local storage for saving everytime they change
      state$
        .map(settingsStorage).map(data => ({type: 'write', target: 'settings', data}))
        .skipRepeatsWith((previousState, currentState) => JSON.stringify(previousState) === JSON.stringify(currentState))
        .delay(1000)// delay the first saving to avoir overwriting existing settings
    ])

  )
}

module.exports = makeReactions
