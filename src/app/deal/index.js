const repository = require('src/infra/repositories/deal')
const { Deal } = require('src/domain/deal')

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Deal)
const changeImageUrlUseCase = require('./change_image_url')

module.exports = {
  changeImageUrlUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
