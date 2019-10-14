const { Shop } = require('src/domain/shop')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.shops
const workingHoursModel = database.models.shop_working_hours
const brandsModel = database.models.brands
const categoriesModel = database.models.categories
const countriesRepository = require('./countries_repository')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
      attributes: ['dayOfWeek', 'openHour', 'closeHour', 'offWork'],
      order: [['dayOfWeek', 'ASC']]
    }, {
      model: brandsModel,
      as: 'brands'
    }, {
      model: categoriesModel,
      as: 'categories'
    }]
  }
}

const filterMappings = {
  hasParent: (value) => {
    if (parseInt(value) === 1) {
      return {
        filter: { parent: { [Op.ne]: null } }
      }
    }
    return {
      filter: { parent: null }
    }
  }
}

const associatedIds = ['brands', 'categories']

const {
  update,
  getAll,
  destroy,
  getById,
  create,
  destroyAll,
  bulkCreate
} = BaseRepository(model, Shop, {
  createOptions,
  updateOptions,
  getOptionsCallback,
  associatedIds,
  filterMappings
})

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

const updateBrands = async (id, brands, shop = null) => {
  if (shop === null) {
    shop = await model.findOne({
      where: { id }
    })
  }
  if (!shop) {
    throw new EntityNotFound()
  }
  const brandsDb = await brandsModel.findAll({
    where: { id: brands }
  })
  await shop.setBrands(brandsDb)
  return shop
}

const updateCategories = async (id, categories, shop = null) => {
  if (shop === null) {
    shop = await model.findOne({
      where: { id }
    })
  }
  if (!shop) {
    throw new EntityNotFound()
  }
  const categoriesDb = await categoriesModel.findAll({
    where: { id: categories }
  })
  await shop.setCategories(categoriesDb)
  return shop
}

const getCountries = async () => {
  return countriesRepository.getCountries()
}

module.exports = {
  updateWorkingHours,
  updateBrands,
  updateCategories,
  update,
  getAll,
  destroy,
  getById,
  create,
  destroyAll,
  bulkCreate,
  getCountries
}
