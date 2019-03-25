const t = require('tcomb')
const BlogImage = require('./blog_image')
const Entity = require('../entity')

const Blog = t.struct({
  title: t.String,
  brandId: t.maybe(t.String),
  body: t.String,
  author: t.maybe(t.String),
  type: t.enums.of(['Article', 'Focus']),
  imgUrl: t.maybe(t.String),
  images: t.maybe(t.list(Entity.extend(BlogImage)))
}, {
  defaultProps: {
    type: 'Article',
    body: '',
    images: []
  }
})

module.exports = Blog
