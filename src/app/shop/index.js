const repository = require('src/infra/repositories/shop')
const { Shop } = require('src/domain/shop')

const attrs = ['id', 'name', 'address', 'currency', 'country', 'region', 'shippingDetails', 'shippingCountries', 'countries', 'mainImage', 'trackingListBaseUrl', 'rank', 'active', 'zipCode', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase
} = require('src/app/crud')(repository, Shop, attrs)
const createImageUseCase = require('./create_image')
const removeImageUseCase = require('./delete_image')
const updateMainImageUseCase = require('./change_main_image')
const getAllImagesUseCase = require('./getAllImages')

const update = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Shop(body)
      await repository.update(domain, id)
      await repository.updateWorkingHours(id, domain.workingHours)
      resolve(domain)
    } catch (error) {
      reject(error)
    }
  })
}
const updateUseCase = { update }

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getAllImagesUseCase,
  createImageUseCase,
  removeImageUseCase,
  updateMainImageUseCase
}
