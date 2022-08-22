import { Router } from "express";
import { ProductService } from "../services/ProductService";

const productRouter = Router();

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await ProductService.getProduct({ productId });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
