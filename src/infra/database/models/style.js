module.exports = (sequelize, DataTypes) => {
  const style = sequelize.define('styles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    parent: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    underscored: false
  })
  style.associate = function (models) {
    style.belongsToMany(models.shops, { through: 'style_shops', as: 'shops' })
    // associations can be defined here
    style.belongsTo(models.categories, { as: 'CategoryModel', foreignKey: 'category' })
    style.belongsTo(models.brands, { as: 'BrandModel', foreignKey: 'brand' })
  }
  return style
}
