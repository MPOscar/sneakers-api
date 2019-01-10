module.exports = (sequelize, DataTypes) => {
  const LayoutSlider = sequelize.define('layout_sliders', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    type: DataTypes.STRING,
    filterLimit: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: false
  })
  LayoutSlider.associate = function (models) {
    // associations can be defined here
    LayoutSlider.belongsTo(models.layouts, { as: 'layout' })
  }
  return LayoutSlider
}
