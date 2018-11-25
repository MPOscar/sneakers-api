const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

module.exports = () => {
  const router = Router()
  const { auth, response: { Success }, upload, config } = container.cradle
  router.use(auth.authenticate())
  router.post('/', upload.image, function (req, res, next) {
    var baseUrl = req.protocol + '://' + req.get('host') + '/' + config.uploadImagePath
    res.status(Status.OK).json(Success({ url: (baseUrl + req.file.filename) }))
  })
  return router
}
