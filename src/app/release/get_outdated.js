const repository = require('src/infra/repositories/release')

const getOutOfDate = (date) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getPastReleases(date)
    )
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = {
  getOutOfDate
}
