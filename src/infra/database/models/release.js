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
    customized: DataTypes.BOOLEAN,
    children: DataTypes.BOOLEAN,
    price: DataTypes.REAL,
    gender: DataTypes.STRING,
    mainImage: DataTypes.UUID
  }, {
    underscored: false
  })
  releases.associate = function (models) {
    // associations can be defined here
    releases.belongsTo(models.styles, { as: 'style' })
    releases.belongsTo(models.collections, { as: 'collection' })
    releases.hasMany(models.release_images, { as: 'images' })
  }
  return releases
}
