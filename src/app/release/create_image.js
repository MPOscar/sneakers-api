const repository = require('src/infra/repositories/release')
const { ReleaseImage } = require('src/domain/release')

const createImage = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      const domain = new ReleaseImage(body)
      return repository.createImage(id, domain)
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { createImage }
