const { Offer } = require('src/domain/offer')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const releasesModel = database.models.releases
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const getOptions = {
  include: [ { model: releasesModel, as: 'release', attributes: [ 'id', 'sku', 'collectionId' ] } ],
  distinct: true
}

const filterMappings = {
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
      filter: { price: { [Op.gte]: parseFloat(value) } }
    }
  },
  maxPrice: (value) => {
    return {
      filter: { price: { [Op.lte]: parseFloat(value) } }
    }
  }
}

const OfferRepository = BaseRepository(database.models.offers, Offer, { getOptions, filterMappings })

module.exports = OfferRepository
