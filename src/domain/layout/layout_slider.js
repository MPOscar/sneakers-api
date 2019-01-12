const t = require('tcomb')

const image = t.struct({
  url: t.String,
  display: t.maybe(t.String)
})

const Slider = t.struct({
  url: t.maybe(t.String),
  isFiltered: t.Boolean,
  filter: t.maybe(t.Object),
  filterLimit: t.maybe(t.Number),
  images: t.list(image)
}, {
  defaultProps: {
    images: [],
    filters: [],
    isFiltered: false
  }
})

module.exports = Slider
