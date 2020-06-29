const makeOutput = ({ sources, extras }) => sources.state
  .filter((state) => state.design && state.languages && state.viewer)
  // TODO: add omiting of a few complex fields like the cache , the filetree, the solids
  .skipRepeatsWith((state, previousState) => JSON.stringify(state) === JSON.stringify(previousState))
  // .tap(state => console.log('state', state))
  .combine((state, i18n) => require('../views/main')(state, i18n, extras.paramsCallbacktoStream, extras.editorCallbackToStream),
    sources.i18n.filter((x) => x.type === 'changeSettings').map((x) => x.data))

module.exports = makeOutput
