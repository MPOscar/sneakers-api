const { Blog } = require('src/domain/blog')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle

const BlogRepository = BaseRepository(database.models.blogs, Blog)

module.exports = BlogRepository
