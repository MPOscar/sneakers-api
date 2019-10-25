module.exports = (sequelize, DataTypes) => {
  const pages = sequelize.define('pages', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    body: DataTypes.TEXT,
  }, {
    underscored: false
  })
  pages.associate = function (models) {
    // associations can be defined here
  }
  return pages
}
