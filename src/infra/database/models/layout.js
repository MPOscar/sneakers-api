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
    keywords: DataTypes.STRING,
    headingImgUrl: DataTypes.STRING,
    headerImgUrl: DataTypes.STRING,
    headerLink: DataTypes.STRING,
    headerLabel: DataTypes.STRING,
    headerDisplay: DataTypes.STRING,
    headerDisplayOnPage: DataTypes.BOOLEAN,
    sliderDisplay: DataTypes.STRING,
    sliderDisplayOnPage: DataTypes.BOOLEAN,
    hottestDisplay: DataTypes.STRING,
    hottestDisplayOnPage: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    underscored: false
  })
  Layout.associate = function (models) {
    // associations can be defined here
    Layout.hasMany(models.layout_slides, { as: 'slides' })
  }
  return Layout
}
