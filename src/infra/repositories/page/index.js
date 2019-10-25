const { Page } = require('src/domain/page')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.pages

const repository = BaseRepository(database.models.pages, Page)

const getByName = async (name) => {
    const page = await model.findOne({
        where: { name }
    })
    return page
}

Object.assign(repository, { getByName })

module.exports = repository
