import cors from "cors";
import express from "express";
import db from "./db/index.js";
import { userRouter } from "./routers/userRouter.js";
import { reviewRouter } from "./routers/reviewRouter.js";
import { followRouter } from "./routers/followRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { likeRouter } from "./routers/likeRouter.js";
import { productRouter } from "./routers/productsRouter.js";
import { logger } from "./config/winston";

const app = express();

db.sequelize
  .sync()
  .then(() => logger.info("정상적으로 db에 연결되었습니다."))
  .catch((err) => {
    console.log(err);
  });
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("안녕하세요, SSAP 입니다.");
});

app.use(userRouter);
app.use("/logs", reviewRouter);
app.use("/follows", followRouter);
app.use("/likes", likeRouter);
app.use("/goods", productRouter);

app.use(errorMiddleware);

export { app };
