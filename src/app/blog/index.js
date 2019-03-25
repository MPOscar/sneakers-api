const repository = require('src/infra/repositories/blog')
const { Blog } = require('src/domain/blog')

const attrs = ['id', 'title', 'body', 'type', 'brandId', 'imgUrl', 'author', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Blog, attrs)
const changeImageUrlUseCase = require('./change_image_url')
const createImageUseCase = require('./create_image')
const removeImageUseCase = require('./delete_image')
const getAllImagesUseCase = require('./getAllImages')

module.exports = {
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  createImageUseCase,
  removeImageUseCase,
  getAllImagesUseCase
}
