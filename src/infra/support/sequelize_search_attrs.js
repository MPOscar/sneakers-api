const Sequelize = require('sequelize')

const Op = Sequelize.Op

const toLikeFilter = (filter) => {
  if (typeof filter === 'number') {
    return filter
  }
  if (Array.isArray(filter)) {
    return { [Op.or]: filter }
  }
  return { [Op.like]: '%' + filter + '%' }
}

const updateFiltersInIncludes = (attrs, filterObject) => {
  attrs.include.forEach((subModel) => {
    if (subModel.model === filterObject.model) {
      if (!subModel.where) {
        subModel.where = {}
      }
      Object.assign(subModel.where, filterObject.filter)
    } else if (subModel.include && Array.isArray(subModel.include)) {
      // Update submodel filters
      updateFiltersInIncludes(subModel, filterObject)
    }
  })
}

const toSequelizeSearch = (attrs, selectFields, searchParams, filterMappings) => {
  let newAttrs = Object.assign({}, attrs)
  Object.assign(newAttrs, {
    offset: searchParams.pagination.offset || 0,
    limit: searchParams.pagination.limit || 1000000,
    order: [[searchParams.order.field || 'createdAt', searchParams.order.type || 'DESC']]
  })
  if (selectFields) {
    Object.assign(newAttrs, { attributes: selectFields })
  }
  if (searchParams.filter && searchParams.filter !== {}) {
    let newFilters = {}
    Object.keys(searchParams.filter).forEach((key) => {
      if (filterMappings && filterMappings[key]) {
        let filterCallback = filterMappings[key]
        let filterObject = filterCallback(searchParams.filter[key])
        if (!filterObject.model) {
          Object.assign(newFilters, filterObject.filter)
        } else {
          updateFiltersInIncludes(newAttrs, filterObject)
        }
      } else {
        newFilters[key] = toLikeFilter(searchParams.filter[key])
      }
    })
    Object.assign(newAttrs, { where: newFilters })
  }
  return newAttrs
}
module.exports = {
  toSequelizeSearch
}
