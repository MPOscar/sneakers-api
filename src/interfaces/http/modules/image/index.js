const { Router } = require('express')
const Status = require('http-status')
const path = require('path')
const container = require('src/container')
const baseUrl = process.env.IMAGE_URL || 'http://localhost:3000/api/images/'

module.exports = () => {
  const router = Router()
  const { auth, response: { Success }, upload } = container.cradle
  //router.use(auth.authenticate())
  router.post('/', upload.image, function (req, res, next) {
    console.log(req.file)
    const filename = req.file.filename || req.file.key
    res.status(Status.OK).json(Success({ url: (path.join(baseUrl, filename)) }))
    // res.status(Status.OK).json(Success({ url: req.file.location }))
  })
  return router
}
