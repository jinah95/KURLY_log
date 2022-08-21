import { app } from "./src/app";
import dotenv from "dotenv";
import { logger } from "./src/config/winston";
dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () =>
  logger.info(`정상적으로 서버를 시작했습니다. http://localhost:${PORT}`)
);
