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
    active: DataTypes.BOOLEAN,
    rank: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    underscored: false
  })
  shop.associate = function (models) {
    // associations can be defined here
    shop.hasMany(models.shop_images, { as: 'images' })
  }
  return shop
}
