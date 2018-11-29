const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('shops', Faker('shops'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('shops', null, {})
  }
}
