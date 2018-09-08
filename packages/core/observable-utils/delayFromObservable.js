const most = require('most')

/*
 instead of delaying by a hard coded value, delay based on value from a hot
 observable (ie state)
 if you have multiple consecute signals within the specified delay
 the latest one cancels the previous
*/
const delayFromObservable = (mapper, stateStream) => {
  const combiner = (delay, data) => {
    return most.just(data).delay(delay)
  }
  // we extract the required delay from the stateStream
  const delayTime$ = stateStream.map(mapper)

  return stream => {
    // switchlatest ensures that if we have multiple consecute signals within the specified delay
    // the latest one cancels the previous
    return most.combine(combiner, delayTime$, stream).switchLatest()
  }
}

module.exports = delayFromObservable
