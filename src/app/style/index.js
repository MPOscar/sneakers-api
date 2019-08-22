const repository = require('src/infra/repositories/style')
const { Style } = require('src/domain/style')

const attrs = ['id', 'name', 'description', 'parent', 'brand', 'isParent', 'createdAt', 'updatedAt']

const afterCreate = async (domain, entity) => {
  if (domain.categories) {
    await repository.setCategories(entity.id, domain.categories)
  }
}
const afterUpdate = afterCreate

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(repository, Style, attrs, { afterCreate, afterUpdate })
const linkShopsUseCase = require('./link_shops')
const getLinkedShopsUseCase = require('./get_link_shops')
const getPopularUseCase = require('./get_popular')

module.exports = {
  getLinkedShopsUseCase,
  linkShopsUseCase,
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getPopularUseCase
}
