const { Offer } = require('src/domain/offer')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const OfferRepository = BaseRepository(database.models.offers, Offer)

module.exports = OfferRepository
