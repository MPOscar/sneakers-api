const t = require('tcomb')

const Layout = t.struct({
  displayOnPage: t.Boolean,
  display: t.enums.of(['top', 'middle', 'bottom'])
}, {
  defaultProps: {
    display: 'top',
    displayOnPage: true
  }
})

module.exports = Layout
