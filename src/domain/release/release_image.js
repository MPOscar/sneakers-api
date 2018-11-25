const t = require('tcomb')

const ReleaseImage = t.struct({
  fileName: t.maybe(t.String),
  imgUrl: t.maybe(t.String)
})

module.exports = ReleaseImage
