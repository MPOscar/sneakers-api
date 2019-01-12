module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('layout_slider_images', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      url: {
        type: Sequelize.STRING
      },
      display: {
        type: Sequelize.STRING
      },
      layoutSliderId: {
        type: Sequelize.UUID,
        references: {
          model: 'layout_sliders',
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
    return queryInterface.dropTable('layout_slider_images')
  }
}
