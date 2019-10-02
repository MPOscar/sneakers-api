const t = require('tcomb')
const Link = require('./link')

const ShopOffer = t.struct({
  shopId: t.String,
  links: t.maybe(t.list(Link)),
}, {
  defaultProps: {
    links: []
  }
})

module.exports = ShopOffer
