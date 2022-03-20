const test = require('ava')

const { convertToBlob } = require('./index')

test('convert strings', (t) => {
  let ablob = convertToBlob({ data: ['test'], mimeType: 'test1' })
  t.is(ablob.size, 4)
  t.is(ablob.type, 'test1')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 4)
  t.not(ablob.buffer, null)

  ablob = convertToBlob({ data: ['1FAE', '0c8a'], mimeType: 'test2' })
  t.is(ablob.size, 8)
  t.is(ablob.type, 'test2')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 8)
  t.not(ablob.buffer, null)
})

test('convert array buffers', (t) => {
  let ablob = convertToBlob({ data: [Int32Array.from('12345').buffer], mimeType: 'test3' })
  t.is(ablob.size, 20)
  t.is(ablob.type, 'test3')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 20)
  t.not(ablob.buffer, null)

  // multiple buffers
  ablob = convertToBlob({ data: [Int32Array.from('12345').buffer, Int16Array.from('67890').buffer], mimeType: 'test4' })
  t.is(ablob.size, 30)
  t.is(ablob.type, 'test4')
  t.is(ablob.isClosed, false)
  t.is(ablob.encoding, 'utf8')
  t.is(ablob.length, 30)
  t.not(ablob.buffer, null)
})
