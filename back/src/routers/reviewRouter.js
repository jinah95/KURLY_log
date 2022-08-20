import { Router } from "express";
import { ReviewService } from "../services/reviewService";
import loginRequired from "../middlewares/loginRequired";
import {
  reviewValidator,
  validationErrorCatcher,
} from "../middlewares/validator";

const reviewRouter = Router();

// 상품의 리뷰전체 가져오기
reviewRouter.get("/goods/:product_id", async (req, res, next) => {
  try {
    const productId = req.params.product_id;

    const reviews = await ReviewService.getReviews(productId);

    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
  }
});

// 컬리로그 작성하기
reviewRouter.post(
  "/:product_id",
  loginRequired,
  reviewValidator.postReviewValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const productId = req.params.product_id;
      const userId = req.currentUserId;
      const createdAt = new Date();
      const { score, good, bad, title, image, content } = req.body;
      const newReview = {
        product_id: productId,
        user_id: userId,
        score,
        good,
        bad,
        title,
        image,
        content,
        created_at: createdAt,
      };

      const createdReview = await ReviewService.postReviews({ newReview });

      res.status(201).json(createdReview);
    } catch (error) {
      console.log(error);
    }
  }
);

// 컬리로그 수정하기
reviewRouter.patch(
  "/:review_id",
  loginRequired,
  reviewValidator.setReviewValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const reviewId = req.params.review_id;
      const userId = req.currentUserId;
      const { score, good, bad, title, image, content } = req.body;
      const toUpdate = {
        score,
        good,
        bad,
        title,
        image,
        content,
      };

      const updatedReview = await ReviewService.setReview({
        reviewId,
        userId,
        toUpdate,
      });

      res.status(200).json(updatedReview);
    } catch (error) {
      console.log(error);
    }
  }
);

// 컬리로그 삭제하기
reviewRouter.delete("/:review_id", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const reviewId = req.params.review_id;

    const result = await ReviewService.deleteLog({ userId, reviewId });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

// 유저의 컬리로그 조회하기
reviewRouter.get("/user/:user_id", async (req, res, next) => {
  try {
    const userId = req.params.user_id;

    const logs = await ReviewService.getLogs(userId);

    res.status(200).json(logs);
  } catch (error) {
    console.log(error);
  }
});

// best 컬리언서 리뷰 조회하기
reviewRouter.get("/best/", async (req, res, next) => {
  try {
    const logs = await ReviewService.getBestLogs();

    res.status(200).json(logs);
  } catch (error) {
    console.log(error);
  }
});

export { reviewRouter };
