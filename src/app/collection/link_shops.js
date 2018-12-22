const repository = require('src/infra/repositories/collection')

const linkShops = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body && body.length) {
        return repository.setShops(id, body)
      }
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { linkShops }
