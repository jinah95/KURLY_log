import { Router } from "express";
import { FollowService } from "../services/FollowService";
import loginRequired from "../middlewares/loginRequired";

const followRouter = Router();

// 팔로우
followRouter.post("/:userId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const kurlyencerId = req.params.userId;

    if (userId === kurlyencerId) {
      throw new Error("스스로를 팔로우할 수 없습니다.");
    }

    const follow = await FollowService.followUser({ userId, kurlyencerId });
    res.status(200).json(follow);
  } catch (error) {
    next(error);
  }
});

// 팔로우 여부 확인
followRouter.get("/:userId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const kurlyencerId = req.params.userId;

    const followOrNot = await FollowService.checkFollow({
      userId,
      kurlyencerId,
    });
    res.status(200).json(followOrNot);
  } catch (error) {
    next(error);
  }
});

// 팔로우 취소
followRouter.delete("/:userId", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const kurlyencerId = req.params.userId;

    if (userId === kurlyencerId) {
      throw new Error("스스로를 언팔로우할 수 없습니다.");
    }

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
