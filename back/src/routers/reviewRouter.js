import { Router } from "express";
import { ReviewService } from "../services/reviewService";
import loginRequired from "../middlewares/loginRequired";

const reviewRouter = Router();

// 상품 리뷰전체 가져오기
reviewRouter.get("/:product_id", async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const reviews = await ReviewService.getReviews(productId);
    res.send(reviews);
  } catch (error) {
    console.log(error);
  }
});

// 컬리로그 작성하기
reviewRouter.post("/:product_id", loginRequired, async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const userId = req.currentUserId;
    const createdAt = new Date();
    const { score, good, bad, title, image, content } = req.body;
    const imageArray = [image];
    const newReview = {
      product_id: productId,
      user_id: userId,
      score,
      good,
      bad,
      title,
      image: imageArray,
      content,
      created_at: createdAt,
    };

    const createdReview = await ReviewService.postReviews({ newReview });
    res.status(201).json(createdReview);
  } catch (error) {
    console.log(error);
  }
});

export { reviewRouter };
