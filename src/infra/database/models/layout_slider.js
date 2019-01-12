module.exports = (sequelize, DataTypes) => {
  const LayoutSlider = sequelize.define('layout_sliders', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    filter: DataTypes.TEXT,
    isFiltered: DataTypes.BOOLEAN,
    filterLimit: DataTypes.INTEGER
  }, {
    underscored: false
  })
  LayoutSlider.associate = function (models) {
    // associations can be defined here
    LayoutSlider.hasMany(models.layout_slider_images, { as: 'images' })
    LayoutSlider.belongsTo(models.layouts)
  }
  return LayoutSlider
}
