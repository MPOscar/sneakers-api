const { Shop } = require('src/domain/shop')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const repository = BaseRepository(database.models.shops, Shop)

module.exports = repository
