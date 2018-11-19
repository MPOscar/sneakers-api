const repository = require('src/infra/repositories/shop')
const { Shop } = require('src/domain/shop')

const attrs = ['id', 'name']

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Shop, attrs)

module.exports = {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
