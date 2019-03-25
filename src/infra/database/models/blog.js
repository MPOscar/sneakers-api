module.exports = (sequelize, DataTypes) => {
  const blogs = sequelize.define('blogs', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    author: DataTypes.STRING,
    body: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT
  }, {
    underscored: false
  })
  blogs.associate = function (models) {
    // associations can be defined here
    blogs.belongsTo(models.brands, { as: 'brand', foreignKey: 'brandId' })
    blogs.hasMany(models.blog_images, { as: 'images' })
  }
  return blogs
}
