'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameTable('offer_links', 'shop_offer_links'),
      queryInterface.removeColumn('shop_offer_links', 'offerId'),
      queryInterface.addColumn('shop_offer_links', 'shopOfferId', {
        type: Sequelize.UUID,
        references: {
          model: 'shop_offers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    ]).then(() => {
      queryInterface.migrator.sequelize.query('DELETE FROM shop_offer_links')
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('shop_offer_links', 'shopOfferId'),
      queryInterface.addColumn('shop_offer_links', 'offerId', {
        type: Sequelize.UUID,
        references: {
          model: 'offers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }),
      queryInterface.renameTable('shop_offer_links', 'offer_links')
    ])
  }
}
