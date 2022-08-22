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
      attributes: {
        exclude: ["password", "register_date", "last_login"],
      },
    });

    return user;
  },

  getBestUsers: async () => {
    const users = await sequelize.query(`
      SELECT url.user_id, url.nickname, url.picture, url.grade, url.age, url.family, url.intro, reviews, likes, count(follow_id) AS FOLLOWERS
        FROM (
          SELECT u.user_id, u.nickname, u.picture, u.grade, u.age, u.family, u.intro, count(review_id) AS REVIEWS, count(countl) AS LIKES
            FROM users AS u
              LEFT JOIN (
                SELECT r.review_id, r.user_id, count(l.like_id) AS COUNTL
                  FROM reviews AS r
                    LEFT JOIN likes AS l
                    ON r.review_id = l.review_id
                  GROUP BY l.review_id, r.review_id
              ) AS RL
              ON u.user_id = RL.user_id
              WHERE u.grade='컬리언서'
            GROUP BY u.user_id
        ) AS URL
        LEFT JOIN follow AS f
        ON url.user_id = f.follower_id
        GROUP BY url.user_id, url.nickname, url.picture, url.grade, url.age, url.family, url.intro, reviews, likes
        ORDER BY likes DESC
        LIMIT 3
    `);
    return users[0];
  },

  getMoreUsers: async () => {
    const users = await sequelize.query(`
      SELECT url.user_id, url.nickname, url.picture, url.grade, url.age, url.family, url.intro, reviews, likes, count(follow_id) AS FOLLOWERS
        FROM (
          SELECT u.user_id, u.nickname, u.picture, u.grade, u.age, u.family, u.intro, count(review_id) AS REVIEWS, count(countl) AS LIKES
            FROM users AS u
              LEFT JOIN (
                SELECT r.review_id, r.user_id, count(l.like_id) AS COUNTL
                  FROM reviews AS r
                    LEFT JOIN likes AS l
                    ON r.review_id = l.review_id
                  GROUP BY l.review_id, r.review_id
              ) AS RL
              ON u.user_id = RL.user_id
              WHERE u.grade='컬리언서'
            GROUP BY u.user_id
        ) AS URL
        LEFT JOIN follow AS f
        ON url.user_id = f.follower_id
        GROUP BY url.user_id, url.nickname, url.picture, url.grade, url.age, url.family, url.intro, reviews, likes
        ORDER BY likes DESC
        LIMIT 15
    `);
    return users[0];
  },

  update: async ({ user_id, toUpdate }) => {
    const count = await userModel.update(toUpdate, { where: { user_id } });
    return count;
  },
};

export { User };
