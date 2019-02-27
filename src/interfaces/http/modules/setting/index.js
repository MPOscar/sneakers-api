const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getSettingsUseCase,
  setSettingsUseCase
} = require('src/app/settings')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success } } = container.cradle

  /**
 * @swagger
 * definitions:
 *   setting:
 *     properties:
 *       name:
 *         type: string
 *       value:
 *         type: string
 */
  router
    .get('/:name', (req, res, next) => {
      getSettingsUseCase
        .getSetting(req.params.name)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  /**
   * Authentication for modifying endpoints
   */
  router.use(auth.authenticate())

  router
    .put('/:name', (req, res, next) => {
      setSettingsUseCase
        .setSetting(req.params.name, req.body.value)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  return router
}
