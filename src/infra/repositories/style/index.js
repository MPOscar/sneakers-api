const { Style } = require('src/domain/style')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.styles

const StyleRepository = BaseRepository(model, Style)

const setShops = async (id, shops) => {
  const style = await model.findOne({
    where: { id }
  })
  if (!style) {
    throw new EntityNotFound()
  }
  await style.setShops(shops)
  return shops
}

const getShops = async (id) => {
  const style = await model.findOne({
    where: { id }
  })
  if (!style) {
    throw new EntityNotFound()
  }
  const shops = await style.getShops()
  if (!shops) {
    return []
  }
  return shops
}

Object.assign(StyleRepository, {
  getShops,
  setShops
})

module.exports = StyleRepository
