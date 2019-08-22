const t = require('tcomb')

const Deal = t.struct({
  url: t.maybe(t.String),
  startDate: t.maybe(t.Date),
  endDate: t.maybe(t.Date),
  salePercentage: t.Number,
  status: t.enums.of(['Coming Soon']),
  promoCode: t.maybe(t.String),
  startTime: t.maybe(t.String),
  endTime: t.maybe(t.String),
  shopId: t.maybe(t.String),
  displayOnSale: t.Boolean,
  imgUrl: t.maybe(t.String)
}, {
  defaultProps: {
    displayOnSale: true,
    status: 'Coming Soon',
    salePercentage: 1
  }
})

module.exports = Deal
