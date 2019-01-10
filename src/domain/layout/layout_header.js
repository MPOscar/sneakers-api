const t = require('tcomb')

const Layout = t.struct({
  url: t.maybe(t.String),
  itemCount: t.maybe(t.Number),
  filters: t.maybe(t.Object)
}, {
  defaultProps: {
    manualImages: []
  }
})

module.exports = Layout
