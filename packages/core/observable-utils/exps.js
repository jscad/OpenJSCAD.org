
 const {create} = require('@most/create')
 const most = require('most')
 const withLatestFrom = require('./src/utils/observable-utils/withLatestFrom')
 const callBackToStream = require('./src/utils/observable-utils/callbackToObservable')

 // const {stream, callback} = callBackToStream()
 const { proxy } = require('most-proxy')
 const stateStream = proxy()
 const stateProxy$ = stateStream.stream

 const store = callBackToStream()
 const state = callBackToStream()
 const state$ = state.stream
  .multicast()

 const fooCB = callBackToStream()
 const fooSignal$ = fooCB.stream

 const barCB = callBackToStream()
 const barSignal$ = barCB.stream

 const initialState = {
   foo: false,
   bar: false
 }

 const fooReducer = (state, signal) => {
   const updated = Object.assign({}, state, {foo: signal})
   console.log('fooReducer state:', state, 'signal', signal, 'updated', updated)
   return updated
 }
 const fooCommands$ = fooSignal$
  .thru(withLatestFrom(fooReducer, stateProxy$))

 const barReducer = (state, signal) => {
   const updated = Object.assign({}, state, {bar: signal})
   console.log('barReducer state:', state, 'signal', signal, 'updated', updated)
   return updated
 }
 const barCommands$ = barSignal$
  .thru(withLatestFrom(barReducer, stateProxy$))

 const commandResponses$ = most.mergeArray([
   fooCommands$,
   barCommands$
 ])

 const realState$ = most.scan((state, input) => {
   const foo = Object.assign({}, state, input)
   return foo
 }, initialState, commandResponses$)
 stateStream.attach(realState$)

 stateProxy$.forEach(x => console.log('state', x))

// store.callback('b')
// we have pre-existing state
// a signal triggers a new value from the store
 // state.callback(initialState)
 // state.callback(2)

 fooCB.callback(true)// 'foo-a')
 barCB.callback(true)// 'bar-b')

/*
const holdUntil = (startSignal) => {
  return stream => {
    return stream.skipUntil(startSignal)
      .merge(
        startSignal.take(1).thru(withLatestFrom(x => x, stream))
      )
  }
}

const out$ = state$
  .thru(holdUntil(signal$))
  .map(reducer)
state$.skipUntil(signal$)
  .merge(
    signal$.take(1).thru(withLatestFrom(x => x, state$))
  )
  .map(reducer)
// signal$.thru(withLatestFrom(reducer, state$))
signal$.forEach(x => {
  console.log('source fired', x)
})

out$.forEach(x => {
  console.log('output fired', x)
})

state$.forEach(x => {
  console.log('state changed', x)
})

console.log('program start')
stateFoo.callback({state: 42})
stateFoo.callback({state: 'yikes'})

setTimeout(x => storeSource.callback({input: 0}), 2000)
setTimeout(x => storeSource.callback({input: 1}), 3000)
setTimeout(x => storeSource.callback({input: 2}), 4000)

setTimeout(x => stateFoo.callback({state: 'dfdfd'}), 8000)
*/
/*
 const delayFromObservable = (mapper, stateStream) => {
   const combiner = (delay, data) => {
     return most.just(data).delay(delay)
   }
   const delayTime$ = stateStream.map(mapper)

   return stream => {
     return most.combine(combiner, delayTime$, stream).switchLatest()
   }
 }

 console.log('now')
 signal$
  .thru(delayFromObservable(state => state.delay, state$))
  .forEach(x => {
    console.timeEnd(x)
    console.log('delayed output', x)
  })
 const sendSignal = (message) => {
   console.time(message)
   storeSource.callback(message)
 }
 stateFoo.callback({bla: 42, delay: 2000})

 sendSignal('a message')
 sendSignal('another message')

 setTimeout(x => sendSignal('later message'), 3000)
 setTimeout(x => sendSignal('even later message'), 6000)
*/
/* const combiner = (state, input) => {
  console.log('reducer: state', state, 'input:', input)
  return Object.assign({}, state, input)
}

const stateFoo = callBackToStream()
const state$ = stateFoo.stream
  // .startWith({state: 42})
  // .multicast()
state$.forEach(x => console.log('state update', x))

stream
  .thru(withLatestFrom(combiner, state$))
  .forEach(x => console.log('updated', x))

stateFoo.callback({state: 'gna'})

callback({input: 1})
// callback({input: 2})

setTimeout(x => stateFoo.callback({state: 'bli'}), 10)

setTimeout(x => callback({input: 3}), 100) */
