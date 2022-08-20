import db from "..";
const userModel = db.user;
const followModel = db.follow;
const likeModel = db.like;
const reviewModel = db.review;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

const User = {
  findByNickname: async (nickname) => {
    const user = await userModel.findOne({
      where: {
        nickname: nickname,
      },
    });

    return user;
  },
  findById: async (userId) => {
    const user = await userModel.findOne({
      where: {
        user_id: userId,
      },
      attributes: { exclude: ["password", "register_date", "last_login"] },
    });

    return user;
  },

  findAll: async () => {
    const follow_satisfied_users = await followModel.findAll({
      attributes: [
        "user_id",
        [sequelize.fn("COUNT", sequelize.col("follow_id")), "cnt_follow"],
      ],
      group: "user_id",
      where: {
        cnt_follow: {
          [Op.gte]: 200,
        },
      },
      order: ["cnt_follow", "DESC"],
    });
    const like_satisfied_users = await reviewModel.findAll({
      attributes: [
        "user_id",
        [sequelize.fn("sum", sequelize.col("cnt_like")), "sum_like"],
      ],
      include: [
        [
          sequelize.literal(`(
            SELECT review_id, COUNT(like_id) as cnt_like
            FROM like
            GROUPBY review_id
          )`),
          "review_like",
        ],
      ],
      group: "user_id",
      where: {
        sum_like: {
          [Op.gte]: 200,
        },
      },
    });

    const users = follow_satisfied_users;
    console.log(follow_satisfied_users);
    console.log(like_satisfied_users);
    return users;
  },
};

export { User };
