const OfferRepository = require('src/infra/repositories/offer')
const { Offer } = require('src/domain/offer')

const create = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const domain = Offer(body)
        if(!domain.raffle) {
          domain.raffleStart = null;
          domain.raffleEnd = null;
        } else {
          domain.releaseTime = null;
        }
        let offer = await OfferRepository.create(domain)
        await OfferRepository.setShops(offer.id, domain.shops)
        resolve(domain)
      } catch (error) {
        reject(error)
      }
    })
  }

  module.exports = { create }