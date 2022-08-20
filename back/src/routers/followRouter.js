import { Router } from "express";
import { FollowService } from "../services/FollowService";
import loginRequired from "../middlewares/loginRequired";

const followRouter = Router();

followRouter.post("/follow/:user_id", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const kurlyencerId = req.params.user_id;

        const follow = "success";
        res.status(200).json(follow);
    } catch (error) {
        next(error);
    }
});

followRouter.delete(
    "/unfollow/:user_id",
    loginRequired,
    async (req, res, next) => {
        try {
            const userId = req.currentUserId;
            const kurlyencerId = req.params.user_id;

            const unfollow = "success";
            res.status(200).json(unfollow);
        } catch (error) {
            next(error);
        }
    }
);

export { followRouter };
