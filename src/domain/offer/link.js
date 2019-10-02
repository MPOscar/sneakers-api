const t = require('tcomb')
const { makeEntity } = require('../helper')

const Link = t.struct({
  text: t.String,
  url: t.String,
}, {
  defaultProps: {
  }
})

module.exports = Link
