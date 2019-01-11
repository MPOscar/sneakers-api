const map = (layoutDomain) => {
  return {
    page: layoutDomain.page,
    headingJson: JSON.stringify(layoutDomain.heading),
    headerJson: JSON.stringify(layoutDomain.header),
    sliderJson: JSON.stringify(layoutDomain.slider),
    hottestJson: JSON.stringify(layoutDomain.hottest)
  }
}

const unmap = (dbModel) => {
  return {
    page: dbModel.page,
    heading: JSON.parse(dbModel.headingJson),
    header: JSON.parse(dbModel.headerJson),
    slider: JSON.parse(dbModel.sliderJson),
    hottest: JSON.parse(dbModel.hottestJson)
  }
}

module.exports = {
  map,
  unmap
}
