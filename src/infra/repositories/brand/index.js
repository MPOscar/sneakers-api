const { Brand } = require('src/domain/brand')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.brands

const repository = BaseRepository(model, Brand)

const setShops = async (id, shops) => {
  const entity = await model.findOne({
    where: { id }
  })
  if (!entity) {
    throw new EntityNotFound()
  }
  await entity.setShops(shops)
  return shops
}

const getShops = async (id) => {
  const entity = await model.findOne({
    where: { id }
  })
  if (!entity) {
    throw new EntityNotFound()
  }
  const shops = await entity.getShops()
  if (!shops) {
    return []
  }
  return shops
}

Object.assign(repository, {
  getShops,
  setShops
})

module.exports = repository
