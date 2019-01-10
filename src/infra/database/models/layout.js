module.exports = (sequelize, DataTypes) => {
  const Layout = sequelize.define('layouts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    page: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: false
  })
  Layout.associate = function (models) {
    // associations can be defined here
  }
  return Layout
}
