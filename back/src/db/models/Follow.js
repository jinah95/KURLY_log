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
};

export { Follow };
