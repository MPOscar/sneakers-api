module.exports = (sequelize, DataTypes) => {
  const shopOfferLinks = sequelize.define('shop_offer_links', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    text: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    underscored: false
  })
  shopOfferLinks.associate = function (models) {
    // associations can be defined here
    shopOfferLinks.belongsTo(models.shop_offers)
  }
  return shopOfferLinks
}
