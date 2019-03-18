const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.layouts
const layoutSliderModel = database.models.layout_sliders
const layoutSliderImagesModel = database.models.layout_slider_images
const layoutHeaderColumnsModel = database.models.layout_header_columns
const {
  map,
  unmap,
  mapSlider,
  unmapSlider,
  mapHeading,
  unmapHeading,
  mapHeader,
  unmapHeader
} = require('./mapper')
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')

const {
  createOurPartnersTab,
  getOurPartnersTabs,
  updateOurPartnersTab,
  deleteOurPartnersTab
} = require('./ourpartners')(database)

const getByPage = async (page) => {
  let entity = await model.findOne({ where: { page: page } })
  return unmap(entity)
}

const updatePage = async (page, layout) => {
  Object.assign(layout, { page: page })
  let entity = await model.findOne({ where: { page: page } })
  if (!entity) {
    entity = await model.create(map(layout))
  } else {
    await entity.updateAttributes(map(layout))
  }
  return layout
}

const updateHeading = async (page, heading) => {
  let layoutDb = await model.findOne({ where: { page: page } })
  if (!layoutDb) {
    throw new EntityNotFound()
  }
  await layoutDb.updateAttributes(mapHeading(heading))
  return heading
}

const getHeading = async (page) => {
  let layoutDB = await model.findOne({ where: { page } })
  if (!layoutDB) {
    throw new EntityNotFound()
  }
  return unmapHeading(layoutDB)
}

const getSliderByFilter = async (filter) => {
  let sliderDB = await layoutSliderModel.findOne({ where: { filter: JSON.stringify(filter) }, include: { model: layoutSliderImagesModel, as: 'images' } })
  if (!sliderDB) {
    throw new EntityNotFound()
  }
  return unmapSlider(sliderDB)
}

const updateSlider = async (page, slider) => {
  // set filter as string
  let layoutDb = await model.findOne({ where: { page: page } })
  if (!layoutDb) {
    throw new EntityNotFound()
  }
  // set layout attributes
  let sliderDbAttrs = mapSlider(slider)
  sliderDbAttrs.layoutId = layoutDb.id
  let sliderDb = await layoutSliderModel.findOne({ where: { filter: sliderDbAttrs.filter } })
  // create or update sider in database
  if (!sliderDb) {
    sliderDb = await layoutSliderModel.create(sliderDbAttrs)
  } else {
    await sliderDb.updateAttributes(sliderDbAttrs)
  }
  if (slider.images) {
    // create and set slider images
    const newImages = await layoutSliderImagesModel.bulkCreate(slider.images)
    await sliderDb.setImages(newImages)
  }
  return slider
}

const updateHeader = async (page, header) => {
  let layoutDb = await model.findOne({ where: { page: page } })
  if (!layoutDb) {
    throw new EntityNotFound()
  }
  const mappedHeader = mapHeader(header)
  if (mappedHeader.columns) {
    // create and set slider images
    const newColumns = await layoutHeaderColumnsModel.bulkCreate(mappedHeader.columns)
    await layoutDb.setColumns(newColumns)
    await layoutDb.updateAttributes(mappedHeader)
  }
  return header
}

const getHeader = async (page) => {
  let layoutDB = await model.findOne({ where: { page }, include: { model: layoutHeaderColumnsModel, as: 'columns' } })
  console.log(JSON.stringify(layoutDB))
  if (!layoutDB) {
    throw new EntityNotFound()
  }
  return unmapHeader(layoutDB)
}

module.exports = {
  getByPage,
  updatePage,
  updateSlider,
  getSliderByFilter,
  updateHeading,
  getHeading,
  updateHeader,
  getHeader,
  createOurPartnersTab,
  getOurPartnersTabs,
  updateOurPartnersTab,
  deleteOurPartnersTab
}
