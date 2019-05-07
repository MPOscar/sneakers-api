const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.layouts
const {
  map,
  unmap,
  mapHeading,
  unmapHeading
} = require('./mapper')
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')

const {
  createOurPartnersTab,
  getOurPartnersTabs,
  updateOurPartnersTab,
  deleteOurPartnersTab
} = require('./ourpartners')(database)

const {
  getSlider,
  updateSlider
} = require('./slider')(database)

const {
  getHeader,
  updateHeader
} = require('./header')(database)

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

module.exports = {
  getByPage,
  updatePage,
  updateHeading,
  getHeading,
  updateHeader,
  getHeader,
  updateSlider,
  getSlider,
  createOurPartnersTab,
  getOurPartnersTabs,
  updateOurPartnersTab,
  deleteOurPartnersTab
}
