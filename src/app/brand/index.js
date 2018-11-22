const repository = require('src/infra/repositories/brand')
const { Brand } = require('src/domain/brand')

const attrs = ['id', 'name', 'imgUrl', 'description']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Brand, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
