module.exports = (Repository, Domain, attrs) => {
  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        const domain = Domain(body)
        return Repository.create(domain)
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  const remove = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        Repository.destroy(id)
      )
      .catch((error) => {
        throw new Error(error)
      })
  }

  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const domain = Domain(body)
        await Repository.update(domain, id)
        resolve(domain)
      } catch (error) {
        reject(error)
      }
    })
  }

  const all = ({ filters, pagination, order }) => {
    return Promise
      .resolve()
      .then(() =>
        Repository.getAll(attrs, filters, pagination, order)
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  const getOne = (id) => {
    return Promise
      .resolve()
      .then(() =>
        Repository.getById(id, attrs)
      )
  }

  const getAllUseCase = { all }
  const getOneUseCase = { getOne }
  const createUseCase = { create }
  const removeUseCase = { remove }
  const updateUseCase = { update }

  return {
    createUseCase,
    getAllUseCase,
    removeUseCase,
    updateUseCase,
    getOneUseCase
  }
}
