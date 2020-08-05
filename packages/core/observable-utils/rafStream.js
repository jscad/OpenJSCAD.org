// taken from https://github.com/briancavalier/most-behavior/blob/2888b2b69fe2c8e44617c611eb5fdaf512d52007/src/animationFrames.js
const { Stream } = require('../../../../core/observable-utils/most-subject/node_modules/most')
const { create } = require('@most/create')

const animationFrames = () => new Stream(new AnimationFramesSource())

const recurse = (cancel, schedule) => (sink, scheduler) => {
  const canceler = new Cancel(cancel)
  const onNext = (x) => {
    sink.event(scheduler.now(), x)
    cancel.key = schedule(onNext)
  }
  cancel.key = schedule(onNext)

  return canceler
}

const _animationFrames = recurse(cancelAnimationFrame, requestAnimationFrame)

class AnimationFramesSource {
  run (sink, scheduler) {
    return _animationFrames(sink, scheduler)
  }
}

class Cancel {
  constructor (cancel) {
    this.cancel = cancel
    this.key = undefined
  }

  dispose () {
    this.cancel(this.key)
  }
}

/* alternative version */
const rafStream = () => {
  const stream = create((add, end, error) => {
    const step = (timestamp) => {
      add(null)
      window.requestAnimationFrame(step)
    }
    window.requestAnimationFrame(step)
  })
  return stream
}

module.exports = { rafStream, animationFrames }
