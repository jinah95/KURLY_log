import { Router } from "express";
import { ReviewService } from "../services/reviewService";

const reviewRouter = Router();

reviewRouter.get("/goods/:product_id", async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const reviews = await ReviewService.getReviews(productId);
    res.send(reviews);
  } catch (error) {
    console.log(error);
  }
});

reviewRouter.post("/log", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

export { reviewRouter };
