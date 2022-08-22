import { Router } from "express";
import { ReviewService } from "../services/reviewService";
import loginRequired from "../middlewares/loginRequired";
import {
  reviewValidator,
  validationErrorCatcher,
} from "../middlewares/validator";

const reviewRouter = Router();

// 상품의 리뷰전체 가져오기
reviewRouter.get("/goods/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const page = req.query.page;
    const perPage = req.query.perPage;
    const reviews = await ReviewService.getReviews({
      productId,
      page,
      perPage,
    });

    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
});

// 컬리로그 1개 조회하기
reviewRouter.get("/log/:reviewId", async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await ReviewService.getReview({ reviewId });

  res.status(200).json(review);
});

// 컬리로그 작성하기
reviewRouter.post(
  "/:productId",
  loginRequired,
  reviewValidator.postReviewValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const productId = req.params.productId;
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
      next(error);
    }
  }
);

// 컬리로그 수정하기
reviewRouter.patch(
  "/:reviewId",
  loginRequired,
  reviewValidator.setReviewValidator,
  validationErrorCatcher,
  async (req, res, next) => {
    try {
      const reviewId = req.params.reviewId;
      const userId = req.currentUserId;
      const { score, good, bad, title, image, content } = req.body;
      const updateData = {
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
        updateData,
      });

      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  }
);

// 컬리로그 삭제하기
reviewRouter.delete("/:reviewId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const reviewId = req.params.reviewId;
    const result = await ReviewService.deleteLog({ userId, reviewId });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// 유저의 컬리로그 조회하기
reviewRouter.get("/user/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const page = req.query.page;
    const perPage = req.query.perPage;
    const logs = await ReviewService.getLogs({ userId, page, perPage });

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
});

// 내 컬리로그 조회하기
reviewRouter.get("/my-log", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const logs = await ReviewService.getLogs(userId);

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
});

// best 컬리언서 리뷰 조회하기
reviewRouter.get("/", async (req, res, next) => {
  try {
    const logs = await ReviewService.getBestLogs();

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
});

// best 컬리언서 리뷰 더보기
reviewRouter.get("/more", async (req, res, next) => {
  try {
    const page = req.query.page;
    const perPage = req.query.perPage;
    const logs = await ReviewService.getMoreLogs({ page, perPage });

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
});

// 샛별 리뷰 목록 조회하기
reviewRouter.get("/pop", async (req, res, next) => {
  try {
    const page = req.query.page;
    const perPage = req.query.perPage;
    const logs = await ReviewService.getPopularLogs({ page, perPage });

    res.status(200).json(logs);
  } catch (error) {
    next(error);
  }
});

export { reviewRouter };
