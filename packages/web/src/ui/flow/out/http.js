const most = require('most')

const makeOutput = ({sources, actions$}) => {
  return most.mergeArray([
    actions$.requestRemoteFile$
  ])
}

module.exports = makeOutput
