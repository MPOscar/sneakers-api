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
    price: DataTypes.REAL,
    raffle: DataTypes.BOOLEAN
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
