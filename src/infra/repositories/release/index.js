const { Release, ReleaseImage } = require('src/domain/release')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.releases
const releaseImageModel = database.models.release_images
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')

const {
  create,
  update,
  getById,
  destroy
} = BaseRepository(model, Release)

const createImages = async (id, images) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const newImages = await releaseImageModel.bulkCreate(images)
  await release.addImages(newImages)
  return newImages
}

const { toSequelizeSearch } = require('src/infra/support/sequelize_search_attrs')
const getAll = (selectFields, filter, pagination, order) => {
  const attrs = {
    include: [{ model: releaseImageModel, as: 'images' }]
  }
  Object.assign(attrs, toSequelizeSearch({ selectFields, filter, pagination, order }))
  return model.findAll(attrs).then((entities) =>
    entities.map((data) => {
      const { dataValues } = data
      return Release(dataValues)
    })
  )
}

const getAllImages = async (id) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const images = release.getImages()
  if (!images) {
    return []
  }
  return images.map((data) => {
    const { dataValues } = data
    return ReleaseImage(dataValues)
  })
}

const destroyImage = (id) => releaseImageModel.destroy({ where: { id } })

module.exports = {
  create,
  update,
  getById,
  destroy,
  getAll,
  createImages,
  destroyImage,
  getAllImages
}
