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
        Repository.destroy({
          where: { id }
        })
      )
      .catch((error) => {
        throw new Error(error)
      })
  }

  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const domain = Domain(body)
        await Repository.update(domain, {
          where: { id }
        })
        resolve(domain)
      } catch (error) {
        reject(error)
      }
    })
  }

  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        Repository.getAll({
          attributes: attrs
        })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  const getAllUseCase = { all }
  const createUseCase = { create }
  const removeUseCase = { remove }
  const updateUseCase = { update }

  return {
    createUseCase,
    getAllUseCase,
    removeUseCase,
    updateUseCase
  }
}
