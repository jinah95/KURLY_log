import { Sequelize, DataTypes } from "sequelize";
export default (sequelize, DataTypes) => {
  let users = sequelize.define(
    "users",
    {
      user_id: {
        field: "user_id",
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      grade: {
        type: DataTypes.ENUM("컬리언서", "샛별"),
        allowNull: false,
      },
      age: {
        type: DataTypes.ENUM(
          "10세 미만",
          "10대",
          "20대",
          "30대",
          "40대",
          "50대",
          "60세 이상"
        ),
        allowNull: false,
      },
      family: {
        type: DataTypes.ENUM(
          "1인 가구",
          "2인 가구",
          "3인 가구",
          "4인 가구",
          "5인 가구 이상"
        ),
        allowNull: false,
      },
      intro: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      register_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      last_login: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );
  return users;
};
