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
        validate: {
          len: { args : [3, 10], msg : "checking your length"}
        },
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: "checking your email format" },
        },
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
      validate: {

      }
    }
  )
  return Users
}
