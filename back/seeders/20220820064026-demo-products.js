"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          product_id: "1000",
          detail: "비비고 고기만두",
        },
        {
          product_id: "1001",
          detail: "비비고 김치만두",
        },
        {
          product_id: "1002",
          detail: "햇반",
        },
        {
          product_id: "1003",
          detail: "양파",
        },
        {
          product_id: "1004",
          detail: "마늘",
        },
        {
          product_id: "1005",
          detail: "신라면 블랙",
        },
        {
          product_id: "1006",
          detail: "생크림빵",
        },
        {
          product_id: "1007",
          detail: "불닭볶음면",
        },
        {
          product_id: "1008",
          detail: "짜파게티",
        },
        {
          product_id: "1009",
          detail: "우유",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
