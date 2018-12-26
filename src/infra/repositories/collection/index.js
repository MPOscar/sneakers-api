const { Collection } = require('src/domain/collection')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { database } = container.cradle
const model = database.models.collections

const setShops = async (id, shops) => {
  const collection = await model.findOne({
    where: { id }
  })
  if (!collection) {
    throw new EntityNotFound()
  }
  await collection.setShops(shops)
  return shops
}

const getShops = async (id) => {
  const collection = await model.findOne({
    where: { id }
  })
  if (!collection) {
    throw new EntityNotFound()
  }
  const shops = await collection.getShops()
  if (!shops) {
    return []
  }
  return shops
}

const setOffers = async (id, offers) => {
  const collection = await model.findOne({
    where: { id }
  })
  if (!collection) {
    throw new EntityNotFound()
  }
  await collection.setOffers(offers)
  return offers
}

const getOffers = async (id) => {
  const collection = await model.findOne({
    where: { id }
  })
  if (!collection) {
    throw new EntityNotFound()
  }
  const offers = await collection.getOffers()
  if (!offers) {
    return []
  }
  return offers
}

const CollectionRepository = BaseRepository(model, Collection)
Object.assign(CollectionRepository, {
  getShops,
  setShops,
  getOffers,
  setOffers
})
module.exports = CollectionRepository
