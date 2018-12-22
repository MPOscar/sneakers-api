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
const linkShopsUseCase = require('./link_shops')
const getLinkedShopsUseCase = require('./get_link_shops')

module.exports = {
  getLinkedShopsUseCase,
  linkShopsUseCase,
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
