module.exports = (sequelize, DataTypes) => {
  const Layout = sequelize.define('layouts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    page: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    headerItemsPerColumn: DataTypes.INTEGER,
    keywords: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: false
  })
  Layout.associate = function (models) {
    // associations can be defined here
    Layout.hasMany(models.layout_sliders, { as: 'layout_sliders' })
    Layout.hasMany(models.layout_header_columns, { as: 'columns' })
  }
  return Layout
}
