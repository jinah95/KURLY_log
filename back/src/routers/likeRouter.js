import { Router } from "express";
import { FollowService } from "../services/FollowService";
import loginRequired from "../middlewares/loginRequired";
import { LikeService } from "../services/LikeService";

const likeRouter = Router();

likeRouter.post("/:reviewId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const reviewId = req.params.reviewId;

    const like = await LikeService.likeReview({ userId, reviewId });

    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
});

likeRouter.get("/:reviewId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const reviewId = req.params.reviewId;

    const likeOrNot = await LikeService.checkLike({ userId, reviewId });

    res.status(200).json(likeOrNot);
  } catch (error) {
    next(error);
  }
});

likeRouter.delete("/:reviewId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const reviewId = req.params.reviewId;

    const like = await LikeService.unlikeReview({ userId, reviewId });

    res.status(200).json(like);
  } catch (error) {
    next(error);
  }
});

export { likeRouter };
