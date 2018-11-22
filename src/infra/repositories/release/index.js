const { Release } = require('src/domain/release')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.releases
const releaseImage = database.models.release_images

const {
  create,
  update,
  getById,
  destroy
} = BaseRepository(model, Release)

const createImage = (imageDomain) => {
  releaseImage.create(imageDomain).then(({ dataValues }) => {
    return Release(dataValues)
  })
}

const getAll = (selectFields, filter = {}, pagination = {}) =>
  model.findAll({
    attributes: selectFields,
    include: [{ model: database.models.release_images, as: 'images' }]
  }).then((entities) =>
    entities.map((data) => {
      const { dataValues } = data
      return Release(dataValues)
    })
  )

module.exports = {
  create,
  update,
  getById,
  destroy,
  getAll,
  createImage
}
