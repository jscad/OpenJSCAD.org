// LimtiFlow by Nathan Ridley(axefrog) from https://gist.github.com/axefrog/84ec77c5f620dab5cdb7dd61e6f1df0b
function limitFlow (period) {
  return function limitFlow (stream) {
    const source = new RateLimitSource(stream.source, period)
    return new stream.constructor(source)
  }
}

class RateLimitSource {
  constructor (source, period) {
    this.source = source
    this.period = period
  }

  run (sink, scheduler) {
    return this.source.run(new RateLimitSink(this, sink, scheduler), scheduler)
  }
}

class RateLimitSink {
  constructor (source, sink, scheduler) {
    this.source = source
    this.sink = sink
    this.scheduler = scheduler
    this.nextTime = 0
    this.buffered = void 0
  }

  _run (t) {
    if (this.buffered === void 0) {
      return
    }
    const x = this.buffered
    const now = this.scheduler.now()
    const period = this.source.period
    const nextTime = this.nextTime
    this.buffered = void 0
    this.nextTime = (nextTime + period > now ? nextTime : now) + period
    this.sink.event(t, x)
  }

  event (t, x) {
    const nothingScheduled = this.buffered === void 0
    this.buffered = x
    const task = new RateLimitTask(this)
    const nextTime = this.nextTime
    if (t >= nextTime) {
      this.scheduler.asap(task)
    }
    else if (nothingScheduled) {
      const interval = this.nextTime - this.scheduler.now()
      this.scheduler.delay(interval, new RateLimitTask(this))
    }
  }

  end (t, x) {
    this._run(t)
    this.sink.end(t, x)
  }

  error (t, e) {
    this.sink.error(t, e)
  }
}

class RateLimitTask {
  constructor (sink) {
    this.sink = sink
  }

  run (t) {
    if (this.disposed) {
      return
    }
    this.sink._run(t)
  }

  error (t, e) {
    if (this.disposed) {
      return
    }
    this.sink.error(t, e)
  }

  dispose () {
    this.disposed = true
  }
}
module.exports = limitFlow