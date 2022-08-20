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
};

export { Like };
