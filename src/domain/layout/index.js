const { makeEntity, makeValueObject } = require('../helper')

const Layout = makeValueObject(require('./layout'))
const LayoutSlider = makeValueObject(require('./layout_slider'))
const LayoutSlide = makeValueObject(require('./layout_slides'))
const LayoutHeading = makeEntity(require('./layout_heading'))
const LayoutHeader = makeValueObject(require('./layout_header'))
const LayoutHottest = makeValueObject(require('./layout_hottest'))

module.exports = { Layout, LayoutSlider, LayoutHeading, LayoutHeader, LayoutHottest, LayoutSlide }
