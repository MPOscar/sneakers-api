const repository = require('src/infra/repositories/style')
const { Style } = require('src/domain/style')

const attrs = ['id', 'name', 'category', 'description', 'brand', 'updatedAt']

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Style, attrs)

module.exports = {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
