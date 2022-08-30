import { logger } from "../config/winston";
const errorMiddleware = (error, req, res, next) => {
  logger.error(`${error}`);
  res.status(400).send(error.message);
};

export { errorMiddleware };
