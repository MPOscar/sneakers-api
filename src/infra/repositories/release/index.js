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
const { SearchResult } = require('src/domain/search')
const getAll = (selectFields, searchParams) => {
  const attrs = {
    include: [{ model: releaseImageModel, as: 'images' }],
    distinct: true
  }
  Object.assign(attrs, toSequelizeSearch(selectFields, searchParams))
  return model.findAndCountAll(attrs).then((result) => {
    console.log(result.count)
    const rows = result.rows.map((data) => {
      const { dataValues } = data
      return Release(dataValues)
    })
    return SearchResult({ rows, count: result.count })
  })
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
