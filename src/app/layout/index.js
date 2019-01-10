const repository = require('src/infra/repositories/layout')
const { Url } = require('src/domain/url')

const attrs = ['id', 'url', 'vanityUrl']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Url, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
