const repository = require('src/infra/repositories/shop')
const { Shop } = require('src/domain/shop')

const attrs = ['id', 'name', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Shop, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
