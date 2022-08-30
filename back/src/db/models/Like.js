import db from "..";
const likeModel = db.like;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const Like = {
  create: async ({ like }) => {
    const newLike = await likeModel.create(like, {
      field: ["user_id", "review_id", "created_at"],
    });

    return newLike;
  },

  findByFilter: async (filter) => {
    const likeOrNot = await likeModel.findOne({ where: filter });

    return likeOrNot;
  },

  countByFilter: async (filter) => {
    const count = await sequelize.query(
      `SELECT count(*)
            FROM likes AS l
            INNER JOIN reviews AS r
            ON l.review_id=r.review_id
            WHERE r.user_id='${filter.user_id}'`
    );

    return Number(count[0][0].count);
  },

  countByReview: async () => {
    let now = new Date();
    const day = now.getDate();
    const sevenDaysAgo = new Date(new Date().setDate(day - 7));
    const count = await likeModel.findAll({
      group: ["review_id"],
      attributes: [
        "review_id",
        [sequelize.fn("COUNT", sequelize.col("*")), "count"],
      ],
      where: {
        created_at: {
          [Op.gte]: sevenDaysAgo,
        },
      },
    });
    return count;
  },

  delete: async ({ like }) => {
    await likeModel.destroy({ where: like });
  },

  deleteByReview: async ({ reviewId }) => {
    await likeModel.destroy({ where: { review_id: reviewId } });
  },
};

export { Like };
