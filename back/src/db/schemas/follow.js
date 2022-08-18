import { Sequelize, DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
  let follow = sequelize.define(
    "follow",
    {
      follow_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "follow",
      timestamps: false,
      indexes: [{ unique: true, fields: ["follow_id"] }],
    }
  );
  return follow;
};
