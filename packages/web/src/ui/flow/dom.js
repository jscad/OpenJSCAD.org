const makeOutput = ({sources, extras}) => {
  return sources.state$
    .skipRepeatsWith(function (state, previousState) {
      return JSON.stringify(state) === JSON.stringify(previousState)
      // TODO: add omiting of a few complex fields like the cache , the filetree, the solids
    })
    .combine(function (state, i18n) {
      return require('../views/main')(state, i18n, extras.paramsCallbacktoStream, extras.editorCallbackToStream)
    }, sources.i18n.filter(x => x.type === 'changeSettings').map(x => x.data))
}

module.exports = makeOutput
