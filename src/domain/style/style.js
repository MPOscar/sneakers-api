const t = require('tcomb')
const { makeEntity } = require('../helper')

const Style = makeEntity(t.struct({
  name: t.String,
  description: t.maybe(t.String),
  brand: t.maybe(t.String),
  parent: t.maybe(t.String),
  isParent: t.maybe(t.Boolean),
  categories: t.list(t.String)
}, {
  defaultProps: {
    categories: [],
    isParent: false
  }
}))

module.exports = Style
