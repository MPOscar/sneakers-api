const t = require('tcomb')

const Entity = t.struct({
  id: t.maybe(t.String),
  createdBy: t.maybe(t.String),
  updatedBy: t.maybe(t.String),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = Entity
