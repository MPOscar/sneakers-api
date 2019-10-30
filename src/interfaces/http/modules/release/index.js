const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  setHiddenUseCase,
  getAllImagesUseCase,
  updateMainImageUseCase,
  removeImageUseCase,
  createImageUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getOneUseCase,
  searchUseCase
} = require('src/app/release')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle
  /**
   * @swagger
   * definitions:
   *   release:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       name:
   *         type: string
   *       description:
   *         type: string
   *       sku:
   *         type: string
   *       images:
   *         type: array
   *         items:
   *           type: string
   *       gender:
   *         type: string
   *       hot:
   *         type: boolean
   *       children:
   *         type: boolean
   *       price:
   *         type: number
   *       releaseDate:
   *          type: string
   *          format: date-time
   *       updatedAt:
   *          type: string
   *          format: date-time
   */

  /**
   * @swagger
   * /releases/id:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns one release given id
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A release in json format
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/:id', (req, res, next) => {
      getOneUseCase
        .getOne(req.params.id)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          next(error)
        })
    })
  /**
   * @swagger
   * /releases/:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns a list of releases
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of releases
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/', (req, res) => {
      getAllUseCase.all(mapQuery(req.query))
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  /**
   * @swagger
   * /releases/search:
   *   post:
   *     tags:
   *       - Releases
   *     description: Returns a list of releases
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of releases
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .post('/search', (req, res) => {
      searchUseCase.search(mapQuery(req.body))
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /releases/:
   *   get:
   *     tags:
   *       - Releases
   *     description: Returns a list of releases
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of releases
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/release'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/:id/images', (req, res) => {
      getAllImagesUseCase
        .getAllImages(req.params.id)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * Authentication for modifying endpoints
   */
  router.use(auth.authenticate())
  /**
 * @swagger
 * /releases/:
 *   post:
 *     tags:
 *       - Releases
 *     description: Create new release
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Release's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/release'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/release'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/', (req, res) => {
      createUseCase
        .create({ body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /releases/id:
   *   put:
   *     tags:
   *       - Releases
   *     description: Update Release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to update
   *         type: string
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/release'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .put('/:id', (req, res) => {
      updateUseCase
        .update({ id: req.params.id, body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /releases/id:
   *   delete:
   *     tags:
   *       - Releases
   *     description: Delete Release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router
    .delete('/:id', (req, res) => {
      removeUseCase
        .remove({ id: req.params.id })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /releases/id/images:
   *   post:
   *     tags:
   *       - Releases
   *     description: Add a new image to a release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/release'
   *     responses:
   *       200:
   *         description: Successfully Created
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .post('/:id/images', (req, res) => {
      createImageUseCase
        .createImage({ id: req.params.id, body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  /**
   * @swagger
   * /releases/id:
   *   delete:
   *     tags:
   *       - Releases
   *     description: Delete Release
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router
    .delete('/:idRelease/images/:idImage', (req, res) => {
      removeImageUseCase.remove({ id: req.params.idImage })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error)
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /releases/id/mainImage:
   *   patch:
   *     tags:
   *       - Releases
   *     description: Change release main image
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to update
   *         type: string
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           mainImage:
   *            type: string
   *            format: uuid
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .patch('/:id/mainImage', (req, res) => {
      updateMainImageUseCase
        .updateMainImage(req.params.id, req.body.mainImage)
        .then(() => {
          res.status(Status.OK).json(Success({}))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /releases/id/hiddenDashboard:
   *   patch:
   *     tags:
   *       - Releases
   *     description: Change release main image
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Release's ID to update
   *         type: string
   *       - name: body
   *         description: Release's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           hiddenDashboard:
   *            type: string
   *            format: uuid
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/release'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .patch('/:id/hiddenDashboard', (req, res) => {
      setHiddenUseCase
        .setHiddenDashboard(req.params.id)
        .then(() => {
          res.status(Status.OK).json(Success({}))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  return router
}
