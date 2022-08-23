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
    const reviews = await sequelize.query(`

    select r.review_id , r.product_id , r.user_id , r.score, 
    r.good, r.bad, r.title, r.image, r."content" , r.created_at,
    coalesce(countLikes,0) as countLikes, u.nickname, u.picture, u.grade, u.age, u.family, 
    u.intro
    from reviews r 
    left join (select review_id, count(like_id) as countLikes
    from likes
    group by review_id) l
    on r.review_id = l.review_id
    join (select *
    from users u 
    ) u
    on r.user_id = u.user_id
    where r.product_id = ${productId}
    order by countLikes desc, r.created_at desc
    limit ${perPage} offset ${perPage * (page - 1)}  
    `);

    return reviews[0];
  },

  getInfo: async ({ productId }) => {
    const info = await sequelize.query(`
    select product_id, 
    count(review_id)  as countReviews,
    round(avg(score),2) as avgScore
    from reviews r
   where product_id = ${productId}
    group by product_id
    `);
    return info[0];
  },

  findByUser: async ({ userId, page, perPage }) => {
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
      limit: perPage,
      offset: perPage * (page - 1),
      subQuery: false,
    });
    return logs;
  },

  getBestLogs: async ({ grade, sevenDaysAgo }) => {
    let bestLogs = await sequelize.query(`
      select r.review_id , r.product_id , r.user_id , r.score, 
      r.good, r.bad, r.title, r.image, r."content" , r.created_at,
      coalesce(countLikes,0) as countLikes, u.nickname, u.picture, u.grade, u.age, u.family, 
      u.intro, p.detail 
      from reviews r 
      left join (select review_id, count(like_id) as countLikes
      from likes
      where created_at > now() - interval '7 day'
      group by review_id) l
      on r.review_id = l.review_id
      join (select *
      from users u 
      where grade='컬리언서') u
      on r.user_id = u.user_id
      left join (select product_id, detail from products p) p
      on r.product_id = p.product_id
      order by countLikes desc, r.created_at desc
      limit 5;
    `);

    return bestLogs[0];
  },

  getMoreLogs: async ({ grade, sevenDaysAgo, page, perPage }) => {
    let bestLogs = await sequelize.query(`
      select r.review_id , r.product_id , r.user_id , r.score, 
      r.good, r.bad, r.title, r.image, r."content" , r.created_at,
      coalesce(countLikes,0) as countLikes, u.nickname, u.picture, u.grade, u.age, u.family, 
      u.intro, p.detail 
      from reviews r 
      left join (select review_id, count(like_id) as countLikes
      from likes
      where created_at > now() - interval '7 day'
      group by review_id) l
      on r.review_id = l.review_id
      join (select *
      from users u 
      where grade='${grade}') u
      on r.user_id = u.user_id
      left join (select product_id, detail from products p) p
      on r.product_id = p.product_id
      order by countLikes desc, r.created_at desc
      limit ${perPage} offset ${perPage * (page - 1)};
    `);

    return bestLogs[0];
  },

  getLog: async ({ reviewId }) => {
    const log = await reviewModel.findOne({
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
        },
        {
          model: likeModel,
          as: "like",
          attributes: [],
          required: false,
        },
      ],
      where: {
        review_id: reviewId,
      },
      group: ["reviews.review_id", "user.user_id"],
    });
    return log;
  },
};

export { Review };
