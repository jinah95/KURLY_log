import db from "..";
const reviewModel = db.review;
const userModel = db.user;
const likeModel = db.like;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const Review = {
  findById: async (reviewId) => {
    const review = await reviewModel.findOne({
      where: {
        review_id: reviewId,
      },
    });
    return review;
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

  create: async ({ newReview }) => {
    const createdReview = await reviewModel.create(newReview);

    return createdReview;
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

  getBestLogs: async ({ grade }) => {
    const countLikes = await likeModel.count({
      group: ["review_id"],
    });

    let bestLogs = await reviewModel.findAll({
      include: [
        {
          model: userModel,
          as: "user",
          attributes: { exclude: ["password", "register_date", "last_login"] },
          where: { grade },
        },
      ],
    });

    let result = bestLogs.map((review) => {
      const count = countLikes.filter(
        (obj) => review.review_id === obj.review_id
      );

      try {
        review.dataValues.countLikes = count[0].count;
      } catch {
        review.dataValues.countLikes = 0;
      }
      return review;
    });

    result = result.sort((a, b) => {
      return b.dataValues.countLikes - a.dataValues.countLikes;
    });
    return result;
  },
};

export { Review };
