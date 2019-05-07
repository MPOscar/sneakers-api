const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  getLayoutHottestUseCase,
  setLayoutHottestUseCase,
  getLayoutHeaderUseCase,
  setLayoutHeaderUseCase,
  getLayoutHeadingUseCase,
  setLayoutHeadingUseCase,
  getLayoutSliderUseCase,
  setLayoutSliderUseCase,
  getLayoutUseCase,
  setLayoutUseCase,
  getOurPartnersTabsUseCase,
  createOurPartnersTabUseCase,
  updateOurPartnersTabUseCase,
  deleteOurPartnersTabUseCase
} = require('src/app/layout')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success } } = container.cradle

  /**
 * @swagger
 * definitions:
 *   layout:
 *     properties:
 *       page:
 *         type: string
 *       heading:
 *         type: string
 *       header:
 *         type: string
 *       slider:
 *         type: string
 *       hottest:
 *         type: string
 */
  router
    .get('/:page', (req, res, next) => {
      getLayoutUseCase
        .getPageLayout(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/slider', (req, res, next) => {
      getLayoutSliderUseCase
        .getLayoutSlider(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/heading', (req, res, next) => {
      getLayoutHeadingUseCase
        .getLayoutHeading(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/header', (req, res, next) => {
      getLayoutHeaderUseCase
        .getLayoutHeader(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/hottest', (req, res, next) => {
      getLayoutHottestUseCase
        .getLayoutHottest(req.params.page)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .get('/:page/ourpartners_tabs', (req, res, next) => {
      getOurPartnersTabsUseCase
        .getOurpartnersTabs(req.params.page)
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
    .post('/:page/ourpartners_tabs', (req, res, next) => {
      createOurPartnersTabUseCase
        .createOurpartnersTab(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/ourpartners_tabs/:id', (req, res, next) => {
      updateOurPartnersTabUseCase
        .updateOurpartnersTab(req.params.page, req.params.id, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .delete('/:page/ourpartners_tabs/:id', (req, res, next) => {
      deleteOurPartnersTabUseCase
        .deleteOurpartnersTab(req.params.id)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/', (req, res, next) => {
      setLayoutUseCase
        .setLayout(req.query.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/slider', (req, res, next) => {
      setLayoutSliderUseCase
        .setLayout(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/heading', (req, res, next) => {
      setLayoutHeadingUseCase
        .setLayoutHeading(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/header', (req, res, next) => {
      setLayoutHeaderUseCase
        .setHeader(req.params.page, req.body)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })

  router
    .put('/:page/hottest', (req, res, next) => {
      setLayoutHottestUseCase
        .setHottest(req.params.page, req.body)
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
