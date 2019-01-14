const { Offer } = require('src/domain/offer')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const releasesModel = database.models.releases

const getOptionsCallback = (searchParams) => {
  const include = { model: releasesModel, as: 'release', attributes: [ 'id', 'sku', 'collectionId' ] }
  if (searchParams.filter && searchParams.filter.sku) {
    Object.assign(include, { where: { sku: searchParams.filter.sku } })
    delete searchParams.filter.sku
  }
  if (searchParams.filter && searchParams.filter.collectionId) {
    Object.assign(include, { where: { collectionId: searchParams.filter.collectionId } })
    delete searchParams.filter.collectionId
  }
  return {
    include: [ include ],
    distinct: true
  }
}

const OfferRepository = BaseRepository(database.models.offers, Offer, { getOptionsCallback })

module.exports = OfferRepository
