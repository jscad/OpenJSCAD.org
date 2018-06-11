const most = require('most')

const makeOutput = ({sources}) => {
  // const {state} = sources
  const settingsStorage = state => {
    const {themeName, design, locale, shortcuts} = state
    const {name, mainPath, vtreeMode, parameterDefinitions, parameterDefaults, parameterValues} = design
    return {
      themeName,
      locale,
      shortcuts,
      design: {
        name,
        mainPath,
        vtreeMode,
        parameters: {
          parameterDefinitions,
          parameterDefaults,
          parameterValues
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

  return most.mergeArray([
    // initial request for localstorage data
    most.just({type: 'read', target: 'settings'}),
    // output settings to local storage for saving everytime they change
    sources.state$
      .map(settingsStorage).map(data => ({type: 'write', target: 'settings', data}))
      .skipRepeatsWith((previousState, currentState) => JSON.stringify(previousState) === JSON.stringify(currentState))
      .delay(1000)// delay the first saving to avoir overwriting existing settings
  ])
}

module.exports = makeOutput
