const most = require('most')

const makeOutput = ({sources}) => {
  return most.mergeArray([
    most.just({type: 'getAvailableLanguages'})
      .concat(
        most.just({type: 'getDefaultLocale'})
      ),
    sources.state$
      .map(state => state.locale)
      .skipRepeats()
      .map(data => ({type: 'changeSettings', data}))
  ])
}
module.exports = makeOutput
