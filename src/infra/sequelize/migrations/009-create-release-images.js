module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('release_images', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      fileName: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      releaseId: {
        type: Sequelize.UUID,
        references: {
          model: 'releases',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    return queryInterface.dropTable('release_images')
  }
}
