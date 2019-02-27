const t = require('tcomb')

const Setting = t.struct({
  name: t.String,
  value: t.maybe(t.String)
})

module.exports = Setting
