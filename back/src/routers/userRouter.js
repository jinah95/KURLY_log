import { Router } from "express";
import { UserService } from "../services/userService";
import loginRequired from "../middlewares/loginRequired";
const userRouter = Router();

userRouter.get("/users/current", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const user = await UserService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { nickname, password } = req.body;

    const user = await UserService.getUser({ nickname, password });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/users/best", async (req, res, next) => {
  try {
    const bestUsers = await UserService.getBestUsers();
    res.status(200).json(bestUsers);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/users/more", async (req, res, next) => {
  try {
    const moreUsers = await UserService.getMoreUsers();
    res.status(200).json(moreUsers);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await UserService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/users/:userId", loginRequired, async (req, res, next) => {
  try {
    const loginId = req.currentUserId;
    const userId = req.params.userId;

    if (loginId !== userId) {
      throw new Error("수정 권한이 없는 사용자입니다.");
    }

    const { picture, age, family, intro } = req.body ?? null;
    const updateData = { picture, age, family, intro };

    const user = await UserService.updateProfile({ userId, updateData });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
