const EntityNotFoundError = require('src/infra/errors/EntityNotFoundError')

module.exports = (model, toEntity) => {
  this.model = model
  const getAll = (selectFields, filter, pagination, order) => {
    const attrs = {
      attributes: selectFields,
      offset: pagination.offset || 0,
      limit: pagination.limit || 1000000,
      order: [[order.field || 'createdAt', order.type || 'DESC']]
    }
    if (filter && filter !== {}) {
      Object.assign(attrs, { where: filter })
    }
    return model.findAll(attrs).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )
  }

  const getById = (id, attrs) => model.findOne({ where: { id: id }, attributes: attrs }).then((entity) => {
    if (!entity) {
      throw new EntityNotFoundError()
    }
    const { dataValues } = entity
    return toEntity(dataValues)
  })

  const create = (domain) => model.create(domain).then(({ dataValues }) => {
    return toEntity(dataValues)
  })

  const update = (domain, id) => model.update(domain, { where: { id } })

  const destroy = (id) => model.destroy({ where: { id } })

  return {
    getAll,
    create,
    update,
    destroy,
    getById
  }
}
