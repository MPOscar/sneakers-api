const { Blog, BlogImage } = require('src/domain/blog')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.blogs
const blogImageModel = database.models.blog_images
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { Sequelize, Op } = require('sequelize')

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
  const imagesToCreate = [];
  for (var i = 0; i < images.length; i++) {
    if(images[i].state === 'new') {
      imagesToCreate.push(images[i])
    } else {
      await blogImageModel.update(
        {
          position: images[i].position
        },
        {
          where: {
            id: images[i].id
          }
        })
    }
  }

  const newImages = await blogImageModel.bulkCreate(imagesToCreate)
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
  const images = await blog.getImages()
  if (!images) {
    return []
  }

  const blogImages = images.map((data) => {
    const { dataValues } = data
    return BlogImage(dataValues)
  })

  blogImages.sort(function (a, b) {
    if (a.position < b.position) {
      return -1;
    }
    if (a.position > b.position) {
      return 1;
    }
    return 0;
  });
  return blogImages;
}

/**
 * Delete image from blog
 * @param id
 * @returns {*}
 */
const destroyImage = async (id) => {
  const image = await blogImageModel.findOne({
    where: { id }
  })
  if (!image) {
    throw new EntityNotFound()
  }
  await blogImageModel.update(
    {
      position: Sequelize.literal('position - 1')
    },
    {
      where: {
        blogId: image.blogId,
        position: {
          [Op.gt]: image.position
        }
      }
    })
  return blogImageModel.destroy({ where: { id } })
}

Object.assign(BlogRepository, {
  createImages,
  destroyImage,
  getAllImages
})

module.exports = BlogRepository
