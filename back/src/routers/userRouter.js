import { Router } from "express";
import { UserService } from "../services/UserService";
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
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

export { userRouter };
