module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    "Posts",
    {
      post_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "post",
      tableName: "posts",
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  )

  return Posts
}
