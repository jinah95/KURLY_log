import { Router } from "express";
import { FollowService } from "../services/FollowService";
import loginRequired from "../middlewares/loginRequired";
import { LikeService } from "../services/LikeService";

const likeRouter = Router();

likeRouter.post("/:review_id", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const reviewId = req.params.review_id;

        const like = "success";

        res.status(200).json(like);
    } catch (error) {
        next(error);
    }
});

export { likeRouter };
