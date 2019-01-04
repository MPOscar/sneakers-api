const repository = require('src/infra/repositories/release')
const { Release } = require('src/domain/release')

const attrs = ['id', 'name', 'description', 'styleId', 'collectionId', 'sku', 'hot', 'children', 'price', 'gender', 'color', 'mainImage', 'releaseDate', 'customized', 'createdAt', 'updatedAt']
const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Release, attrs)
const createImageUseCase = require('./create_image')
const removeImageUseCase = require('./delete_image')
const updateMainImageUseCase = require('./change_main_image')
const getAllImagesUseCase = require('./getAllImages')

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getAllImagesUseCase,
  createImageUseCase,
  removeImageUseCase,
  updateMainImageUseCase
}
