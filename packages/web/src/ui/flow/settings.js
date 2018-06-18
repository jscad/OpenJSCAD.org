const most = require('most')

const actions = ({sources}) => {
  // initial request for localstorage data
  const requestReadSettings$ = most
    .just({type: 'read', target: 'settings', sink: 'store'})

  const settingsToStore = state => {
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

  // output settings (app state) to local storage for saving everytime they change
  const requestWriteSettings$ = sources.state
      .filter(state => state.design)
      .map(settingsToStore)
      .skipRepeatsWith((previousState, currentState) => JSON.stringify(previousState) === JSON.stringify(currentState))
      .delay(1000)// delay the first saving to avoir overwriting existing settings
      .map(data => ({type: 'write', target: 'settings', data, sink: 'store'}))

  return {requestReadSettings$, requestWriteSettings$}
}

module.exports = actions
