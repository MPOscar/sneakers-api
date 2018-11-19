const { Brand } = require('src/domain/brand')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const repository = BaseRepository(database.models.brands, Brand)

module.exports = repository
