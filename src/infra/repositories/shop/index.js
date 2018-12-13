const { Shop, ShopImage } = require('src/domain/shop')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.shops
const imageModel = database.models.shop_images

const repository = BaseRepository(model, Shop)

const createImages = async (id, images) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const newImages = await imageModel.bulkCreate(images)
  await release.addImages(newImages)
  return newImages
}

const getAllImages = async (id) => {
  const shop = await model.findOne({
    where: { id }
  })
  if (!shop) {
    throw new EntityNotFound()
  }
  const images = shop.getImages()
  if (!images) {
    return []
  }
  return images.map((data) => {
    const { dataValues } = data
    return ShopImage(dataValues)
  })
}

const destroyImage = (id) => imageModel.destroy({ where: { id } })

Object.assign(repository, {
  getAllImages,
  createImages,
  destroyImage
})

module.exports = repository
