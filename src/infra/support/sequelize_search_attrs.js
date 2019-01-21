const Sequelize = require('sequelize')

const Op = Sequelize.Op

const toLikeFilter = (filter) => {
  if (typeof filter === 'number') {
    return filter
  }
  return { [Op.like]: '%' + filter + '%' }
}

const toSequelizeSearch = (attrs, selectFields, searchParams, filterMappings) => {
  Object.assign(attrs, {
    attributes: selectFields,
    offset: searchParams.pagination.offset || 0,
    limit: searchParams.pagination.limit || 1000000,
    order: [[searchParams.order.field || 'createdAt', searchParams.order.type || 'DESC']]
  })
  if (searchParams.filter && searchParams.filter !== {}) {
    var newFilters = {}
    Object.keys(searchParams.filter).forEach((key) => {
      if (filterMappings[key]) {
        let filterCallback = filterMappings[key]
        let filterObject = filterCallback(searchParams.filter[key])
        if (!filterObject.model) {
          Object.assign(newFilters, filterObject.filter)
        } else {
          attrs.include.forEach((subModel) => {
            if (subModel.model === filterObject.model) {
              if (!subModel.where) {
                subModel.where = {}
              }
              Object.assign(subModel.where, filterObject.filter)
            }
          })
        }
      } else {
        newFilters[key] = toLikeFilter(searchParams.filter[key])
      }
    })
    Object.assign(attrs, { where: newFilters })
  }
  return attrs
}
module.exports = {
  toSequelizeSearch
}
