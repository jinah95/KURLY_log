import cors from "cors";
import express from "express";
import db from "./db/index.js";
import { userRouter } from "./routers/userRouter.js";
import { reviewRouter } from "./routers/reviewRouter.js";
import { followRouter } from "./routers/followRouter.js";

const app = express();

db.sequelize
    .sync()
    .then(() => {
        console.log("정상적으로 db에 연결되었습니다.");
    })
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
app.use(followRouter);

export { app };
