import db from "..";
const productModel = db.product;
const sequelize = db.sequelize;

const Product = {
  findById: async (productId) => {
    const product = await productModel.findOne({
      where: {
        product_id: productId,
      },
    });
    return product;
  },

  findAll: async () => {
    const products = await sequelize.query(`
    select p.product_id, p.detail, p.price, p.image, cnt from products p
    join (select product_id , count(review_id) as cnt
    from reviews r group by product_id ) c
    on p.product_id = c.product_id
    order by cnt desc
    `);
    return products[0];
  },
};

export { Product };
