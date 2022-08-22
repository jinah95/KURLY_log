"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        product_id: 1010,
        detail: "빌리엔젤 케이크",
        price: 30000,
      },
      {
        product_id: 1011,
        detail: "나폴레옹 케이크",
        price: 32000,
      },
      {
        product_id: 1012,
        detail: "생크림 케이크",
        price: 28000,
      },
      {
        product_id: 1013,
        detail: "초콜릿 케이크",
        price: 30000,
      },
      {
        product_id: 1014,
        detail: "치즈 케이크",
        price: 25000,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
