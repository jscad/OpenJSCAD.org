const most = require('most')

const makeOutput = ({sources}) => {
  return most.mergeArray([
    sources.state$
      .map(state => state.locale)
      .skipRepeats()
      .map(data => ({type: 'changeSettings', data}))
  ])
}
module.exports = makeOutput
