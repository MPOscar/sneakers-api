const { Offer } = require('src/domain/offer')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const releasesModel = database.models.releases
const styleModel = database.models.styles
const Sequelize = require('sequelize')
const Op = Sequelize.Op

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
  } ],
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

const OfferRepository = BaseRepository(database.models.offers, Offer, { getOptions, filterMappings })

module.exports = OfferRepository
