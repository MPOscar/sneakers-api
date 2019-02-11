const request = require('supertest')
const chai = require('chai')
const container = require('src/container')
const server = container.resolve('server')
const config = container.resolve('config')
const logger = container.resolve('logger')

/**
 * turn off logger since we are testing on winston
 */
logger.transports['console'].silent = false
logger.transports['file'].silent = true

global.expect = chai.expect
global.app = container
global.request = request(server.app)
global.config = config

beforeEach((done) => {
  const getToken = require('test/support/auth')
  getToken().then((jwt) => {
    global.token = jwt
    done()
  })
})
