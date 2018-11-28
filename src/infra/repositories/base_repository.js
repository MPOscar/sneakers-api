const EntityNotFoundError = require('src/infra/errors/EntityNotFoundError')
const { toSequelizeSearch } = require('src/infra/support/sequelize_search_attrs')

module.exports = (model, toEntity) => {
  this.model = model
  const getAll = (selectFields, filter, pagination, order) => {
    const attrs = toSequelizeSearch({ selectFields, filter, pagination, order })
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
