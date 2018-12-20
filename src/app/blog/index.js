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

module.exports = {
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
