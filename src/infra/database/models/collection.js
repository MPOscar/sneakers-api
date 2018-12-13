module.exports = (sequelize, DataTypes) => {
  const collections = sequelize.define('collections', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {
    underscored: false
  })
  collections.associate = function (models) {
    // associations can be defined here
    collections.belongsTo(models.brands)
  }
  return collections
}
