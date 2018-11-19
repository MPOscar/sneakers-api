const repository = require('src/infra/repositories/brand')
const { Brand } = require('src/domain/brand')

const attrs = ['id', 'name', 'imgUrl', 'description']

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Brand, attrs)

module.exports = {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
