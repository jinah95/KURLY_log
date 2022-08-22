import { Product } from "../db/models/Product";

const ProductService = {
  getProducts: async () => {
    const products = await Product.findAll();
    return { message: "success", data: products };
  },

  getProduct: async ({ productId }) => {
    const product = await Product.findById(productId);
    return { message: "success", data: product };
  },
};

export { ProductService };
