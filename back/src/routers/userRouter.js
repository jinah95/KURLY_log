import { Router } from "express";
import { UserService } from "../services/UserService";
import { loginRequired } from "../middlewares/loginRequired";
import { User } from "../db/models/User";
const userRouter = Router();

userRouter.post("/login", async (req, res, next) => {
    try {
        const { nickname, password } = req.body;

        const user = await UserService.getUser({ nickname, password });

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
    }
});

userRouter.get("/users", async (req, res, next) => {
    try {
        const users = await UserService.getUsers();
        res.send(users);
    } catch (error) {
        console.log(error);
    }
});

userRouter.get("/user/:user_id", async (req, res, next) => {
    try {
        const userId = req.params.user_id;
        const user = await UserService.getUserInfo(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

userRouter.patch("/user/:user_id", loginRequired, async (req, res, next) => {
    try {
        const loginId = req.currentUserId;
        const userId = req.params.user_id;

        if (loginId !== userId) {
            throw new Error("수정 권한이 없는 사용자입니다.");
        }

        const nickname = req.body.nickname;
        const updateData = { nickname };

        const user = await UserService.updateProfile({ userId, updateData });

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
