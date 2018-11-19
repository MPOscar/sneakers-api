const t = require('tcomb')
const { makeEntity } = require('../helper')

const Category = makeEntity(t.struct({
  name: t.String
}))

module.exports = Category
