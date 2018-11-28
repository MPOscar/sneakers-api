const toSequelizeSearch = (selectFields, searchParams) => {
  const attrs = {
    attributes: selectFields,
    offset: searchParams.pagination.offset || 0,
    limit: searchParams.pagination.limit || 1000000,
    order: [[searchParams.order.field || 'createdAt', searchParams.order.type || 'DESC']],
  }
  if (searchParams.filter && searchParams.filter !== {}) {
    Object.assign(attrs, { where: searchParams.filter })
  }
  return attrs
}
module.exports = {
  toSequelizeSearch
}
