import { Sequelize, DataTypes } from "sequelize";
export default (sequelize, DataTypes) => {
  let products = sequelize.define(
    "products",
    {
      product_id: {
        fields: "product_id",
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image: {
        type: DataTypes.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
    },
    {
      tableName: "products",
      timestamps: false,
    }
  );
  return products;
};
