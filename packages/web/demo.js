
 /*const {create} = require('@most/create')
 const most = require('most')
 const withLatestFrom = require('./src/utils/observable-utils/withLatestFrom')
 function callBackToStream () {
   let addWrap = function () {}

   function callbackTest (externalData) {
     addWrap(externalData)
   }
   let callback = callbackTest
   const stream = create((add, end, error) => {
     addWrap = add
   })
   return {stream, callback}
 }

 const {stream, callback} = callBackToStream()
 const storeSource = callBackToStream()
 const stateFoo = callBackToStream()

 const signal$ = storeSource.stream
 const state$ = stateFoo.stream
  .multicast()

 const reducer = (x, y) => {
  // console.log('reducing for output', x, y)
   return x
 }*/

/* const withLatestFrom_ = (fn, stream) => {
  return sampleStream => {
    return most.sample(fn, sampleStream, stream, sampleStream)
  }
}

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

 const makeJscad = require('./src/index')

 const rootEl = document.createElement('div')
 document.body.appendChild(rootEl)
 rootEl.className = 'wrapper'

//
 const el1 = document.createElement('div')
 el1.className = 'jscad1'
 const jscadInst1 = makeJscad(el1, {name: 'jscad1', logging: false})
 rootEl.appendChild(el1)

//
 /* const el2 = document.createElement('div')
 el2.className = 'jscad2'
 const jscadInst2 = makeJscad(el2, {name: 'jscad2'})
 // example of setting settings
 // jscadInst2({design: {'blabla': 'bla'}})
 rootEl.appendChild(el2) */
