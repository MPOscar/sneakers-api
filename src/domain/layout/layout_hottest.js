const t = require('tcomb')

const hottestFilter = t.struct(
  {
    type: t.enums.of(['brand', 'collection', 'offer']),
    value: t.String
  }
)

const Layout = t.struct({
  filters: hottestFilter
}, {
  defaultProps: {
    filters: []
  }
})

module.exports = Layout
