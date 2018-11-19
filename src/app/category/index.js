const repository = require('src/infra/repositories/category')
const { Category } = require('src/domain/category')

const attrs = ['id', 'name']

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Category, attrs)

module.exports = {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
