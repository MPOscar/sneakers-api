module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('collection_offers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      offerId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'offers',
          key: 'id'
        },
        allowNull: false
      },
      collectionId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'collections',
          key: 'id'
        },
        allowNull: false
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
    return queryInterface.dropTable('collection_offers')
  }
}
