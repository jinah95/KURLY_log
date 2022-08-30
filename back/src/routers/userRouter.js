import { Router } from "express";
import { UserService } from "../services/userService";
import loginRequired from "../middlewares/loginRequired";
const userRouter = Router();

// 현재 유저 정보 조회
userRouter.get("/users/current", loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const user = await UserService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 로그인
userRouter.post("/login", async (req, res, next) => {
  try {
    const { nickname, password } = req.body;

    const user = await UserService.getUser({ nickname, password });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 상위 3명의 컬리언서 조회
userRouter.get("/users/best", async (req, res, next) => {
  try {
    const bestUsers = await UserService.getBestUsers();
    res.status(200).json(bestUsers);
  } catch (error) {
    next(error);
  }
});

// 상위 15명의 컬리언서 조회
userRouter.get("/users/more", async (req, res, next) => {
  try {
    const moreUsers = await UserService.getMoreUsers();
    res.status(200).json(moreUsers);
  } catch (error) {
    next(error);
  }
});

// 특정 사용자의 정보 조회
userRouter.get("/users/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await UserService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// 현재 유저 정보 수정
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
