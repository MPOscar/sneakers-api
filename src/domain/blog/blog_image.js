const t = require('tcomb')

const BlogImage = t.struct({
  fileName: t.maybe(t.String),
  imgUrl: t.maybe(t.String)
})

module.exports = BlogImage
