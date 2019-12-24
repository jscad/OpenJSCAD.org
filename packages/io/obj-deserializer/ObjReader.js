/*
## License

Copyright (c) 2019 Z3 Development https://github.com/z3dev

All code released under MIT license

*/

// OBJ reader to emit commands of interest to handlers

/**
 * Class ObjReader
 * A class to hold state while reading OBJ formatted data.
 * @param {Object} [options] - options for parsing
 * @param {Boolean} [options.track=true] - track position for error reporting
 * @param {Boolean} [options.strict=false] - obey strict OBJ specifications
 * @constructor
 *
 * @example
 * const objPath = path.resolve(__dirname, 'circle10.obj')
 * let src = fs.readFileSync(objPath, 'UTF8')
 * let reader = obj.reader({track: true})
 * // setup state handling
 * reader.on('error', handleError)
 * reader.on('start', handleStart)
 * reader.on('end'  , handleEnd)
 * // setup handling for commands of interest, skip the rest
 * reader.absorb('g', handleEntity)
 * // start the reader
 * reader.write(src).close()
 */
function ObjReader (options) {
  let reader = this
  reader.options = options || {}

  reader.trackPosition = (reader.options.track !== false)
  if (reader.trackPosition) {
    reader.line = reader.column = reader.c = 0
  }
}

ObjReader.prototype = {
// set a handler for the given state
  on: function (state, callback) {
  // verify the state
  // set the callback
    let reader = this
    reader['on' + state] = callback
  },

  // set a handler for the given command and values
  absorb: function (command, callback) {
    if (this.absorbers === undefined) {
      this.absorbers = new Map()
    }
    this.absorbers.set(command, callback)
  },

  // write the given data into the reader, initiating parsing
  write: function (data) {
    let reader = this
    parse(reader, data)
    return reader
  },

  // close and clear all state
  close: function () {
    let reader = this
    reader.isclosed = true
    return reader
  }
}

//
// emit the command (code and values) to asorbers
//
const emitcommand = (reader, command, values) => {
  // emit this command to all listeners
  if (reader.absorbers !== undefined) {
    let absorber = reader.absorbers.get(command)
    if (absorber !== undefined) {
      absorber(reader, command, values)
    }
  }
}

//
// wrap and emit the given error to the onerror handler if any
//
const emiterror = (reader, er) => {
  if (reader.trackPosition) {
    er += `
line: ${reader.line}
column: ${reader.column}
char: ${reader.c}`
  }
  er = new Error(er)
  reader.error = er
  return emitstate(reader, 'onerror', er)
}

//
// emit the end of processing to the onend handler if any
//
const emitend = (reader) => emitstate(reader, 'onend', reader.data)

const emitstate = (reader, state, data) => {
  let onhandler = state.toString()
  reader[onhandler] && reader[onhandler](reader, data)
  return reader
}

//
// parse the given data in the context of the given reader
//
const parse = (reader, data) => {
// check reader state
  if (reader.error) {
    throw reader.error // throw the last error
  }
  if (reader.isclosed) {
    return emiterror(reader, 'Cannot write after close')
  }

  // emit the start of processing to the onstart handler if any
  emitstate(reader, 'onstart', reader.data)

  if (data === null) {
    return emitend(reader)
  }

  // initial state to initiate parsing
  reader.command = null
  reader.values = null
  reader.error = null

  reader.position = 0
  reader.line = 0
  reader.column = 0

  // use or convert the data to String
  let i = 0
  let c = ''
  let l = ''
  while (reader.error === null) {
    c = charAt(data, i++)
    if (!c) {
      break
    }
    if (reader.trackPosition) {
      reader.position++
      if (c === '\n') {
        reader.line++
        reader.column = 0
      } else {
        reader.column++
      }
    }
    // obj files are parsed line by line
    if (c === '\n') {
      parseLine(reader, l)
      l = ''
    } else {
      l += c
    }
  }
  // emit state change
  emitend(reader)
  return reader
}

//
// parse the given line in the context of the given reader, emitting command / values
//
const parseLine = (reader, line) => {
  line = line.trim()
  if (line && line.length > 0) {
    setObjCommand(reader, line)
    setObjValues(reader, line)

    // emit events for command and values
    if (reader.command !== null) {
      emitcommand(reader, reader.command, reader.values)
    }
  }

  reader.command = null
  reader.values = null
}

//
// parse the given line in the context of the given reader, and update the command
//
const setObjCommand = (reader, line) => {
  // commands are alpha, and left justified
  let code = line.match(/^\S+/)
  if (code && code.length > 0) {
    reader.command = code[0]
  } else {
    emiterror(reader, 'Invalid command (int)')
    reader.command = null
  }
}

//
// parse the given line in the context of the given reader, and update the values
//
const setObjValues = (reader, line) => {
  // Note: some commands do not have values
  let values = line.match(/\S+/g)
  if (values && values.length > 1) {
    values = values.slice(1)
    if (reader.options.strict) {
      if (reader.command && reader.command === '#') {
        reader.values = values.join(' ') // comment line
      } else {
        reader.values = values
      }
    } else {
      reader.values = values
    }
  }
}

//
// helper function to return expected values
//
const charAt = (data, i) => {
  if (data && data.length > i) {
    return data.charAt(i)
  }
  return ''
}

module.exports = ObjReader
