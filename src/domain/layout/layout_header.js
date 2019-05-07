const t = require('tcomb')

const LayoutHeader = t.struct({
  imgUrl: t.maybe(t.String),
  link: t.maybe(t.String),
  display: t.enums.of(['top', 'middle', 'bottom'])
}, {
  defaultProps: {
    display: 'top'
  }
})

module.exports = LayoutHeader
