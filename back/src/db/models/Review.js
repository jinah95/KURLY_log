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
      where: { review_id: reviewId },
    });
    return review;
  },

  findAll: async (productId) => {
    const reviews = await reviewModel.findAll({
      where: {
        product_id: productId,
      },
    });
    return reviews;
  },

  create: async ({ newReview }) => {
    const review = await reviewModel.create(newReview);
    return review;
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

  getBestLogs: async ({ grade }) => {
    let now = new Date();
    const day = now.getDate();
    // const hour = now.getHours();
    // const oneHourAgo = new Date(new Date().setHours(hour - 1));

    const sevenDaysAgo = new Date(new Date().setDate(day - 7));
    const countLikes = await likeModel.count({
      where: {
        created_at: {
          [Op.gte]: sevenDaysAgo,
        },
      },
      group: ["review_id", "created_at"],
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
