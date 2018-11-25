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

const createImage = async (id, imageDomain) => {
  const release = await model.findOne({
    where: { id }
  })
  if (!release) {
    throw new EntityNotFound()
  }
  const newImage = await releaseImageModel.create(imageDomain)
  await release.addImage(newImage)
  return ReleaseImage(newImage)
}

const getAll = (selectFields, filter = {}, pagination = {}, order = {}) =>
  model.findAll({
    attributes: selectFields,
    include: [{ model: database.models.release_images, as: 'images' }],
    offset: pagination.offset || 0,
    limit: pagination.limit || 1000000,
    order: [[ order.field || 'createdAt', order.type || 'DESC' ]]
  }).then((entities) =>
    entities.map((data) => {
      const { dataValues } = data
      return Release(dataValues)
    })
  )

const destroyImage = (id) => releaseImageModel.destroy({ where: { id } })

module.exports = {
  create,
  update,
  getById,
  destroy,
  getAll,
  createImage,
  destroyImage
}
