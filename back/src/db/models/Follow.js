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

  countByFilter: async (filter) => {
    const count = await followModel.count({ where: filter });

    return count;
  },

  delete: async ({ follow }) => {
    await followModel.destroy({ where: follow });
  },
};

export { Follow };
