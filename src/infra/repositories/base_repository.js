const EntityNotFoundError = require('src/infra/errors/EntityNotFoundError')
const { toSequelizeSearch } = require('src/infra/support/sequelize_search_attrs')
const { SearchResult } = require('src/domain/search')

module.exports = (model, toEntity, options) => {
  this.model = model
  const getAll = (selectFields, searchParams) => {
    const attrs = toSequelizeSearch(selectFields, searchParams)
    if (options && options.getOptions) {
      Object.assign(attrs, options.getOptions)
    }
    if (options && options.getOptionsCallback) {
      Object.assign(attrs, options.getOptionsCallback(searchParams))
    }
    return model.findAndCountAll(attrs).then((result) => {
      const rows = result.rows.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
      return SearchResult({ rows, count: result.count })
    })
  }

  const getById = (id, attrs) => {
    const getAttrs = { where: { id: id }, attributes: attrs }
    if (options && options.getOptions) {
      Object.assign(getAttrs, options.getOptions)
    }
    return model.findOne(getAttrs).then((entity) => {
      if (!entity) {
        throw new EntityNotFoundError()
      }
      const { dataValues } = entity
      return toEntity(dataValues)
    })
  }

  const create = (domain) => {
    if (options && options.createOptions) {
      return model.create(domain, options.createOptions).then(({ dataValues }) => {
        return toEntity(dataValues)
      })
    }
    return model.create(domain).then(({ dataValues }) => {
      return toEntity(dataValues)
    })
  }

  const update = (domain, id) => {
    if (options && options.updateOptions) {
      Object.assign(options.updateOptions, { where: { id } })
      return model.update(domain, options.updateOptions)
    }
    return model.update(domain, { where: { id } })
  }

  const destroy = (id) => model.destroy({ where: { id } })

  return {
    getAll,
    create,
    update,
    destroy,
    getById
  }
}
