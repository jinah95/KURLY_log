import db from "..";
const followModel = db.follow;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

const Follow = {
    create: async ({ follow }) => {
        const newFollow = await followModel.create(follow, {
            field: ["user_id", "follower_id"],
        });

        return newFollow;
    },

    findByFilter: async (filter) => {
        const followOrNot = await followModel.findOne({
            where: filter,
        });

        return followOrNot;
    },

    delete: async ({ follow }) => {
        const newUnfollow = await followModel.destroy({
            where: follow,
        });

        return newUnfollow;
    },
};

export { Follow };
