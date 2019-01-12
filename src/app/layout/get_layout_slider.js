const repository = require('src/infra/repositories/layout')

const getLayoutSlider = (filter) => {
  return Promise
    .resolve()
    .then(() =>
      repository.getSliderByFilter(filter)
    )
}

module.exports = {
  getLayoutSlider
}
