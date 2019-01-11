module.exports = (sequelize, DataTypes) => {
  const Layout = sequelize.define('layouts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    page: DataTypes.STRING,
    headerJson: DataTypes.TEXT,
    headingJson: DataTypes.TEXT,
    sliderJson: DataTypes.TEXT,
    hottestJson: DataTypes.TEXT
  }, {
    freezeTableName: true,
    underscored: false
  })
  Layout.associate = function (models) {
    // associations can be defined here
  }
  return Layout
}
