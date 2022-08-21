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
  create: async () => {
    const review = await reviewModel.create({});
  },

  update: async ({ reviewId, toUpdate }) => {
    const updatedReview = await reviewModel.update(toUpdate, {
      where: {
        review_id: reviewId,
      },
    });
    return updatedReview;
  },

  delete: async ({ reviewId }) => {
    const deletedReview = await reviewModel.destroy({
      where: {
        review_id: reviewId,
      },
    });
    return deletedReview;
  },

  countByFilter: async (filter) => {
    const count = await reviewModel.count({ where: filter });
    return count;
  },
  findByProduct: async (productId) => {
    const reviews = await reviewModel.findAll({
      where: {
        product_id: productId,
      },
    });
    return reviews;
  },

  findByUser: async (userId) => {
    const logs = await reviewModel.findAll({
      where: {
        user_id: userId,
      },
    });
    return logs;
  },

  findById: async (reviewId) => {
    const review = await reviewModel.findOne({
      where: { review_id: reviewId },
    });
    return review;
  },
};

export { Review };
