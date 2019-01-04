const Sequelize = require('sequelize')

const Op = Sequelize.Op

const toLikeFilters = (filter) => {
  var newFilter = {}
  Object.keys(filter).forEach((key) => {
    if (typeof filter[key] === 'number') {
      newFilter[key] = filter[key]
    } else {
      newFilter[key] = { [Op.like]: '%' + filter[key] + '%' }
    }
  })
  return newFilter
}

const toSequelizeSearch = (selectFields, searchParams) => {
  const attrs = {
    attributes: selectFields,
    offset: searchParams.pagination.offset || 0,
    limit: searchParams.pagination.limit || 1000000,
    order: [[searchParams.order.field || 'createdAt', searchParams.order.type || 'DESC']]
  }
  if (searchParams.filter && searchParams.filter !== {}) {
    Object.assign(attrs, { where: toLikeFilters(searchParams.filter) })
  }
  return attrs
}
module.exports = {
  toSequelizeSearch
}
