const t = require('tcomb')
const { makeEntity } = require('../helper')

const Category = makeEntity(t.struct({
  name: t.String,
  description: t.maybe(t.String),
  imgUrl: t.maybe(t.String)
}))

module.exports = Category
