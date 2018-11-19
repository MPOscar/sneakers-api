const t = require('tcomb')
const { makeEntity } = require('../helper')

const Brand = makeEntity(t.struct({
  name: t.String,
  description: t.String,
  imgUrl: t.String
}))

module.exports = Brand
