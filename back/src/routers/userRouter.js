import { Router } from "express";
import { UserService } from "../services/UserService";
const userRouter = Router();

userRouter.get("/users", async (req, res, next) => {
  try {
    const users = await UserService.getUsers();
    res.send(users);
  } catch (error) {
    console.log(error);
  }
});

export { userRouter };
