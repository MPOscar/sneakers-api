const { Release, ReleaseImage } = require('src/domain/release')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.releases
const releaseImageModel = database.models.release_images
const styleModel = database.models.styles

const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const getOptions = {
  include: [
    { model: releaseImageModel, as: 'images' },
    { model: styleModel, as: 'style', attributes: [ 'id', 'brand', 'category' ] }
  ],
  distinct: true
}

const filterMappings = {
  brandId: (value) => {
    return {
      filter: { brand: value },
      model: styleModel
    }
  },
  outdated: (value) => {
    const date = new Date(moment.utc().format('YYYY-MM-DD'))
    return {
      // with date past today and not null
      filter: { releaseDate: { [Op.lt]: date, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } }
    }
  },
  coming: (value) => {
    const date = new Date(moment.utc().format('YYYY-MM-DD'))
    return {
      filter: { releaseDate: { [Op.gte]: date, [Op.ne]: null, [Op.ne]: '0000-00-00 00:00:00' } }
    }
  },
  upcoming: (value) => {
    return {
      filter: { releaseDate: { [Op.or]: { [Op.eq]: null, [Op.eq]: '0000-00-00 00:00:00' } } }
    }
  },
  minPrice: (value) => {
    return {
      filter: { priceEUR: { [Op.gte]: value } }
    }
  },
  maxPrice: (value) => {
    return {
      filter: { priceEUR: { [Op.lte]: value } }
    }
  }
}

const repository = BaseRepository(model, Release, { getOptions, filterMappings })

/**
 * Associates images to the release
 * @param id
 * @param images
 * @returns {Promise<Array<Model>>}
 */
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

/**
 * Get all images associated with a release
 * @param id
 * @returns {Promise<*>}
 */
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

/**
 * Fetches all releases after date
 * @param date
 * @returns {Promise<*[]>}
 */
const getPastReleases = async (date) => {
  const releases = await model.findAll({
    where: { releaseDate: { [Op.lt]: date } }
  })
  return releases.map((data) => {
    return Release(data)
  })
}

/**
 * Delete image from release
 * @param id
 * @returns {*}
 */
const destroyImage = (id) => releaseImageModel.destroy({ where: { id } })

Object.assign(repository, {
  createImages,
  destroyImage,
  getAllImages,
  getPastReleases
})

module.exports = repository
