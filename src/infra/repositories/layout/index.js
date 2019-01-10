const { Layout } = require('src/domain/layout')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.layouts

this.model = model
const getByPage = (page) => {
  return model.findOne({ where: { page: page } }).then((entity) => {
    const { dataValues } = entity
    return Layout(dataValues)
  })
}

const updatePage = (domain, page) => {
  return model.update(domain, { where: { page: page } })
}

module.exports = {
  getByPage,
  updatePage
}
