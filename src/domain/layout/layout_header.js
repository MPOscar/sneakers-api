const t = require('tcomb')

const Columns = t.struct(
  {
    url: t.maybe(t.String),
    name: t.maybe(t.String),
    imgUrl: t.maybe(t.String)
  }
)

const Layout = t.struct({
  url: t.maybe(t.String),
  itemsPerColumn: t.maybe(t.Number),
  filter: t.maybe(t.Object),
  columns: t.list(Columns)
}, {
  defaultProps: {
    columns: []
  }
})

module.exports = Layout
