module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "likes",
    {
    },
    {
      sequelize,
      modelName: "likes",
      tableName: "likes",
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: true,
      timestamps: true,
      paranoid: false,
    }
    //   { timestamps : false, sequelize }
  )

  return Likes
}
