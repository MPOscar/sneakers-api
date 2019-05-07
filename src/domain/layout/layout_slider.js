const t = require('tcomb')
const LayoutSlide = require('./layout_slides')

const LayoutSlider = t.struct({
  slides: t.maybe(t.list(LayoutSlide)),
  display: t.enums.of(['top', 'middle', 'bottom'])
}, {
  defaultProps: {
    display: 'top'
  }
})

module.exports = LayoutSlider
