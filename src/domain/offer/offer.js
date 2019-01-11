const t = require('tcomb')

const Offer = t.struct({
  releaseId: t.String,
  shopId: t.maybe(t.String),
  offerDate: t.maybe(t.Date),
  price: t.Number,
  salePercentage: t.maybe(t.Number),
  currency: t.maybe(t.String),
  status: t.enums.of(['sold_out', 'available', 'on_sale', 'unavailable', 'raffle_open', 'restock']),
  shipping: t.enums.of(['worldwide', 'unavailable']),
  description: t.String,
  links: t.maybe(t.list(t.String)),
  raffle: t.Boolean,
  raffleStart: t.maybe(t.String),
  raffleEnd: t.maybe(t.String)
})

module.exports = Offer
