const repository = require('../../infra/repositories/brand')

const getLinkedShops = (id) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getShops(id)
    ).then((shops) =>
      shops.map((shop) => shop.id)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getLinkedShops
}
