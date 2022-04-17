module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "like",
    {
      dummy: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "likes",
      tableName: "like",
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
    //   { timestamps : false, sequelize }
  )

  return Likes
}
