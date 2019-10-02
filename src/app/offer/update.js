const OfferRepository = require('src/infra/repositories/offer')
const { Offer } = require('src/domain/offer')

const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const domain = Offer(body)
        if(!domain.raffle) {
          domain.raffleStart = null;
          domain.raffleEnd = null;
        } else {
          domain.releaseTime = null;
        }
        await OfferRepository.update(domain, id)
        await OfferRepository.setShops(id, domain.shops)
        resolve(domain)
      } catch (error) {
        reject(error)
      }
    })
  }

  module.exports = { update }