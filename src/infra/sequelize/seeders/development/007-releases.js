const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('releases', Faker('releases'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('releases', null, {})
  }
}
