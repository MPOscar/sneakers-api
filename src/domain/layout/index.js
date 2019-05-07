const { makeEntity } = require('../helper')

const Layout = makeEntity(require('./layout'))
const LayoutSlider = makeEntity(require('./layout_slider'))
const LayoutSlide = makeEntity(require('./layout_slides'))
const LayoutHeading = makeEntity(require('./layout_heading'))
const LayoutHeader = makeEntity(require('./layout_header'))
const LayoutHottest = makeEntity(require('./layout_hottest'))

module.exports = { Layout, LayoutSlider, LayoutHeading, LayoutHeader, LayoutHottest, LayoutSlide }
