module.exports = () => {
  const mapQuery = (params) => {
    const { limit, offset, ordering, ...filters } = params
    console.log(JSON.stringify(filters))
    const pagination = {
      limit: (params.limit) ? parseInt(params.limit) : 0,
      offset: (params.offset) ? parseInt(params.offset) : 1000000
    }
    const orderStr = params.ordering
    let order = {}
    if (orderStr) {
      order = {
        field: (orderStr.charAt(0) === '-') ? orderStr.substring(1) : orderStr,
        type: (orderStr.charAt(0) === '-') ? 'DESC' : 'ASC'
      }
    }
    return {
      filters,
      pagination,
      order
    }
  }
  return mapQuery
}
