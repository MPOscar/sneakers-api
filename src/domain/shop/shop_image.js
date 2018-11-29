const t = require('tcomb')

const ShopImage = t.struct({
  fileName: t.maybe(t.String),
  imgUrl: t.maybe(t.String)
})

module.exports = ShopImage
