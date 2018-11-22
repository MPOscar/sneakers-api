const repository = require('src/infra/repositories/release')
const { Release } = require('src/domain/release')

const attrs = ['id', 'name', 'description', 'style', 'sku', 'hot', 'children', 'price', 'gender', 'color', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Release, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
