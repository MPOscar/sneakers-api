const { Collection } = require('src/domain/collection')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const CollectionRepository = BaseRepository(database.models.collections, Collection)

module.exports = CollectionRepository
