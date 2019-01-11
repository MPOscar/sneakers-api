const { Layout } = require('src/domain/layout')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.layouts
const { map, unmap } = require('./mapper')

this.model = model
const getByPage = async (page) => {
  let entity = await model.findOne({ where: { page: page } })
  return Layout(unmap(entity))
}

const updatePage = async (page, layout) => {
  Object.assign(Layout(layout), { page: page })
  let entity = await model.findOne({ where: { page: page } })
  if (!entity) {
    entity = await model.create(map(layout))
  } else {
    await entity.updateAttributes(map(layout))
  }
  return layout
}

module.exports = {
  getByPage,
  updatePage
}
