const defaultScheduler = require('most/lib/scheduler/defaultScheduler').default
const {MulticastSource} = require('@most/multicast')

function SubjectSource () {
  this.scheduler = defaultScheduler
  this.sinks = []
  this.active = true
}

// Source methods
SubjectSource.prototype.run = function (sink, scheduler) {
  const n = this.add(sink)
  if (n === 1) { this.scheduler = scheduler }
  return new SubjectDisposable(this, sink)
}

SubjectSource.prototype._dispose = function dispose () {
  this.active = false
}

// Subject methods
SubjectSource.prototype.next = function next (value) {
  if (!this.active) { return }
  this._next(this.scheduler.now(), value)
}

SubjectSource.prototype.error = function error (err) {
  if (!this.active) { return }

  this.active = false
  this._error(this.scheduler.now(), err)
}

SubjectSource.prototype.complete = function complete (value) {
  if (!this.active) { return }

  this.active = false
  this._complete(this.scheduler.now(), value, this.sink)
}

// Multicasting methods
SubjectSource.prototype.add = MulticastSource.prototype.add
SubjectSource.prototype.remove = MulticastSource.prototype.remove
SubjectSource.prototype._next = MulticastSource.prototype.event
SubjectSource.prototype._complete = MulticastSource.prototype.end
SubjectSource.prototype._error = MulticastSource.prototype.error

// SubjectDisposable
function SubjectDisposable (source, sink) {
  this.source = source
  this.sink = sink
  this.disposed = false
}

SubjectDisposable.prototype.dispose = function () {
  if (this.disposed) { return }
  this.disposed = true
  const remaining = this.source.remove(this.sink)
  return remaining === 0 && this.source._dispose()
}
module.exports = {SubjectSource}