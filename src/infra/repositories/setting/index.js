const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.settings
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')

const getValueByName = async (name) => {
  let entity = await model.findOne({ where: { name: name } })
  if (!entity) {
    throw new EntityNotFound()
  }
  return entity
}

const updateValueByName = async (name, value) => {
  let entity = await model.findOne({ where: { name: name } })
  if (!entity) {
    entity = await model.create({ name: name, value: value })
  } else {
    await entity.updateAttributes({ value: value })
  }
  return entity
}

module.exports = {
  getValueByName,
  updateValueByName
}
