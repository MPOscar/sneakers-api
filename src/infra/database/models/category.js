module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('categories', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: false
  })
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.styles)
  }
  return Category
}
