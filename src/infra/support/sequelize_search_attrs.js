const toSequelizeSearch = ({ selectFields, filter, pagination, order }) => {
  const attrs = {
    attributes: selectFields,
    offset: pagination.offset || 0,
    limit: pagination.limit || 1000000,
    order: [[order.field || 'createdAt', order.type || 'DESC']]
  }
  if (filter && filter !== {}) {
    Object.assign(attrs, { where: filter })
  }
  return attrs
}
module.exports = {
  toSequelizeSearch
}
