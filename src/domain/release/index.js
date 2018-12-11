const { makeEntity } = require('../helper')

const transform = (data) => {
  if (data.style) {
    data.brandId = data.style.brand
  }
  console.log(JSON.stringify(data))
  return data
}

const Release = makeEntity(require('./release'), transform)
const ReleaseImage = makeEntity(require('./release_image'))

module.exports = { Release, ReleaseImage }
