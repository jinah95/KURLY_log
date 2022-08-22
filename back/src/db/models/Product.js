import db from "..";
const productModel = db.product;
const reviewModel = db.review;
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

  findInfo: async (productId) => {
    const product = await productModel.findOne({
      attributes: [
        [
          sequelize.fn("COUNT", sequelize.col("review.review_id")),
          "reviewsCount",
        ],
        "product.*",
      ],
      include: [
        {
          model: reviewModel,
          as: "review",
        },
      ],
      where: {
        product_id: productId,
      },
      group: ["products.product_id", "review.product_id"],
    });

    return product;
  },
};

export { Product };
