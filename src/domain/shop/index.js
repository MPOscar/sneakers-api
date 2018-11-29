const { makeEntity } = require('../helper')
const ShopImage = makeEntity(require('./shop_image'))
const Shop = require('./shop')

module.exports = {
  Shop,
  ShopImage
}
