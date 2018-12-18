const { makeEntity } = require('../helper')

const transform = (data) => {
  return data
}

const Blog = makeEntity(require('./blog'), transform)

module.exports = { Blog }
