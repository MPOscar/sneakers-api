const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('release_images', Faker('release-images'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('release_images', null, {})
  }
}
