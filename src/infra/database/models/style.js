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
    isDeleted: DataTypes.BOOLEAN,
    isParent: DataTypes.BOOLEAN
  }, {
    underscored: false
  })
  style.associate = function (models) {
    style.hasMany(models.style_shops, { as: 'shops' })
    style.hasMany(models.releases, { as: 'releases' })
    // associations can be defined here
    style.belongsToMany(models.categories, { through: 'style_categories', as: 'categories' })
    style.belongsTo(models.brands, { as: 'BrandModel', foreignKey: 'brand' })
  }
  return style
}
