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
    shippingDetails: DataTypes.TEXT,
    trackingListBaseUrl: DataTypes.STRING,
    status: DataTypes.INTEGER,
    rank: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    timestamps: false
  })
  shop.associate = function(models) {
    // associations can be defined here
  }
  return shop
}
