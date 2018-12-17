const OfferRepository = require('src/infra/repositories/offer')
const { Offer } = require('src/domain/offer')

const attrs = ['id', 'description', 'price', 'salePercentage', 'releaseId', 'shopId', 'status', 'shipping', 'offerDate', 'raffle', 'raffleStart', 'raffleEnd', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/crud')(OfferRepository, Offer, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
