const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/brand')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  /**
   * @swagger
   * definitions:
   *   brand:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       name:
   *         type: string
   *       description:
   *         type: string
   *       imgUrl:
   *          type: string
   */

  router.use(auth.authenticate())

  /**
   * @swagger
   * /brands/:
   *   get:
   *     tags:
   *       - Brands
   *     description: Returns a list of brands
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of brands
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/brand'
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
 * /brands/:
 *   post:
 *     tags:
 *       - Brands
 *     description: Create new brand
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Brand's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/brand'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/brand'
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
   * /brands/id:
   *   put:
   *     tags:
   *       - Brands
   *     description: Update Brand
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Brand's ID to update
   *         type: string
   *       - name: body
   *         description: Brand's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/brand'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/brand'
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
   * /brands/id:
   *   delete:
   *     tags:
   *       - Brands
   *     description: Delete Brand
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         required: true
   *         description: Brand's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/brand'
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
