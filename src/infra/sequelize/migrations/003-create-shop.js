module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shops', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      country: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      shippingDetails: {
        type: Sequelize.TEXT
      },
      trackingListBaseUrl: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER
      },
      rank: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shops')
  }
}
