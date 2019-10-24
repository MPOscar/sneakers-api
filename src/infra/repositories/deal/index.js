const { Deal } = require('src/domain/deal')
const BaseRepository = require('../base_repository')
const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.deals
const shopsModel = database.models.shops
const { Sequelize, Op } = require('sequelize')

const DealRepository = BaseRepository(database.models.deals, Deal)

const getAllByShop = async (shopId) => {
    shop = await shopsModel.findOne({
        where: { id: shopId }
    })
    if (!shop) {
        throw new EntityNotFound()
    }
    const deals = await model.findAll({
        where: { 
            [Op.or]: [
                {
                    shopId
                },
                {
                    shopId: shop.parent
                }
            ]
        }
    })
    return deals
}

Object.assign(DealRepository, {
    getAllByShop
})

module.exports = DealRepository
