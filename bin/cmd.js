#!/usr/bin/env node

const exitCode = require('tap-exit-code')
const vibrant = require('../')

process.stdin
  .pipe(exitCode())
  .pipe(vibrant())
  .pipe(process.stdout)
