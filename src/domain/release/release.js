const t = require('tcomb')
const ReleaseImage = require('./release_image')
const Entity = require('../entity')

const Release = t.struct({
  sku: t.String,
  name: t.String,
  description: t.String,
  images: t.maybe(t.list(Entity.extend(ReleaseImage))),
  mainImage: t.maybe(t.String),
  releaseDate: t.maybe(t.Date),
  color: t.maybe(t.String),
  hot: t.Boolean,
  hiddenDashboard: t.maybe(t.Boolean),
  customized: t.Boolean,
  currency: t.maybe(t.String),
  children: t.maybe(t.Boolean),
  priceUSD: t.Number,
  priceGBP: t.Number,
  priceEUR: t.Number,
  gender: t.maybe(t.String),
  styleId: t.maybe(t.String),
  brandId: t.maybe(t.String), // gotten from style
  collectionId: t.maybe(t.String),
  status: t.maybe(t.String) // gotten from offer
}, {
  defaultProps: {
    hiddenDashboard: false,
    customized: false,
    description: '',
    hot: false,
    priceUSD: 0,
    priceGBP: 0,
    priceEUR: 0
  }
})

module.exports = Release
