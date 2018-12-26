const repository = require('src/infra/repositories/collection')

const getLinkedOffers = (id) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getOffers(id)
    ).then((offers) =>
      offers.map((offer) => offer.id)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getLinkedOffers
}
