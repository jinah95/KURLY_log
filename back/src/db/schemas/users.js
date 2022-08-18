import { Sequelize, DataTypes } from "sequelize";
export default (sequelize, DataTypes) => {
  let users = sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
        type: DataTypes.STRING,
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
      indexes: [{ unique: true, fields: ["user_id"] }],
    }
  );
  return users;
};
