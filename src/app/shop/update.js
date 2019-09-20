const repository = require('src/infra/repositories/shop')
const { Shop } = require('src/domain/shop')

const update = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Shop(body)
      await repository.update(domain, id)
      await repository.updateWorkingHours(id, domain.workingHours)
      if (domain.brands) {
        await repository.updateBrands(id, domain.brands)
      }
      if (domain.categories) {
        await repository.updateCategories(id, domain.categories)
      }
      resolve(domain)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  update
}
