const { Style } = require('src/domain/style')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.styles
const releaseModel = database.models.releases
const Sequelize = require('sequelize')

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

Object.assign(StyleRepository, {
  getShops,
  setShops,
  getPopularStyles
})

module.exports = StyleRepository
