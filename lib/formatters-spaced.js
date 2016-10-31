const {
  version,
  plan,
  test,
  bailout,
  diagnostic,
  unknown
} = require('./formatters')

const indentLines = (str, amount = 2) => str
  .split('\n')
  .map(line => ' '.repeat(amount) + line)
  .join('\n')

const spaced = {
  version,
  plan: tap => '\n' + plan(tap),
  test: tap => indentLines(test(tap)),
  bailout,
  diagnostic: tap => '\n' + diagnostic(tap),
  unknown: tap => indentLines(unknown(tap))
}

module.exports = spaced
