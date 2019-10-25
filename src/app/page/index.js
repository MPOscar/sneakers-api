const repository = require('src/infra/repositories/page')
const { Page } = require('src/domain/page')

const attrs = ['id', 'name', 'body', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Page, attrs)

const getByNameUseCase = require('./get_by_name')

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getByNameUseCase
}
