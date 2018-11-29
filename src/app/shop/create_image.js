const repository = require('src/infra/repositories/shop')
const { ShopImage } = require('src/domain/shop')

const createImage = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body.length) {
        const domains = body.map((imgData) => {
          return new ShopImage(imgData)
        })
        return repository.createImages(id, domains)
      }
      const domain = new ShopImage(body)
      return repository.createImages(id, [domain])
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { createImage }
