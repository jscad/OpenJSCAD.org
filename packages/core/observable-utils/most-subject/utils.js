function tryEvent (time, value, sink) {
  try {
    sink.event(time, value)
  } catch (err) {
    sink.error(time, err)
  }
}

function tryEnd (time, value, sink) {
  try {
    sink.end(time, value)
  } catch (err) {
    sink.error(time, err)
  }
}
module.exports = {tryEvent, tryEnd}