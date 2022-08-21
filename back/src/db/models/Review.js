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
  getBestLogs: async () => {
    const kurlyencer = await userModel.findAll({
      where: {
        grade: "컬리언서",
      },
      attributes: ["user_id"],
    });

    const kurlyencerId = kurlyencer.map((data) => data.user_id);

    const bestLogs = await reviewModel.findAll({
      include: [
        {
          model: likeModel,
          as: "l",
          group: "review_id",
        },
      ],
      attributes: [
        "review_id",
        "product_id",
        "user_id",
        "score",
        "good",
        "bad",
        "title",
        "image",
        "content",
        [sequelize.fn("count", sequelize.col("*")), "countLikes"],
      ],
      where: {
        user_id: { [Op.in]: kurlyencerId },
      },
      group: ["l.review_id", "l.like_id", "reviews.review_id"],
      order: ["countLikes"],
    });

    return bestLogs;
  },
};

export { Review };
