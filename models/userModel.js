module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "user",
    {
      user_id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "users",
      tableName: "user",
      charset: "utf8",
      collate: "utf8_general_ci",
      underscored: true,
      timestamps: true,
      paranoid: true,
    }
  )
  return Users
}
