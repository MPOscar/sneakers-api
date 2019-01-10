const t = require('tcomb')

const Layout = t.struct({
  type: t.maybe(t.String),
  url: t.maybe(t.String),
  images: t.list(t.String),
  filters: t.maybe(t.Object),
  filterLimit: t.maybe(t.Number)
}, {
  defaultProps: {
    manualImages: []
  }
})

module.exports = Layout
