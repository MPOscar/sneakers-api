const t = require('tcomb')
const ReleaseImage = require('./release_image')

const Release = t.struct({
  sku: t.String,
  name: t.String,
  description: t.String,
  images: t.maybe(t.list(ReleaseImage)),
  releaseDate: t.maybe(t.Date),
  color: t.String,
  hot: t.Boolean,
  children: t.maybe(t.Boolean),
  price: t.Number,
  gender: t.maybe(t.String)
})

module.exports = Release
