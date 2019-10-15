const OfferRepository = require('src/infra/repositories/offer')
const { Offer } = require('src/domain/offer')

const create = ({ id, body }) => {
    if(!Array.isArray(body)) {
        body = [ body ];
    }
    return Promise.all(body.map(offer => {
        return new Promise(async (resolve, reject) => {
            try {
                const domain = Offer(offer)
                if (!domain.raffle) {
                    domain.raffleStart = null;
                    domain.raffleEnd = null;
                } else {
                    domain.releaseTime = null;
                }
                await OfferRepository.create(domain)
                // await OfferRepository.updateLinks(id, domain.links)
                resolve(domain)
            } catch (error) {
                reject(error)
            }
        })
    }))
    
}

module.exports = {
    create
}