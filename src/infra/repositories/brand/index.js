const { Brand, BrandShops } = require('src/domain/brand')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.brands
const styleModel = database.models.styles
const releaseModel = database.models.releases
const brandShopsModel = database.models.brand_shops
// const Sequelize = require('sequelize')

const getOptionsCallback = (searchParams) => {
  if (searchParams.filter && searchParams.filter.popular) {
    const include = {
      model: styleModel,
      as: 'popular',
      attributes: [ 'id', 'name' ],
      include: {
        model: releaseModel,
        as: 'releases',
        attributes: [ 'id' ]
      }
    }
    delete searchParams.filter.popular
    return {
      include: [ include ],
      distinct: true
    }
  }
  return {}
}

const repository = BaseRepository(model, Brand, { getOptionsCallback })

const setShops = async (id, shops) => {
  const entity = await model.findOne({
    where: { id }
  })
  if (!entity) {
    throw new EntityNotFound()
  }
  let shopsDb = await brandShopsModel.bulkCreate(mapBrandShops(shops))
  await entity.setShops(shopsDb)
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
  return mapBrandShops(shops)
}

const mapBrandShops = (shops) => {
  return shops.map(shop => BrandShops(shop))
}

Object.assign(repository, {
  getShops,
  setShops
})

module.exports = repository
