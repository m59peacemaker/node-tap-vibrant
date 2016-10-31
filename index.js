const parser = require('tap_parser')
const duplex = require('duplexer')
const {obj: through} = require('throo')
const formatters = require('./lib/formatters-spaced')

const format = () => {
  let lastType
  const stream = through((push, chunk, enc, cb) => {
    if (!chunk.value.trim().length) { return cb() } // skip empty lines
    const formatted = formatters[chunk.type](chunk)
    let output = formatted + '\n'
    if (lastType === 'diagnostic' && chunk.type !== 'diagnostic') {
      output = '\n' + output
    }
    lastType = chunk.type
    push(output)
    cb()
  })
  return stream
}

const vibrant = () => {
  const parserStream = parser()
  const formattedStream = parserStream
    .pipe(format())
  return duplex(parserStream, formattedStream)
}

vibrant.format = format

module.exports = vibrant
