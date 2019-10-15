const OfferRepository = require('src/infra/repositories/offer')
const { Offer } = require('src/domain/offer')

const attrs = ['id', 'priceEUR', 'priceGBP', 'priceUSD', 'salePercentage', 'releaseId', 'shopId', 'status', 'shipping', 'offerDate', 'raffle', 'raffleStart', 'raffleEnd', 'releaseTime', 'displayWhatsNew', 'displayOnSale', 'createdAt', 'updatedAt']


const updateUseCase = require('./update')
const createUseCase = require('./create')

const {
  getOneUseCase,
  // createUseCase,
  getAllUseCase,
  removeUseCase
} = require('src/app/crud')(OfferRepository, Offer, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
