const { Offer } = require('src/domain/offer')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.offers
const offersLinksModel = database.models.offer_links
const releasesModel = database.models.releases
const styleModel = database.models.styles
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const createOptions = {
  include: [{
    model: offersLinksModel,
    as: 'links'
  }]
}
const updateOptions = createOptions

const getOptions = {
  include: [ {
    model: releasesModel,
    as: 'release',
    attributes: ['id', 'sku', 'collectionId', 'styleId', 'hot'],
    required: true,
    include: [ {
      model: styleModel,
      as: 'style',
      attributes: [ 'id', ['category', 'categoryId'], ['brand', 'brandId'] ],
      required: true
    } ]
  }, {
    model: offersLinksModel,
    as: 'links'
  }],
  distinct: true
}

const filterMappings = {
  brandId: (value) => {
    return {
      filter: { brand: Array.isArray(value) ? { [Op.or]: value } : value },
      model: styleModel
    }
  },
  categoryId: (value) => {
    return {
      filter: { category: Array.isArray(value) ? { [Op.or]: value } : value },
      model: styleModel
    }
  },
  sku: (value) => {
    return {
      filter: { sku: value },
      model: releasesModel
    }
  },
  collectionId: (value) => {
    return {
      filter: { collectionId: value },
      model: releasesModel
    }
  },
  minPrice: (value) => {
    return {
      filter: { priceEUR: { [Op.gte]: parseFloat(value) } }
    }
  },
  maxPrice: (value) => {
    return {
      filter: { priceEUR: { [Op.lte]: parseFloat(value) } }
    }
  }
}

const OfferRepository = BaseRepository(database.models.offers, Offer, { createOptions, updateOptions, getOptions, filterMappings })

const updateLinks = async (id, links) => {
  const offer = await model.findOne({
    where: { id }
  })
  if (!offer) {
    throw new EntityNotFound()
  }
  const newLinks = await offersLinksModel.bulkCreate(links)
  await offer.setLinks(newLinks)
  return newLinks
}

Object.assign(OfferRepository, { updateLinks })

module.exports = OfferRepository
