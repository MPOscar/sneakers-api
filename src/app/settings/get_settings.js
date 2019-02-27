const repository = require('src/infra/repositories/setting')

const getSetting = (name) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getValueByName(name)
    )
}

module.exports = {
  getSetting
}
