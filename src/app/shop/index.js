const repository = require('src/infra/repositories/shop')
const { Shop } = require('src/domain/shop')

const attrs = ['id', 'name', 'type', 'description', 'address', 'siteUrl', 'currency', 'country', 'region', 'shippingDetails', 'shippingCountries', 'countries', 'mainImage', 'trackingListBaseUrl', 'rank', 'active', 'zipCode', 'parent', 'isParent', 'showOnRegion', 'lat', 'lon', 'defaultOfferLabel', 'createdAt', 'updatedAt']

// const afterCreate = async (domain, entity) => {
//   if (domain.brands) {
//     await repository.updateBrands(entity.id, domain.brands)
//   }
//   if (domain.categories) {
//     await repository.updateCategories(entity.id, domain.categories)
//   }
// }

const {
  getOneUseCase,
  getAllUseCase,
  removeUseCase
} = require('src/app/crud')(repository, Shop, attrs/*, { afterCreate }*/)
const getCountriesUseCase = require('./get_countries')
const updateUseCase = require('./update')
const createUseCase = require('./create')
const { searchUseCase } = require('./search')(repository, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getCountriesUseCase,
  searchUseCase
}
