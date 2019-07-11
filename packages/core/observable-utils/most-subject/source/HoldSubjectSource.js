const {SubjectSource} = require('./SubjectSource')
const {drop, append} = require('@most/prelude')

class HoldSubjectSource extends SubjectSource {
  constructor (bufferSize) {
    super()
    this.bufferSize = bufferSize
    this.buffer = []
  }

  add (sink) {
    const buffer = this.buffer
    if (buffer.length > 0) {
      pushEvents(buffer, sink)
    }
    super.add(sink)
  }

  next (value) {
    if (!this.active) { return }
    const time = this.scheduler.now()
    this.buffer = dropAndAppend({time, value}, this.buffer, this.bufferSize)
    this._next(time, value)
  }
}

function pushEvents (buffer, sink) {
  for (let i = 0; i < buffer.length; ++i) {
    const {time, value} = buffer[i]
    sink.event(time, value)
  }
}

function dropAndAppend (event, buffer, bufferSize) {
  if (buffer.length >= bufferSize) {
    return append(event, drop(1, buffer))
  }
  return append(event, buffer)
}

module.exports = {HoldSubjectSource}
