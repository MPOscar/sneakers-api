const t = require('tcomb')

const Page = t.struct({
  name: t.maybe(t.String),
  body: t.maybe(t.String)
}, {
  defaultProps: {
    body: '',
  }
})

module.exports = Page
