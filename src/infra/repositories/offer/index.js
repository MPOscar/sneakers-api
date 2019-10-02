const { Offer, ShopOffer, Link } = require('src/domain/offer')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
// inject database
const { database } = container.cradle
const model = database.models.offers
const shopOffersModel = database.models.shop_offers
const shopOfferLinksModel = database.models.shop_offer_links
const releasesModel = database.models.releases
const styleModel = database.models.styles
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const createOptions = {
  // include: [{
  //   model: shopOffersModel,
  //   as: 'shops'
  // }]
}
const updateOptions = createOptions

const getOptionsCallback = (params) => {
  if (params.order) {
    params.order.forEach((param, ind) => {
      if (param[0] === 'hot') {
        params.order[ind].unshift({ model: releasesModel, as: 'release' })
      }
    })
  }
  return {
    include: [
      {
        model: releasesModel,
        as: 'release',
        attributes: ['id', 'sku', 'collectionId', 'styleId', 'hot'],
        required: true,
        include: [{
          model: styleModel,
          as: 'style',
          attributes: ['id', ['category', 'categoryId'], ['brand', 'brandId']],
          required: true
        }]
      }, {
        model: shopOffersModel,
        as: 'shops',
        attributes: ['shopId'],
        include: [{
          model: shopOfferLinksModel,
          as: 'links',
          attributes: ['text', 'url']
        }]
      }
    ],
    distinct: true,
    subQuery: false
  }
}

const filterMappings = {
  brandId: (value) => {
    return {
      filter: { brand: Array.isArray(value) ? { [Op.or]: value } : value },
      model: styleModel
    }
  },
  categoryId: (value) => {
    return {
      filter: { category: Array.isArray(value) ? { [Op.or]: value } : value },
      model: styleModel
    }
  },
  sku: (value) => {
    return {
      filter: { sku: value },
      model: releasesModel
    }
  },
  collectionId: (value) => {
    return {
      filter: { collectionId: value },
      model: releasesModel
    }
  },
  styleId: (value) => {
    return {
      filter: { styleId: value },
      model: releasesModel
    }
  },
  gender: (value) => {
    return {
      filter: { gender: value },
      model: releasesModel
    }
  },
  hot: (value) => {
    return {
      filter: { hot: value },
      model: releasesModel
    }
  },
  minPrice: (value) => {
    return {
      filter: { priceEUR: { [Op.gte]: parseFloat(value) } }
    }
  },
  maxPrice: (value) => {
    return {
      filter: { priceEUR: { [Op.lte]: parseFloat(value) } }
    }
  }
}

const OfferRepository = BaseRepository(database.models.offers, Offer, { createOptions, updateOptions, getOptionsCallback, filterMappings })

const setShops = async (id, shops) => {
  const offer = await model.findOne({
    where: { id }
  })
  if (!offer) {
    throw new EntityNotFound()
  }
  await shopOffersModel.destroy({ 
    where: { 
      shopId: { 
        [Op.notIn]: shops.map(shop => shop.shopId)
      },
      offerId: id
    }
  })

  shops.forEach(shop => {
    shop.offerId = id
  })
  
  let shopOffers = await shopOffersModel.bulkCreate(mapShopOffers(shops), { updateOnDuplicate: ['shopId', 'offerId'] })
  await offer.setShops(shopOffers)
  await addLinks(shopOffers, shops)
  return shops
}

const addLinks = async (shopOffers, shops) => {
  for(let shopOffer of shopOffers) {
    await shopOfferLinksModel.destroy({ 
      where: {
        shopOfferId: shopOffer.id
      }
    })
    const shop = shops.find(s => s.shopId === shopOffer.shopId)
    let links = await shopOfferLinksModel.bulkCreate(mapLinks(shop.links))
    await shopOffer.setLinks(links)
  }
}

const mapShopOffers = (shops) => {
  return shops.map(shop => ShopOffer(shop))
}

const mapLinks = (links) => {
  return links.map(link => Link(link))
}

Object.assign(OfferRepository, { setShops })

module.exports = OfferRepository
