const t = require('tcomb')

const image = t.struct({
  url: t.String,
  display: t.maybe(t.String)
})

const filter = t.struct({
  key: t.String,
  value: t.String
})

const Layout = t.struct({
  url: t.maybe(t.String),
  isFiltered: t.Boolean,
  filters: t.list(filter),
  filterLimit: t.maybe(t.Number),
  images: t.list(image)
}, {
  defaultProps: {
    images: [],
    filters: [],
    isFiltered: false
  }
})

module.exports = Layout
