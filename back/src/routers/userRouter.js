import { Router } from "express";
import { UserService } from "../services/UserService";
const userRouter = Router();

userRouter.get("/users", async (req, res, next) => {});

export { userRouter };
