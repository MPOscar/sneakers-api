const { makeEntity } = require('../helper')

const Offer = makeEntity(require('./offer'))
const ShopOffer = makeEntity(require('./shop_offer'))
const Link = makeEntity(require('./link'))

module.exports = { Offer, ShopOffer, Link }
