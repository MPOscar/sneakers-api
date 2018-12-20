module.exports = (sequelize, DataTypes) => {
  const brands = sequelize.define('brands', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT
  }, {
    underscored: false
  })
  brands.associate = function (models) {
    // associations can be defined here
    brands.hasMany(models.styles, { as: 'brand', foreignKey: 'brand' })
  }
  return brands
}
