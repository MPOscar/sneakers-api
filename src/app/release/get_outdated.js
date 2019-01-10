const repository = require('src/infra/repositories/release')

const getOutOfDate = () => {
  return Promise
    .resolve()
    .then(() =>
      repository.getAll()
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getOutOfDate
}
