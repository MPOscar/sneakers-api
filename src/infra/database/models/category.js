module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('categories', {
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
    freezeTableName: true,
    underscored: false
  })
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.styles, { as: 'category', foreignKey: 'category' })
    Category.hasMany(models.category_shops, { as: 'shops' })
    Category.belongsToMany(models.styles, { through: 'style_categories', as: 'styles' })
  }
  return Category
}
