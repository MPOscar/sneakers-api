const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/style')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  /**
   * @swagger
   * definitions:
   *   style:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       name:
   *         type: string
   *       description:
   *         type: string
   *       brand:
   *         type: string
   *         format: uiid
   *       category:
   *         type: string
   *         format: uiid
   *       updatedAt:
   *          type: date
   */

  router.use(auth.authenticate())

  /**
   * @swagger
   * /styles/:
   *   get:
   *     tags:
   *       - Styles
   *     description: Returns a list of styles
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of styles
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/style'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/', (req, res) => {
      getAllUseCase
        .all(req, res)
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
 * /styles/:
 *   post:
 *     tags:
 *       - Styles
 *     description: Create new style
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Style's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/style'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/style'
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
   * /styles/id:
   *   put:
   *     tags:
   *       - Styles
   *     description: Update Style
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Style's ID to update
   *         type: string
   *       - name: body
   *         description: Style's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/style'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/style'
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
   * /styles/id:
   *   delete:
   *     tags:
   *       - Styles
   *     description: Delete Style
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Style's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/style'
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

  return router
}
