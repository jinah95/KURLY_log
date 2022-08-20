import db from "..";
const followModel = db.follow;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.sequelize.Op;

const Follow = {
    create: async ({ newFollow }) => {
        const createdNewFollow = await followModel.create(newFollow, {
            field: ["user_id", "follower_id"],
        });

        return createdNewFollow;
    },

    delete: async ({ unfollow }) => {
        const newUnfollow = await followModel.destroy({
            where: { user_id: unfollow.user_id },
        });

        return newUnfollow;
    },
};

export { Follow };
