module.exports = (sequelize, DataTypes) => {
  const deals = sequelize.define('deals', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    salePercentage: DataTypes.FLOAT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    imgUrl: DataTypes.TEXT,
    promoCode: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    displayOnSale: DataTypes.BOOLEAN
  }, {
    underscored: false
  })
  deals.associate = function (models) {
    // associations can be defined here
    deals.belongsTo(models.shops, { as: 'shop', foreignKey: 'shopId' })
  }
  return deals
}
