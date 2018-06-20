const most = require('most')

const actions = ({sources}) => {
  // initial request for localstorage data
  const requestReadSettings$ = most
    .just({type: 'read', target: 'settings', sink: 'store'})

  const settingsToStore = state => {
    const {themeName, design, languages, shortcuts} = state
    const {name, mainPath, vtreeMode, parameterDefinitions, parameterDefaults, parameterValues, autoReload, instantUpdate} = design
    return {
      themeName,
      locale: languages.active,
      shortcuts,
      design: {
        name,
        mainPath,
        vtreeMode,
        autoReload,
        instantUpdate,
        parameters: {
          parameterDefinitions,
          parameterDefaults,
          parameterValues
        }
      }
      /* viewer: {
        axes: {show: state.viewer.axes.show},
        grid: {show: state.viewer.grid.show}
        // autorotate: {enabled: state.viewer.controls.autoRotate.enabled}
      } */
    }
  }

  // output settings (app state) to local storage for saving everytime they change
  const requestWriteSettings$ = sources.state
      .filter(state => state.design && state.languages)
      .map(settingsToStore)
      .skipRepeatsWith((previousState, currentState) => JSON.stringify(previousState) === JSON.stringify(currentState))
      .delay(1000)// delay the first saving to avoir overwriting existing settings
      .map(data => ({type: 'write', target: 'settings', data, sink: 'store'}))

  return {requestReadSettings$, requestWriteSettings$}
}

module.exports = actions
