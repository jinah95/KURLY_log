"use strict";

const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        user_id: uuid(),
        nickname: "냥냥이",
        password: bcrypt.hashSync("password18", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1579169326371-ccb4e63f7889?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        grade: "샛별",
        age: "50대",
        family: "1인 가구",
        intro: "냐옹냐옹",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "꿀꿀돼지",
        password: bcrypt.hashSync("password19", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1579169326371-ccb4e63f7889?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        grade: "샛별",
        age: "20대",
        family: "1인 가구",
        intro: "잘먹어요",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "뿡뿡이",
        password: bcrypt.hashSync("password20", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1579169326371-ccb4e63f7889?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        grade: "샛별",
        age: "10세 미만",
        family: "4인 가구",
        intro: "방구쟁이",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "청춘",
        password: bcrypt.hashSync("password21", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1579169326371-ccb4e63f7889?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        grade: "샛별",
        age: "50대",
        family: "1인 가구",
        intro: "가는세월",
        register_date: new Date(),
        last_login: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
