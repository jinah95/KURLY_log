import { Router } from "express";
import { FollowService } from "../services/FollowService";
import loginRequired from "../middlewares/loginRequired";

const followRouter = Router();

followRouter.post("/:user_id", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const kurlyencerId = req.params.user_id;

        const follow = await FollowService.followUser({ userId, kurlyencerId });
        res.status(200).json(follow);
    } catch (error) {
        next(error);
    }
});

followRouter.delete("/:user_id", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const kurlyencerId = req.params.user_id;

        const unfollow = await FollowService.unfollowUser({
            userId,
            kurlyencerId,
        });
        res.status(200).json(unfollow);
    } catch (error) {
        next(error);
    }
});

export { followRouter };
