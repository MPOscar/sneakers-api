module.exports = (sequelize, DataTypes) => {
  const collectionShops = sequelize.define('collection_shops', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    underscored: false
  })
  collectionShops.associate = function (models) {
    // associations can be defined here
  }
  return collectionShops
}
