const OfferRepository = require('src/infra/repositories/offer')
const { Offer } = require('src/domain/offer')

const attrs = ['id', 'description', 'priceEUR', 'priceGBP', 'priceUSD', 'salePercentage', 'releaseId', 'shopId', 'status', 'shipping', 'offerDate', 'raffle', 'raffleStart', 'raffleEnd', 'displayWhatsNew', 'createdAt', 'updatedAt']

const update = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Offer(body)
      await OfferRepository.update(domain, id)
      await OfferRepository.updateLinks(id, domain.links)
      resolve(domain)
    } catch (error) {
      reject(error)
    }
  })
}
const updateUseCase = { update }

const {
  getOneUseCase,
  createUseCase,
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
