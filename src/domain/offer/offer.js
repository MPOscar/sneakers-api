const t = require('tcomb')

const Offer = t.struct({
  releaseId: t.String,
  shopId: t.maybe(t.String),
  offerDate: t.maybe(t.Date),
  priceUSD: t.Number,
  priceGBP: t.Number,
  priceEUR: t.Number,
  salePercentage: t.maybe(t.Number),
  currency: t.maybe(t.String),
  status: t.enums.of(['sold_out', 'available', 'on_sale', 'unavailable', 'restock', 'live', 'closed']),
  shipping: t.enums.of(['worldwide', 'unavailable']),
  links: t.maybe(t.list(t.Object)),
  raffle: t.Boolean,
  raffleStart: t.maybe(t.Date),
  raffleEnd: t.maybe(t.Date),
  releaseTime: t.maybe(t.Date),
  displayWhatsNew: t.maybe(t.Boolean),
  displayOnSale: t.maybe(t.Boolean),
  release: t.maybe(t.Object)
}, {
  defaultProps: {
    displayWhatsNew: false,
    displayOnSale: false,
    priceUSD: 0,
    priceGBP: 0,
    priceEUR: 0,
    links: []
  }
})

module.exports = Offer
