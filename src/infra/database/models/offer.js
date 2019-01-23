module.exports = (sequelize, DataTypes) => {
  const offer = sequelize.define('offers', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    shipping: DataTypes.STRING,
    offerDate: DataTypes.DATE,
    salePercentage: DataTypes.REAL,
    priceUSD: DataTypes.REAL,
    priceGBP: DataTypes.REAL,
    priceEUR: DataTypes.REAL,
    raffle: DataTypes.BOOLEAN,
    raffleStart: DataTypes.STRING,
    raffleEnd: DataTypes.STRING,
    displayWhatsNew: DataTypes.BOOLEAN
  }, {
    underscored: false
  })
  offer.associate = function (models) {
    // associations can be defined here
    offer.belongsTo(models.releases, { as: 'release' })
    offer.belongsTo(models.shops, { as: 'shop' })
  }
  return offer
}
