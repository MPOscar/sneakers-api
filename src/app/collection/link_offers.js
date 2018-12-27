const repository = require('src/infra/repositories/collection')

const linkOffers = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body) {
        return repository.setOffers(id, body)
      }
      return []
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { linkOffers }
