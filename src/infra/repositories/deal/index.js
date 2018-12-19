const { Deal } = require('src/domain/deal')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const BlogRepository = BaseRepository(database.models.deals, Deal)

module.exports = BlogRepository
