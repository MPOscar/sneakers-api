const { Layout, LayoutSlider, LayoutHeading, LayoutHeader } = require('src/domain/layout')

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
const mapSlider = (layoutSliderDomain) => {
  let newLayoutSlider = LayoutSlider(layoutSliderDomain)
  newLayoutSlider.filter = JSON.stringify(layoutSliderDomain.filter)
  return newLayoutSlider
}

// Transforms layout_slider from domain to database object
const mapHeading = (layoutHeadingDomain) => {
  return LayoutHeading(layoutHeadingDomain)
}

// Transforms layout_slider from domain to database object
const unmapHeading = (dbModel) => {
  return LayoutHeading(dbModel)
}

const mapHeader = (headerDomain) => {
  let newHeaderDomain = LayoutHeader(headerDomain)
  newHeaderDomain.headerItemsPerColumn = headerDomain.itemsPerColumn
  delete newHeaderDomain.itemsPerColumn
  if (headerDomain.columns) {
    newHeaderDomain.columns.map((column) => {
      column.filter = JSON.stringify(column.filter)
    })
  }
  return newHeaderDomain
}

// Transforms layout_slider from domain to database object
const unmapHeader = (dbModel) => {
  let headerDomain = Object.create(dbModel)
  headerDomain.itemsPerColumn = headerDomain.headerItemsPerColumn
  delete headerDomain.headerItemsPerColumn
  headerDomain.columns.map((column) => {
    column.filter = JSON.parse(column.filter)
  })
  return LayoutHeader(dbModel)
}

const unmapSlider = (dbModel) => {
  const sliderDomain = dbModel
  sliderDomain.filter = JSON.parse(dbModel.filter)
  return LayoutSlider(sliderDomain)
}

const unmap = (dbModel) => {
  return Layout({
    page: dbModel.page,
    heading: JSON.parse(dbModel.headingJson),
    header: JSON.parse(dbModel.headerJson),
    slider: JSON.parse(dbModel.sliderJson),
    hottest: JSON.parse(dbModel.hottestJson)
  })
}

module.exports = {
  map,
  unmap,
  mapSlider,
  unmapSlider,
  mapHeading,
  unmapHeading,
  mapHeader,
  unmapHeader
}
