const repository = require('src/infra/repositories/style')
const { Style } = require('src/domain/style')

const attrs = ['id', 'name', 'category', 'description', 'brand', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Style, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
