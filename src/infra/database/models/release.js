module.exports = (sequelize, DataTypes) => {
  const releases = sequelize.define('releases', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    color: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    hot: DataTypes.BOOLEAN,
    children: DataTypes.BOOLEAN,
    price: DataTypes.REAL,
    gender: DataTypes.STRING
  }, {
    underscored: false
  })
  releases.associate = function (models) {
    // associations can be defined here
    releases.belongsTo(models.styles, { as: 'style' })
    releases.hasMany(models.release_images, { as: 'images' })
  }
  return releases
}
