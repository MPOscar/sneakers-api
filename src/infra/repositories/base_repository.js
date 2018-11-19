
module.exports = (model, toEntity) => {
  this.model = model
  const getAll = (...args) =>
    model.findAll(...args).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => {
      return toEntity(dataValues)
    })

  const update = (...args) =>
    model.update(...args)

  const destroy = (...args) =>
    model.destroy(...args)

  return {
    getAll,
    create,
    update,
    destroy
  }
}
