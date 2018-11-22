const t = require('tcomb')

const ReleaseImage = t.struct({
  id: t.String,
  fileName: t.maybe(t.String),
  uploadUrl: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  isMain: t.Boolean
})

module.exports = ReleaseImage
