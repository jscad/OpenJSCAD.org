const makeOutput = ({sources, extras}) => {
  return sources.state
    .filter(state => state.design && state.languages && state.viewer)
    .skipRepeatsWith(function (state, previousState) {
      return JSON.stringify(state) === JSON.stringify(previousState)
      // TODO: add omiting of a few complex fields like the cache , the filetree, the solids
    })
    // .tap(state => console.log('state', state))
    .combine(function (state, i18n) {
      return require('../views/main')(state, i18n, extras.paramsCallbacktoStream, extras.editorCallbackToStream)
    }, sources.i18n.filter(x => x.type === 'changeSettings').map(x => x.data))
}

module.exports = makeOutput
