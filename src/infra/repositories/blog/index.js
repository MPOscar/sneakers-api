const { Blog, BlogImage } = require('src/domain/blog')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.blogs
const blogImageModel = database.models.blog_images
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')

const BlogRepository = BaseRepository(database.models.blogs, Blog)

/**
 * Associates images to the blog
 * @param id
 * @param images
 * @returns {Promise<Array<Model>>}
 */
const createImages = async (id, images) => {
  const blog = await model.findOne({
    where: { id }
  })
  if (!blog) {
    throw new EntityNotFound()
  }
  const newImages = await blogImageModel.bulkCreate(images)
  await blog.addImages(newImages)
  return newImages
}

/**
 * Get all images associated with a blog
 * @param id
 * @returns {Promise<*>}
 */
const getAllImages = async (id) => {
  const blog = await model.findOne({
    where: { id }
  })
  if (!blog) {
    throw new EntityNotFound()
  }
  const images = blog.getImages()
  if (!images) {
    return []
  }
  return images.map((data) => {
    const { dataValues } = data
    return BlogImage(dataValues)
  })
}

/**
 * Delete image from blog
 * @param id
 * @returns {*}
 */
const destroyImage = (id) => blogImageModel.destroy({ where: { id } })

Object.assign(BlogRepository, {
  createImages,
  destroyImage,
  getAllImages
})

module.exports = BlogRepository
