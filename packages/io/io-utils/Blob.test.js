const test = require('ava')

const { makeBlob } = require('./index')

const Blob = makeBlob()

test('blob constructors', (t) => {
  // default constructor
  let ablob = new Blob()
  t.is(ablob.size, 0)
  t.is(ablob.type, '')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 0)
  t.is(ablob.buffer, null)

  // empty contents
  ablob = new Blob([], { length: 50 })
  t.is(ablob.size, 0)
  t.is(ablob.type, '')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 50)
  t.not(ablob.buffer, null)
})

test('blobs of strings', (t) => {
  // no options
  let ablob = new Blob(['test'], { length: 50 })
  t.is(ablob.size, 4)
  t.is(ablob.type, '')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 50)
  t.not(ablob.buffer, null)

  // encoding
  // utf8 / utf16le / latin1 / base64 / hex / ascii
  ablob = new Blob(['1FAE', '0c8a'], { encoding: 'hex', length: 50 })
  t.is(ablob.size, 4)
  t.is(ablob.type, '')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'hex')
  t.is(ablob.length, 50)
  t.not(ablob.buffer, null)
})

test('blobs of array buffers', (t) => {
  // no options
  let ablob = new Blob([Int32Array.from('12345').buffer], { length: 50 })
  t.is(ablob.size, 20)
  t.is(ablob.type, '')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 50)
  t.not(ablob.buffer, null)

  // multiple buffers
  ablob = new Blob([Int32Array.from('12345').buffer, Int16Array.from('67890').buffer], { length: 5000 })
  t.is(ablob.size, 30)
  t.is(ablob.type, '')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 5000)
  t.not(ablob.buffer, null)
})

test('blob methods', (t) => {
  const ablob = new Blob([Int32Array.from('12345').buffer, Int16Array.from('67890').buffer], { length: 5000 })
  t.is(ablob.size, 30)

  let buffer = ablob.asBuffer()
  t.is(buffer.byteLength, 30)

  buffer = ablob.arrayBuffer()
  t.is(buffer.byteLength, 30)

  ablob.close()
  t.is(ablob.isClosed, true)
  ablob.close()
  t.is(ablob.isClosed, true)
})
