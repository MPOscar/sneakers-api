const repository = require('src/infra/repositories/release')
const { Release } = require('src/domain/release')

const createImage = ({ body }) => {
  return Promise
    .resolve()
    .then(() => {
      const domain = Release(body)
      return repository.create(domain)
    })
    .catch(error => {
      throw new Error(error)
    })
}

const attrs = ['id', 'name', 'description', 'style', 'sku', 'hot', 'children', 'price', 'gender', 'color', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Release, attrs)

const createImageUseCase = { createImage }

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  createImageUseCase
}
