const repository = require('src/infra/repositories/blog')

const updateImagePosition = (imageId, newPosition) => {
  return new Promise(async (resolve, reject) => {
    try {
      const image = await repository.updateImagePosition(imageId, newPosition)
      resolve(image)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { updateImagePosition }
