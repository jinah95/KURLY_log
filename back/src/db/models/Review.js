import db from "..";
const reviewModel = db.review;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.Op;

const Review = {
  findAll: async (productId) => {
    const reviews = await reviewModel.findAll({
      where: {
        product_id: productId,
      },
    });
    return reviews;
  },

  create: async ({ newReview }) => {
    const createdReview = await reviewModel.create(newReview);

    return createdReview;
  },
};

export { Review };
