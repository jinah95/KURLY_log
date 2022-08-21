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
    const countLikes = await likeModel.count({
      group: ["review_id"],
    });
    console.log(countLikes);

    let bestLogs = await reviewModel.findAll({
      include: [
        {
          model: userModel,
          as: "user",
          attributes: { exclude: ["password", "register_date", "last_login"] },
          where: {
            grade: "컬리언서",
          },
        },
      ],
    });

    // const result = bestLogs.filter((review) => {
    //   const count = countLikes.filter(
    //     (obj) => review.review_id === obj.review_id
    //   );
    //   if(!count || count.length === 0)
    //   review.dataValues.conutLikes = count[0].count;
    //   console.log(count[0]);
    //   console.log(review.dataValues);

    //   // return Object.assign(review.dataValues, { countLike: count.count });
    //   // return { ...review.dataValues, countLike: count.count };
    //   // return {};
    //   return review;
    // });

    return result;
  },
};

export { Review };
