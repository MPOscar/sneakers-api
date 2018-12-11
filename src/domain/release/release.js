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
  color: t.String,
  hot: t.Boolean,
  children: t.maybe(t.Boolean),
  price: t.Number,
  gender: t.maybe(t.String),
  styleId: t.maybe(t.String),
  brandId: t.maybe(t.String), // gotten from style
  collectionId: t.maybe(t.String)
})

module.exports = Release
