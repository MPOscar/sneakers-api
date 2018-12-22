module.exports = (sequelize, DataTypes) => {
  const shop = sequelize.define('shops', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    address: DataTypes.TEXT,
    currency: DataTypes.STRING,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    shippingDetails: DataTypes.TEXT,
    trackingListBaseUrl: DataTypes.STRING,
    mainImage: DataTypes.UUID,
    active: DataTypes.BOOLEAN,
    rank: DataTypes.INTEGER
  }, {
    underscored: false
  })
  shop.associate = function (models) {
    // associations can be defined here
    shop.hasMany(models.shop_images, { as: 'images' })
    shop.hasMany(models.shop_working_hours, { as: 'workingHours' })
    shop.belongsToMany(models.styles, { through: 'style_shops', as: 'styles' })
    shop.belongsToMany(models.brands, { through: 'brand_shops', as: 'brands' })
    shop.belongsToMany(models.collections, { through: 'collection_shops', as: 'collections' })
  }
  return shop
}
