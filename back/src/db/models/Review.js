import db from "..";
const reviewModel = db.review;
const userModel = db.user;
const likeModel = db.like;
const productModel = db.product;
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

  findByProduct: async ({ productId, page, perPage }) => {
    const reviews = await reviewModel.findAll({
      where: {
        product_id: productId,
      },
      order: [["created_at", "DESC"]],
      limit: perPage,
      offset: perPage * (page - 1),
    });
    return reviews;
  },

  findByUser: async (userId) => {
    const logs = await reviewModel.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("like.review_id")),
            "likesCount",
          ],
        ],
      },
      include: [
        {
          model: likeModel,
          as: "like",
          attributes: [],
          group: ["review_id"],
          required: false,
        },
      ],
      where: {
        user_id: userId,
      },
      order: [
        ["likesCount", "DESC"],
        ["created_at", "DESC"],
      ],
      group: ["reviews.review_id"],
    });
    return logs;
  },

  findByGradeNoPage: async ({ grade, sevenDaysAgo }) => {
    let bestLogs = await reviewModel.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("like.review_id")),
            "likesCount",
          ],
        ],
      },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: { exclude: ["password", "register_date", "last_login"] },
          where: { grade },
        },
        {
          model: productModel,
          as: "product",
          attributes: ["detail"],
        },
        {
          model: likeModel,
          as: "like",
          attributes: [],
          where: {
            created_at: {
              [Op.gte]: sevenDaysAgo,
            },
          },
          group: ["review_id"],
          required: false,
        },
      ],
      order: [
        ["likesCount", "DESC"],
        ["created_at", "DESC"],
      ],
      group: [
        "reviews.review_id",
        "user.user_id",
        "like.like_id",
        "product.product_id",
      ],
    });

    return bestLogs;
  },

  findByGrade: async ({ grade, sevenDaysAgo, page, perPage }) => {
    let bestLogs = await reviewModel.findAll({
      attributes: {
        include: [
          [
            sequelize.fn("COUNT", sequelize.col("like.review_id")),
            "likesCount",
          ],
        ],
      },
      include: [
        {
          model: userModel,
          as: "user",
          attributes: { exclude: ["password", "register_date", "last_login"] },
          where: { grade },
        },
        {
          model: likeModel,
          as: "like",
          attributes: [],
          where: {
            created_at: {
              [Op.gte]: sevenDaysAgo,
            },
          },
          group: ["review_id"],
          required: false,
        },
      ],
      order: [
        ["likesCount", "DESC"],
        ["created_at", "DESC"],
      ],
      group: ["reviews.review_id", "user.user_id", "like.like_id"],
      limit: perPage,
      offset: perPage * (page - 1),
      subQuery: false,
    });

    return bestLogs;
  },

  getLogs: async ({ grade, perPage }) => {
    const logs = await reviewModel.findAll({
      include: [
        {
          model: userModel,
          as: "user",
          attributes: { exclude: ["password", "register_date", "last_login"] },
          where: { grade },
        },
      ],
      order: [["created_at", "DESC"]],
      limit: perPage,
    });
    return logs;
  },
};

export { Review };
