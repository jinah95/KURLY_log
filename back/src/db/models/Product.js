import db from "..";
const productModel = db.product;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.Op;

const Product = {
  findById: async (productId) => {
    const product = await productModel.findOne({
      where: {
        product_id: productId,
      },
    });
    return product;
  },

  findAll: async () => {
    const products = await productModel.findAll({});
    return products;
  },
};

export { Product };
