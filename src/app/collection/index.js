const repository = require('src/infra/repositories/collection')
const { Collection } = require('src/domain/collection')

const attrs = ['id', 'name', 'brand', 'imgUrl', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Collection, attrs)
const changeImageUrlUseCase = require('./change_image_url')

module.exports = {
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
