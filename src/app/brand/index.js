const repository = require('src/infra/repositories/brand')
const { Brand } = require('src/domain/brand')

const attrs = ['id', 'name', 'imgUrl', 'description', 'createdAt', 'updatedAt']
const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Brand, attrs)
const changeImageUrlUseCase = require('./change_image_url')

module.exports = {
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
