import { Product } from "../db/models/Product";

const ProductService = {
  getProducts: async () => {
    const products = await Product.findAll();
    return { message: "success", data: products };
  },
};

export { ProductService };
