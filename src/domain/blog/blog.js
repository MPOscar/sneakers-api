const t = require('tcomb')

const Blog = t.struct({
  title: t.String,
  brandId: t.maybe(t.String),
  body: t.String,
  author: t.maybe(t.String),
  type: t.enums.of(['Article', 'Focus']),
  imgUrl: t.maybe(t.String)
}, {
  defaultProps: {
    type: 'Article',
    body: ''
  }
})

module.exports = Blog
