const { Style } = require('src/domain/style')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const StyleRepository = BaseRepository(database.models.styles, Style)

module.exports = StyleRepository
