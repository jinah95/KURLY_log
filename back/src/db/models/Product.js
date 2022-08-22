import db from "..";
const productModel = db.product;
const reviewModel = db.review;
const Sequelize = db.Sequelize;
const sequelize = db.sequelize;
const Op = db.Op;

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
    const products = await productModel.findAll({});
    return products;
  },

  findInfo: async (productId) => {
    const product = await sequelize.query(`
    select p.product_id , p.detail , p.price , 
    coalesce(countReviews, 0) as countReviews  , round(avgscore, 2) as avgScore
    from products p
    left join (select product_id, count(review_id)  as countReviews,
    avg(score) as avgScore
    from reviews r 
    group by product_id) r
    on p.product_id = r.product_id 
    where p.product_id =${productId}
    order by countReviews desc
    `);

    return product[0];
  },
};

export { Product };
