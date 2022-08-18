import { Sequelize, DataTypes } from "sequelize";
export default (sequelize, DataTypes) => {
  let products = sequelize.define(
    "products",
    {
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: false,
      indexes: [{ unique: true, fields: ["product_id"] }],
    }
  );
  return products;
};
