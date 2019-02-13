const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

module.exports = () => {
  const router = Router()
  const { auth, response: { Success }, upload } = container.cradle
  router.use(auth.authenticate())
  router.post('/', upload.image, function (req, res, next) {
    var baseUrl = process.env.IMAGE_URL || 'http://localhost:3000/api/images/'
    res.status(Status.OK).json(Success({ url: (baseUrl + req.file.filename) }))
  })
  return router
}
