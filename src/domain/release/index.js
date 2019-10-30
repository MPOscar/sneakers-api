const { makeEntity } = require('../helper')

const transform = (data) => {
  if (data.style) {
    data.brandId = data.style.brand
  }
  if (data.offers) {
    // on_sale > available > restock > sold_out > coming_soon
    if(data.offers.find(offer => offer.status === 'on_sale')) {
      data.status = 'on_sale';
    } else if(data.offers.find(offer => offer.status === 'available')) {
      data.status = 'available';
    } else if(data.offers.find(offer => offer.status === 'restock')) {
      data.status = 'restock';
    } else if(data.offers.find(offer => offer.status === 'sold_out')) {
      data.status = 'sold_out';
    } else if(data.offers.find(offer => offer.status === 'coming_soon')) {
      data.status = 'coming_soon';
    }
  }
  // console.log(JSON.stringify(data))
  return data
}

const Release = makeEntity(require('./release'), transform)
const ReleaseImage = makeEntity(require('./release_image'))

module.exports = { Release, ReleaseImage }
