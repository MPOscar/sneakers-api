const { Layout, LayoutHeading } = require('src/domain/layout')

// Transforms layout from domain to database object
const map = (layoutDomain) => {
  const newLayoutDomain = Layout(layoutDomain)
  return {
    page: newLayoutDomain.page,
    headingJson: JSON.stringify(newLayoutDomain.heading),
    headerJson: JSON.stringify(newLayoutDomain.header),
    sliderJson: JSON.stringify(newLayoutDomain.slider),
    hottestJson: JSON.stringify(newLayoutDomain.hottest)
  }
}

// Transforms layout_slider from domain to database object
const mapHeading = (layoutHeadingDomain) => {
  return LayoutHeading(layoutHeadingDomain)
}

// Transforms layout_slider from domain to database object
const unmapHeading = (dbModel) => {
  return LayoutHeading(dbModel)
}

const unmap = (dbModel) => {
  return Layout(dbModel)
}

module.exports = {
  map,
  unmap,
  mapHeading,
  unmapHeading
}
