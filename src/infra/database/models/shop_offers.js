module.exports = (sequelize, DataTypes) => {
  const shopOffers = sequelize.define('shop_offers', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    underscored: false
  })
  shopOffers.associate = function (models) {
    // associations can be defined here
    shopOffers.belongsTo(models.offers)
    shopOffers.belongsTo(models.shops)
    shopOffers.hasMany(models.shop_offer_links, { as: 'links' })
  }
  return shopOffers
}
