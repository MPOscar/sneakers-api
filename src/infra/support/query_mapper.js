const { SearchParams } = require('src/domain/search')
module.exports = () => {
  const mapQuery = (params) => {
    const { limit, offset, ordering, ...filter } = params
    const pagination = {
      limit: (params.limit) ? parseInt(params.limit) : 1000000,
      offset: (params.offset) ? parseInt(params.offset) : 0
    }
    const orderStr = params.ordering
    let order = {}
    if (orderStr) {
      order = {
        field: (orderStr.charAt(0) === '-') ? orderStr.substring(1) : orderStr,
        type: (orderStr.charAt(0) === '-') ? 'DESC' : 'ASC'
      }
    }
    const searchParams = SearchParams({ filter, pagination, order })
    return searchParams
  }
  return mapQuery
}
