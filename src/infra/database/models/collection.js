module.exports = (sequelize, DataTypes) => {
  const collections = sequelize.define('collections', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    imgUrl: DataTypes.TEXT
  }, {
    underscored: false
  })
  collections.associate = function (models) {
    // associations can be defined here
    collections.belongsTo(models.brands, { as: 'brandId', foreignKey: 'brand' })
    collections.belongsToMany(models.shops, { through: 'collection_shops', as: 'shops' })
    collections.belongsToMany(models.offers, { through: 'collection_offers', as: 'offers' })
  }
  return collections
}
