'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('offers', 'shopId')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('offers', 'shopId')
  }
}
