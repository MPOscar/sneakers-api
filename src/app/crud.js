const EntityUniqueConstrainError = require('src/infra/errors/EntityAlreadyExists')

module.exports = (Repository, Domain, attrs, options) => {
  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        const domain = Domain(body)
        const createPromise = Repository.create(domain)
        createPromise.then((entity) => {
          if (options && options.afterCreate) {
            options.afterCreate(domain, entity)
          }
        })
        return createPromise
      })
      .catch(error => {
        if (error.name && error.name === 'SequelizeUniqueConstraintError') {
          throw new EntityUniqueConstrainError()
        }
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
        if (options && options.afterUpdate) {
          options.afterUpdate(domain, { id })
        }
        resolve(domain)
      } catch (error) {
        reject(error)
      }
    })
  }

  const all = (searchParams) => {
    return Promise
      .resolve()
      .then(() =>
        Repository.getAll(attrs, searchParams)
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
