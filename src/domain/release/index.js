const { makeEntity } = require('../helper')
const Release = makeEntity(require('./release'))
const ReleaseImage = makeEntity(require('./release_image'))

module.exports = { Release, ReleaseImage }
