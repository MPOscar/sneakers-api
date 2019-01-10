const t = require('tcomb')
const layoutHeader = require('./layout_header')
const layoutHeading = require('./layout_heading')
const layoutSlider = require('./layout_slider')

const Layout = t.struct({
  page: t.String,
  slider: t.maybe(layoutSlider),
  header: t.maybe(layoutHeader),
  hottest: t.maybe(t.Object),
  heading: t.maybe(layoutHeading)
}, {
  defaultProps: {
  }
})

module.exports = Layout
