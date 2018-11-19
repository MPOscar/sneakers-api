const repository = require('src/infra/repositories/collection')
const { Collection } = require('src/domain/collection')

const attrs = ['id', 'name', 'brand', 'updatedAt']

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Collection, attrs)

module.exports = {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
