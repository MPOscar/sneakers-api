const { createContainer, asValue, asFunction } = require('awilix')

const app = require('./app')
const server = require('./interfaces/http/server')
const router = require('./interfaces/http/router')
const auth = require('./interfaces/http/auth')
const config = require('../config')
const logger = require('./infra/logging/logger')
const database = require('./infra/database')
const jwt = require('./infra/jwt')
const response = require('./infra/support/response')
const date = require('./infra/support/date')
const query = require('./infra/support/query_mapper')
const upload = require('./infra/multer')

const container = createContainer()

// SYSTEM
container
  .register({
    app: asFunction(app).singleton(),
    server: asFunction(server).singleton(),
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
    database: asFunction(database).singleton(),
    auth: asFunction(auth).singleton(),
    jwt: asFunction(jwt).singleton(),
    query: asFunction(query).singleton(),
    response: asFunction(response).singleton(),
    date: asFunction(date).singleton(),
    upload: asFunction(upload).singleton(),
    config: asValue(config)
  })
  // register repositories

module.exports = container
