const t = require('tcomb')

const Offer = t.struct({
  releaseId: t.String,
  shopId: t.String,
  offerDate: t.maybe(t.Date),
  price: t.Number,
  salePercentage: t.Number,
  currency: t.maybe(t.String),
  status: t.enums.of(['sold_out', 'available', 'on_sale', 'unavailable', 'raffle_open']),
  shipping: t.enums.of(['worldwide', 'unavailable']),
  description: t.String,
  links: t.maybe(t.list(t.String)),
  raffle: t.Boolean
})

module.exports = Offer
