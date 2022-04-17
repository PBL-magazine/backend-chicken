module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "comment",
    {
      comment_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Comments",
      tableName: "comment",
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  )
  return Comments
}
