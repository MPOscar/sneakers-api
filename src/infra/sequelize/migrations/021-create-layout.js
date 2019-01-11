module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('layouts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      page: {
        type: Sequelize.STRING,
        allowNull: false
      },
      headerJson: {
        type: Sequelize.TEXT
      },
      headingJson: {
        type: Sequelize.TEXT
      },
      sliderJson: {
        type: Sequelize.TEXT
      },
      hottestJson: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('layouts')
  }
}
