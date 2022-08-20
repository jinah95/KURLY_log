import { Router } from "express";
import { ReviewService } from "../services/reviewService";
import loginRequired from "../middlewares/loginRequired";

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

reviewRouter.post(
  "/logs/:product_id",
  loginRequired,
  async (req, res, next) => {
    try {
      const productId = req.params.product_id;
      const userId = req.currentUserId;
      console.log(userId);
    } catch (error) {
      console.log(error);
    }
  }
);

export { reviewRouter };
