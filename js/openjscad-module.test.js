//FIXME: tests are basic 'is the output file there' for now, actual checks are needed !!
import test from 'ava'
import path from 'path'
import fs from 'fs'

const openjscad = require('./openjscad-module')

test('compile', t => {
  const {compile} = openjscad
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath)
  console.log('script', script)

  const ir = compile(script)
  const expIr = ''
  console.log('ir', ir)
  t.deepEqual(ir, expIr)
})


test('generateOutput', t => {
  const {generateOutput} = openjscad
  const input = {}

  const output = generateOutput(input)
  const expOutput = ''
  t.deepEqual(output, expOutput)
})

test('convert', t => {
  const {convert} = openjscad
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const inputData = fs.readFileSync(inputPath)
  const expOutputData = ''
  const inputFormat = 'stl'

  const outputData = convert(inputData, inputFormat, outputFormat)
  t.deepEqual(outputData, expOutputData)
})
