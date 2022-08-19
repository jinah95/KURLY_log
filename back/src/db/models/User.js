import db from "..";
const userModel = db.user;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;

const User = {
  findAll: async () => {
    const users = await userModel.findAll();
    return users;
  },
};

export { User };
