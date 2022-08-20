import db from "..";
const reviewModel = db.review;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.Op;

const Review = {
    findAll: async (productId) => {
        const reviews = await reviewModel.findAll({
            where: {
                product_id: productId,
            },
        });
        return reviews;
    },

    findById: async ({ reviewId }) => {
        const review = await reviewModel.findOne({
            where: { review_id: reviewId },
        });
        return review;
    },

    countByFilter: async (filter) => {
        const count = await reviewModel.count({ where: filter });
        return count;
    },

    create: async () => {
        const review = await reviewModel.create({});
    },
};

export { Review };
