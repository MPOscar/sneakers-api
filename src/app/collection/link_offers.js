const repository = require('src/infra/repositories/collection')

const linkOffers = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body && body.length) {
        return repository.setOffers(id, body)
      }
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { linkOffers }
