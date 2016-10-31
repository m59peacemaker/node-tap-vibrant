#!/usr/bin/env node

const parser = require('tap_parser')
const {obj: through} = require('throo')
const {format} = require('../')

let hasFailingTest = false
process.stdin
  .pipe(parser())
  .pipe(through((push, chunk, enc, cb) => {
    if (chunk.type === 'test' && chunk.parsed.ok === false) {
      hasFailingTest = true
    }
    push(chunk)
    cb()
  }, (push, cb) => {
    if (hasFailingTest) {
      process.on('exit', () => process.exit(1))
    }
    cb()
  }))
  .pipe(format())
  .pipe(process.stdout)
