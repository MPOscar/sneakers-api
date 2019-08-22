const repository = require('src/infra/repositories/category')
const { Category } = require('src/domain/category')

const attrs = ['id', 'name', 'description', 'imgUrl', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Category, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
