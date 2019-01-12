module.exports = (sequelize, DataTypes) => {
  const LayoutSliderImage = sequelize.define('layout_slider_images', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    display: DataTypes.STRING
  }, {
    underscored: false
  })
  LayoutSliderImage.associate = function (models) {
    // associations can be defined here
    LayoutSliderImage.belongsTo(models.layout_sliders)
  }
  return LayoutSliderImage
}
