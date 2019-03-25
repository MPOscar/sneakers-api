const repository = require('../../infra/repositories/blog')
const { BlogImage } = require('../../domain/blog')

const createImage = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      if (body.length) {
        const domains = body.map((imgData) => {
          return new BlogImage(imgData)
        })
        return repository.createImages(id, domains)
      }
      const domain = new BlogImage(body)
      return repository.createImages(id, [domain])
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { createImage }
