const express = require('express')

module.exports = ({ config, router, logger, auth }) => {
  const app = express()

  app.disable('x-powered-by')
  app.use(auth.initialize())
  app.use(router)

  app.use(express.static('public'))
  // we define our static folder
  app.use('/api/images', express.static('public/upload/images'))

  return {
    app,
    start: () => new Promise((resolve) => {
      const http = app.listen(config.port, () => {
        const { port } = http.address()
        logger.info(`🤘 API - Port ${port}`)
      })
    })
  }
}
