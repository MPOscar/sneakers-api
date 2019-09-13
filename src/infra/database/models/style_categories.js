module.exports = (sequelize, DataTypes) => {
  const styleCategories = sequelize.define('style_categories', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    underscored: false
  })
  styleCategories.associate = function (models) {
    // associations can be defined here
  }
  return styleCategories
}
