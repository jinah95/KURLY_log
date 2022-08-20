import db from "..";
const likeModel = db.like;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

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

    delete: async ({ like }) => {
        await likeModel.destroy({ where: like });
    },
};

export { Like };
