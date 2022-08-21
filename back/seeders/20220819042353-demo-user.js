"use strict";

const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        user_id: uuid(),
        nickname: "컬리",
        password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80",
        grade: "컬리언서",
        age: "40대",
        family: "4인 가구",
        intro: "요리천재",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "빵떡",
        password: bcrypt.hashSync("password1", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
        grade: "컬리언서",
        age: "10세 미만",
        family: "1인 가구",
        intro: "안녕하세요",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "부산댁",
        password: bcrypt.hashSync("password2", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1546385040-d48180ede560?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80",
        grade: "컬리언서",
        age: "20대",
        family: "1인 가구",
        intro: "까리하네",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "서울사람",
        password: bcrypt.hashSync("password3", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1553071820-9c15c8588ee8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHNlb3VsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        grade: "컬리언서",
        age: "30대",
        family: "2인 가구",
        intro: "서울살아요",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "대구댁",
        password: bcrypt.hashSync("password4", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1518818062626-6a9aa1ed44d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
        grade: "샛별",
        age: "20대",
        family: "1인 가구",
        intro: "대구살아요",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "제주도민",
        password: bcrypt.hashSync("password5", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1579169326371-ccb4e63f7889?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        grade: "샛별",
        age: "60세 이상",
        family: "2인 가구",
        intro: "귤",
        register_date: new Date(),
        last_login: new Date(),
      },
      {
        user_id: uuid(),
        nickname: "강원도민",
        password: bcrypt.hashSync("password6", bcrypt.genSaltSync(10)),
        picture:
          "https://images.unsplash.com/photo-1579169326371-ccb4e63f7889?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        grade: "샛별",
        age: "40대",
        family: "5인 가구 이상",
        intro: "커피",
        register_date: new Date(),
        last_login: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
