const EntityNotFoundError = require('src/infra/errors/EntityNotFoundError')
const { toSequelizeSearch } = require('src/infra/support/sequelize_search_attrs')
const { SearchResult } = require('src/domain/search')

module.exports = (model, toEntity, options = {}) => {
  this.model = model
  const getAll = (selectFields, searchParams) => {
    let attrs = {}
    // include sub queries and other sequelize options
    if (options.getOptions) {
      Object.assign(attrs, options.getOptions)
    }
    // get options from searchParams
    if (options.getOptionsCallback) {
      Object.assign(attrs, options.getOptionsCallback(searchParams))
    }
    let searchAttrs = toSequelizeSearch(attrs, selectFields, searchParams, options.filterMappings)
    return model.findAndCountAll(searchAttrs).then((result) => {
      const rows = result.rows.map((data) => {
        const { dataValues } = data
        if (options && options.associatedIds) {
          options.associatedIds.forEach((item) => {
            dataValues[item] = dataValues[item].map((assocation) => assocation.id)
          })
        }
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
    if (options.getOptionsCallback) {
      Object.assign(getAttrs, options.getOptionsCallback({}))
    }
    return model.findOne(getAttrs).then((entity) => {
      if (!entity) {
        throw new EntityNotFoundError()
      }
      const { dataValues } = entity
      if (options && options.associatedIds) {
        options.associatedIds.forEach((item) => {
          dataValues[item] = dataValues[item].map((assocation) => assocation.id)
        })
      }
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

  const bulkCreate = (elements) => {
    if (options && options.createOptions) {
      return model.bulkCreate(elements, options.createOptions).then((models) => {
        return models.map((element) => { toEntity(element) })
      })
    }
    return model.bulkCreate(elements).then((models) => {
      return models.map((element) => { toEntity(element) })
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

  const destroyAll = () => model.destroy({ where: { } })

  return {
    getAll,
    create,
    bulkCreate,
    update,
    destroy,
    destroyAll,
    getById
  }
}
