export const reader = (options) => new DxfReader(options)

const STATES = [
  'start',
  'end',
  'error'
]

/**
 * Class DxfReader
 * A class to hold state while reading DXF formatted data.
 * @param {Object} [options] - options for parsing
 * @param {Boolean} [options.track=true] - track position for error reporting
 * @param {Boolean} [options.strict=false] - obey strict DXF specifications
 * @constructor
 *
 * @example
 * const dxfPath = path.resolve(__dirname, 'circle10.dxf')
 * let src = fs.readFileSync(dxfPath, 'UTF8')
 * let reader = dxf.reader({track: true})
 * // setup state handling
 * reader.on('error',handleError)
 * reader.on('start',handleStart)
 * reader.on('end'  ,handleEnd)
 * // setup handling for groups of interest, skip the rest
 * reader.absorb(0,handleEntity)
 * // start the reader
 * reader.write(src).close()
 */
export class DxfReader {
  constructor (options) {
    const defaults = {
      strict: false,
      track: true
    }
    this.options = Object.assign({ }, defaults, options)

    this.trackPosition = this.options.track
    if (this.trackPosition) {
      this.line = 0
      this.column = 0
      this.c = 0
    }
  }

  // set a handler for the given state
  // see dxf.STATES above
  on (state, callback) {
    // verify the state
    // set the callback
    this['on' + state] = callback
    return this
  }

  // set a handler for the given group and value
  absorb (group, callback) {
    if (this.absorbers === undefined) {
      this.absorbers = new Map()
    }
    this.absorbers.set(group, callback)
    return this
  }

  // write the given data into the reader, initiating parsing
  write (data) {
    parse(this, data)
    return this
  }

  // close and clear all state
  close () {
    this.isclosed = true
    return this
  }
}

//
// emit the start of processing to the onstart handler if any
//
const emitstart = (reader) => emitstate(reader, 'onstart', reader.data)

//
// emit the group (code and value) to asorbers
//
const emitgroup = (reader, group, value) => {
  // emit this group to all listeners
  if (reader.absorbers !== undefined) {
    const absorber = reader.absorbers.get(group)
    if (absorber !== undefined) {
      absorber(reader, group, value)
    }
  }
}

//
// wrap and emit the given error to the onerror handler if any
//
const emiterror = (reader, er) => {
  // closeText(reader)
  if (reader.trackPosition) {
    er += `
Line: ${reader.line}
Column: ${reader.column}
Char: ${reader.c}`
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
  const onhandler = state.toString()
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

  emitstart(reader)

  if (data === null) {
    return emitend(reader)
  }

  // initial state to initiate parsing
  reader.group = null
  reader.value = null
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
    // dxf files are parsed line by line
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

/**
 * Parse the given line in the context of the given reader, emitting group value pairs
 * @param reader {DxfReader} - context DxfReader to use
 * @param line {String} - line to parse
 */
const parseLine = (reader, line) => {
  line = line.trim()
  if (reader.group === null) {
    setDxfGroup(reader, line)
    reader.value = null
  } else {
    setDxfValue(reader, line)
  }
  // handle group and value pairs
  if (reader.group !== null && reader.value !== null) {
    // emit events for group and value pairs
    emitgroup(reader, reader.group, reader.value)

    reader.group = null
    reader.value = null
  }
}

/**
 * Parse the given line in the context of the given reader, and update the group
 * @param reader {DxfReader} - context DxfReader to use
 * @param line {String} - line to parse
 */
const setDxfGroup = (reader, line) => {
// groups are numeric
  const code = parseInt(line)
  if (isNaN(code)) {
    emiterror(reader, 'Invalid group (int)')
    reader.group = null
  } else {
    reader.group = code
  }
}

/**
 * Parse the given line in the context of the given reader, and update the (group) value
 * @param reader {DxfReader} - context DxfReader to use
 * @param line {String} - line to parse
 */
const setDxfValue = (reader, line) => {
  if (reader.options.strict) {
    // TODO evaluate the value based on DXF specifications
    reader.value = line
  } else {
    reader.value = line
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
