const { Style, StyleShops } = require('src/domain/style')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { Op } = require('sequelize')
// inject database
const { database } = container.cradle
const model = database.models.styles
const releaseModel = database.models.releases
const styleShopsModel = database.models.style_shops
const categoriesModel = database.models.categories

const getOptionsCallback = (params) => {
  return {
    include: [{
      model: categoriesModel,
      as: 'categories'
    }]
  }
}
const associatedIds = ['categories']

const StyleRepository = BaseRepository(model, Style, { getOptionsCallback, associatedIds })

const setShops = async (id, shops) => {
  const style = await model.findOne({
    where: { id }
  })
  if (!style) {
    throw new EntityNotFound()
  }
  await styleShopsModel.destroy({ 
    where: { 
      id: { 
        [Op.notIn]: shops.map(shop => shop.shopId)
      }
    }
  })

  shops.forEach(shop => {
    shop.styleId = id
  })
  
  let shopsDb = await styleShopsModel.bulkCreate(mapStyleShops(shops), {updateOnDuplicate: ['shopId', 'styleId'] })
  await style.setShops(shopsDb)
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
  return mapStyleShops(shops)
}

const getPopularStyles = async (brandId) => {
  let styles = await model.findAll({
    attributes: [ 'id', 'name' ],
    include: {
      model: releaseModel,
      as: 'releases',
      attributes: [ 'id' ]
    },
    where: { brand: brandId }
  })
  styles = styles.map((style) => {
    return {
      id: style.id,
      name: style.name,
      releaseCount: style.releases.length
    }
  })
  styles.sort((a, b) => {
    return b.releaseCount - a.releaseCount
  })
  return styles.slice(0, 5)
}

const setCategories = async (id, categories) => {
  let style = await model.findOne({
    where: { id }
  })
  if (!style) {
    throw new EntityNotFound()
  }
  const categoriesDb = await categoriesModel.findAll({
    where: { id: categories }
  })
  await style.setCategories(categoriesDb)
  return style
}

const mapStyleShops = (shops) => {
  return shops.map(shop => StyleShops(shop))
}

Object.assign(StyleRepository, {
  getShops,
  setShops,
  getPopularStyles,
  setCategories
})

module.exports = StyleRepository
