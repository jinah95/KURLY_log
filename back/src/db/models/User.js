import db from "..";
const userModel = db.user;
const followModel = db.follow;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const User = {
    findAll: async () => {
        // const follow_users = await followModel.
        const users = await userModel.findAll({
            where: {
                grade: "컬리언서",
            },
        });
        return users;
    },
};

export { User };
