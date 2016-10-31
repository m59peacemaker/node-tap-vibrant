const format = require('chalk')
const symbols = require('figures')

const defaultDesc = '(unnamed assert)'

const testFail = tap => {
  const title = [symbols.cross, tap.parsed.point, (tap.parsed.description || defaultDesc)]
    .filter(v => v !== undefined)
    .join(' ')
  const divider = '-'.repeat(title.length)
  const parts = [format.red(title)]
  if (tap.parsed.document) {
    const doc = tap.value.split('\n').slice(2, -1)
      .map(line => `  ${line.trim()}`)
      .join('\n')
    parts.push(
      format.red(divider),
      format.cyan.dim(doc)
    )
  }
  return parts.join('\n')
}

const testPass = tap => {
  const check = format.green(symbols.tick)
  const name = format.dim(`${tap.parsed.point} ${tap.parsed.description || defaultDesc}`)
  return `${check} ${name}`
}

const version = tap => format.bold.cyan.dim(tap.value)
const plan = tap => format.bold.cyan.dim(tap.value)
const test = tap => tap.parsed.ok ? testPass(tap) : testFail(tap)
const bailout = tap => `${format.bold('Bail out!')} ${format.cyan.dim(tap.parsed.reason)}`
const diagnostic = tap => format.underline(tap.parsed.message)
const unknown = tap => format.yellow(tap.value)

const formatters = {
  version,
  plan,
  test,
  bailout,
  diagnostic,
  unknown
}

module.exports = formatters
