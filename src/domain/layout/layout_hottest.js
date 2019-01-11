const t = require('tcomb')

const Layout = t.struct({
  filters: t.maybe(t.Object)
}, {
  defaultProps: {
    manualImages: []
  }
})

module.exports = Layout
