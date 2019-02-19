const { Shop, ShopImage } = require('src/domain/shop')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.shops
const imageModel = database.models.shop_images
const workingHoursModel = database.models.shop_working_hours
const countriesRepository = require('./countries_repository')

const createOptions = {
  include: [{
    model: workingHoursModel,
    as: 'workingHours'
  }]
}
const updateOptions = createOptions
const getOptionsCallback = (params) => {
  return {
    include: [{
      model: workingHoursModel,
      as: 'workingHours',
      attributes: ['dayOfWeek', 'openHour', 'closeHour'],
      order: [['dayOfWeek', 'ASC']]
    }]
  }
}

const {
  update,
  getAll,
  destroy,
  getById,
  create,
  destroyAll,
  bulkCreate
} = BaseRepository(model, Shop, { createOptions, updateOptions, getOptionsCallback })

const createImages = async (id, images) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const newImages = await imageModel.bulkCreate(images)
  await release.addImages(newImages)
  return newImages
}

const updateWorkingHours = async (id, workingHours) => {
  const shop = await model.findOne({
    where: { id }
  })
  if (!shop) {
    throw new EntityNotFound()
  }
  const newWorkingHours = await workingHoursModel.bulkCreate(workingHours)
  await shop.setWorkingHours(newWorkingHours)
  return newWorkingHours
}

const getAllImages = async (id) => {
  const shop = await model.findOne({
    where: { id }
  })
  if (!shop) {
    throw new EntityNotFound()
  }
  const images = shop.getImages()
  if (!images) {
    return []
  }
  return images.map((data) => {
    const { dataValues } = data
    return ShopImage(dataValues)
  })
}

const getCountries = async () => {
  return countriesRepository.getCountries()
}

const destroyImage = (id) => imageModel.destroy({ where: { id } })

module.exports = {
  getAllImages,
  createImages,
  destroyImage,
  updateWorkingHours,
  update,
  getAll,
  destroy,
  getById,
  create,
  destroyAll,
  bulkCreate,
  getCountries
}
