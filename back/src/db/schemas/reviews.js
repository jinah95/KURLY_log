import { Sequelize, DataTypes } from "sequelize";

export default (sequelize, DataTypes) => {
  let reviews = sequelize.define(
    "reviews",
    {
      review_id: {
        field: "review_id",
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "product_id",
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      good: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "reviews",
      timestamps: false,
    }
  );
  return reviews;
};
