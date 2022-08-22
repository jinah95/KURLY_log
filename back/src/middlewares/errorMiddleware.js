import { logger } from "../config/winston";
const errorMiddleware = (error, req, res, next) => {
  // 터미널에 노란색으로 출력됨.
  logger.error(`${error}`);
  res.status(400).send(error.message);
};

export { errorMiddleware };
