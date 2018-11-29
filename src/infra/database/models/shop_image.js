module.exports = (sequelize, DataTypes) => {
  const shopImages = sequelize.define('shop_images', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fileName: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    underscored: false
  })
  shopImages.associate = function (models) {
    // associations can be defined here
    shopImages.belongsTo(models.shops)
  }
  return shopImages
}
